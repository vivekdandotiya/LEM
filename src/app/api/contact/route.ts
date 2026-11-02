import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { sendContactNotification } from "@/lib/email-adapter";

// Basic in-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    // Rate Limit: 1 request per 10 seconds per IP
    const lastRequest = rateLimitMap.get(ip);
    if (lastRequest && now - lastRequest < 10000) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a few seconds before submitting again.",
        },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const body = await req.json();

    // 1. Zod Validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot Check (Spam Bot Protection)
    if (data.honeypot && data.honeypot.length > 0) {
      // Silently reject bots without raising alarm
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 3. Minimum time-to-submit check (bot prevention: submissions under 1.5s are bots)
    if (data.formRenderTime && now - data.formRenderTime < 1500) {
      return NextResponse.json(
        { error: "Submission occurred too quickly. Please try again." },
        { status: 400 }
      );
    }

    // 4. Dispatch via Email Adapter
    const dispatchResult = await sendContactNotification(data);

    if (!dispatchResult.success) {
      return NextResponse.json(
        {
          error: dispatchResult.message,
          fallbackEmail: "hello@leadedge.agency",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: dispatchResult.message,
      provider: dispatchResult.provider,
      isDevSimulation: dispatchResult.isDevSimulation,
    });
  } catch (error: unknown) {
    console.error("[Contact API Internal Error]", error);
    return NextResponse.json(
      {
        error: "An unexpected server error occurred. Please contact us directly at hello@leadedge.agency.",
      },
      { status: 500 }
    );
  }
}
