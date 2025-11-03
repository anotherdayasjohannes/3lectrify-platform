import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Disable Draft Mode API Route
 * 
 * This endpoint disables Next.js Draft Mode.
 * Useful for exiting preview mode and returning to published content.
 * 
 * Usage: Visit /api/disable-draft to exit preview mode
 */
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  
  return NextResponse.redirect(new URL('/', request.url));
}

