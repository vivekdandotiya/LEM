import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please provide your full name (at least 2 characters)." })
    .max(100, { message: "Name must be under 100 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please provide a valid business email address." })
    .max(120, { message: "Email must be under 120 characters." })
    .trim(),
  companyOrWebsite: z
    .string()
    .max(120, { message: "Company or website must be under 120 characters." })
    .optional()
    .or(z.literal("")),
  serviceRequired: z.enum(
    ["seo", "meta-ads", "social-media", "web-development", "other"],
    {
      errorMap: () => ({ message: "Please select the primary service you require." }),
    }
  ),
  budgetRange: z
    .enum(["under-5k", "5k-10k", "10k-25k", "25k-plus", "undecided", ""], {
      errorMap: () => ({ message: "Please select a budget tier or choose undecided." }),
    })
    .optional(),
  projectDetails: z
    .string()
    .min(15, { message: "Please share a brief summary of your project goals (at least 15 characters)." })
    .max(2000, { message: "Project details must be under 2,000 characters." })
    .trim(),
  // Anti-spam honeypot (must remain empty for legitimate users)
  honeypot: z.string().optional(),
  // Timestamp check for rapid automated submissions
  formRenderTime: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
