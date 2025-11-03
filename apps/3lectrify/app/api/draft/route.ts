import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { client } from '@3lectrify/sanity';
import { NextRequest } from 'next/server';

/**
 * Draft Mode API Route
 * 
 * This endpoint enables Next.js Draft Mode for live preview from Sanity Studio.
 * When Sanity Studio's Presentation Tool opens a preview, it calls this endpoint
 * to enable draft mode, allowing the frontend to fetch unpublished content.
 * 
 * Flow:
 * 1. Sanity Studio calls: /api/draft?slug=/about
 * 2. This route validates the request and enables draft mode
 * 3. Redirects to the requested page
 * 4. Page now fetches draft content instead of published
 */

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}

