'use client';

import Link from 'next/link';

/**
 * Draft Mode Indicator
 * 
 * Shows a visual banner when viewing draft/unpublished content.
 * Only visible during preview sessions from Sanity Studio.
 */
export function DraftModeIndicator() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '8px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '14px',
        fontWeight: 600,
        textAlign: 'center',
        zIndex: 9999,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <span>🎬 Preview Mode Active</span>
      <span style={{ margin: '0 8px' }}>•</span>
      <span style={{ opacity: 0.9 }}>Viewing draft content</span>
      <span style={{ margin: '0 8px' }}>•</span>
      <Link
        href="/api/disable-draft"
        style={{
          color: 'white',
          textDecoration: 'underline',
          opacity: 0.9,
        }}
      >
        Exit Preview
      </Link>
    </div>
  );
}

