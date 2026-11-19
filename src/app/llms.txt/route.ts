import { NextResponse } from 'next/server';
import { generateLlmsText } from '../../../scripts/generate-llms';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const { summary } = generateLlmsText();
  return new NextResponse(summary, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
