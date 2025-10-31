import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Sanity Webhook Revalidation Endpoint
 * 
 * This endpoint is called by Sanity webhooks when content changes.
 * It triggers on-demand revalidation of affected pages, providing
 * instant content updates (1-3 seconds) in production.
 * 
 * Security: Protected by REVALIDATION_SECRET environment variable.
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Verify the secret token
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (!secret || secret !== process.env.REVALIDATION_SECRET) {
      console.error('[Revalidate] Invalid or missing secret');
      return NextResponse.json(
        { message: 'Invalid secret', revalidated: false },
        { status: 401 }
      );
    }

    // 2. Parse the webhook payload from Sanity
    const body = await request.json();
    
    // Sanity webhook payload structure:
    // {
    //   _type: 'page' | 'legalPage' | 'siteSettings',
    //   slug: { current: 'about' } | null,
    //   _id: 'document-id',
    //   ...
    // }
    
    const documentType = body._type;
    const slug = body.slug?.current || body.slug;
    const documentId = body._id;

    console.log('[Revalidate] Webhook received:', {
      type: documentType,
      slug,
      id: documentId,
    });

    // 3. Determine which paths to revalidate based on document type
    const pathsToRevalidate: string[] = [];

    if (documentType === 'siteSettings') {
      // Site settings affect the layout (header, footer, etc.)
      // Revalidate the root layout and all pages
      pathsToRevalidate.push('/');
      console.log('[Revalidate] Site settings changed - revalidating all pages');
    } else if (documentType === 'page' || documentType === 'legalPage') {
      if (slug === 'home') {
        // Home page
        pathsToRevalidate.push('/');
      } else if (slug) {
        // Dynamic page
        pathsToRevalidate.push(`/${slug}`);
      } else {
        // No slug provided, revalidate home as fallback
        pathsToRevalidate.push('/');
        console.warn('[Revalidate] No slug provided for page, revalidating home');
      }
    } else {
      // Unknown document type, revalidate home as safe fallback
      pathsToRevalidate.push('/');
      console.warn('[Revalidate] Unknown document type:', documentType);
    }

    // 4. Revalidate all affected paths
    const revalidationResults = [];
    
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        revalidationResults.push({ path, success: true });
        console.log(`[Revalidate] ✓ Revalidated: ${path}`);
      } catch (error) {
        revalidationResults.push({ path, success: false, error: String(error) });
        console.error(`[Revalidate] ✗ Failed to revalidate ${path}:`, error);
      }
    }

    // 5. Return success response
    return NextResponse.json({
      revalidated: true,
      paths: revalidationResults,
      timestamp: new Date().toISOString(),
      document: {
        type: documentType,
        slug,
        id: documentId,
      },
    });

  } catch (error) {
    console.error('[Revalidate] Error processing webhook:', error);
    
    return NextResponse.json(
      {
        message: 'Error processing webhook',
        error: error instanceof Error ? error.message : String(error),
        revalidated: false,
      },
      { status: 500 }
    );
  }
}

// Disable caching for this API route
export const dynamic = 'force-dynamic';

