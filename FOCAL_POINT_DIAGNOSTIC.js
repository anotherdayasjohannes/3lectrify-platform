/**
 * FOCAL POINT DIAGNOSTIC SCRIPT
 * 
 * Run this in the browser console to verify focal points are working
 * 
 * Usage:
 * 1. Open your site in the browser
 * 2. Open DevTools (F12 or Cmd+Option+I)
 * 3. Go to Console tab
 * 4. Paste this entire script and press Enter
 */

(function() {
  console.clear();
  console.log('%c🎯 FOCAL POINT DIAGNOSTIC REPORT', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
  console.log('%c═══════════════════════════════════════', 'color: #4A90E2;');
  console.log('');
  
  // Find all Next.js Image components (they have specific attributes)
  const images = Array.from(document.querySelectorAll('img'));
  const nextImages = images.filter(img => 
    img.closest('[data-nimg]') || 
    img.src.includes('/_next/') ||
    img.style.objectPosition !== '' // Has explicit object-position
  );
  
  console.log(`📊 Found ${images.length} total images on page`);
  console.log(`🖼️  Found ${nextImages.length} Next.js Image components`);
  console.log('');
  
  if (nextImages.length === 0) {
    console.log('%c⚠️  No Next.js images found. Make sure you\'re on a page with images.', 'color: orange;');
    return;
  }
  
  // Analyze each image
  const results = nextImages.map((img, index) => {
    const style = window.getComputedStyle(img);
    const objectFit = style.objectFit;
    const objectPosition = style.objectPosition;
    const src = img.src;
    const alt = img.alt || '(no alt text)';
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    const parent = img.closest('section, div, figure, article');
    const parentClasses = parent ? Array.from(parent.classList).join(' ') : '';
    
    // Determine component type
    let componentType = 'Unknown';
    if (parentClasses.includes('hero') || parent?.querySelector('h1')) {
      componentType = 'Hero';
    } else if (parentClasses.includes('text-image') || parentClasses.includes('textimage')) {
      componentType = 'TextImage';
    } else if (parentClasses.includes('simple-text-image') || parentClasses.includes('simpletextimage')) {
      componentType = 'SimpleTextImage';
    } else if (parentClasses.includes('feature')) {
      componentType = 'FeatureCards/Showcase';
    }
    
    // Check if focal point is applied
    const hasFocalPoint = objectPosition !== 'center center' && 
                          objectPosition !== '50% 50%' && 
                          objectPosition !== 'center';
    
    return {
      index: index + 1,
      componentType,
      alt,
      src: src.substring(0, 80) + (src.length > 80 ? '...' : ''),
      dimensions: `${width}×${height}`,
      objectFit,
      objectPosition,
      hasFocalPoint,
      element: img
    };
  });
  
  // Summary
  const withFocalPoint = results.filter(r => r.hasFocalPoint).length;
  const withoutFocalPoint = results.filter(r => !r.hasFocalPoint).length;
  
  console.log('%c📈 SUMMARY', 'font-size: 16px; font-weight: bold; color: #4A90E2;');
  console.log('─────────────────────────────────────');
  console.log(`✅ Images WITH focal point: ${withFocalPoint}`);
  console.log(`❌ Images WITHOUT focal point: ${withoutFocalPoint}`);
  console.log('');
  
  // Detailed results
  console.log('%c📋 DETAILED RESULTS', 'font-size: 16px; font-weight: bold; color: #4A90E2;');
  console.log('─────────────────────────────────────');
  console.log('');
  
  results.forEach(result => {
    const icon = result.hasFocalPoint ? '✅' : '❌';
    const color = result.hasFocalPoint ? 'color: green;' : 'color: red;';
    
    console.log(`%c${icon} Image #${result.index}`, `font-weight: bold; ${color}`);
    console.log(`   Component: ${result.componentType}`);
    console.log(`   Alt text: ${result.alt}`);
    console.log(`   Dimensions: ${result.dimensions}`);
    console.log(`   Object Fit: ${result.objectFit}`);
    console.log(`   %cObject Position: ${result.objectPosition}`, result.hasFocalPoint ? 'color: green; font-weight: bold;' : 'color: inherit;');
    console.log(`   Source: ${result.src}`);
    console.log('');
  });
  
  // Component breakdown
  console.log('%c🎯 BY COMPONENT TYPE', 'font-size: 16px; font-weight: bold; color: #4A90E2;');
  console.log('─────────────────────────────────────');
  
  const byComponent = results.reduce((acc, r) => {
    if (!acc[r.componentType]) {
      acc[r.componentType] = { total: 0, withFocal: 0 };
    }
    acc[r.componentType].total++;
    if (r.hasFocalPoint) {
      acc[r.componentType].withFocal++;
    }
    return acc;
  }, {});
  
  Object.entries(byComponent).forEach(([type, stats]) => {
    const percentage = Math.round((stats.withFocal / stats.total) * 100);
    const icon = percentage === 100 ? '✅' : percentage > 0 ? '⚠️' : '❌';
    console.log(`${icon} ${type}: ${stats.withFocal}/${stats.total} (${percentage}%)`);
  });
  
  console.log('');
  
  // Visual highlighting (optional - can be toggled)
  console.log('%c💡 TIP: Visual Highlighting', 'font-size: 14px; color: #666;');
  console.log('─────────────────────────────────────');
  console.log('Run this to highlight images in the browser:');
  console.log('%chighlightFocalPoints()', 'background: #f0f0f0; padding: 2px 5px; border-radius: 3px; font-family: monospace;');
  console.log('');
  
  // Make results available globally
  window.focalPointResults = results;
  
  // Highlight function
  window.highlightFocalPoints = function() {
    // Remove old highlights
    document.querySelectorAll('.focal-point-highlight').forEach(el => el.remove());
    
    results.forEach(result => {
      const overlay = document.createElement('div');
      overlay.className = 'focal-point-highlight';
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 3px solid ${result.hasFocalPoint ? '#00ff00' : '#ff0000'};
        pointer-events: none;
        z-index: 9999;
        background: ${result.hasFocalPoint ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        top: 5px;
        left: 5px;
        background: ${result.hasFocalPoint ? '#00ff00' : '#ff0000'};
        color: white;
        padding: 2px 8px;
        font-size: 12px;
        font-weight: bold;
        border-radius: 3px;
        font-family: monospace;
        z-index: 10000;
      `;
      label.textContent = result.hasFocalPoint ? `✓ Focal: ${result.objectPosition}` : '✗ No focal point';
      
      const parent = result.element.parentElement;
      if (parent) {
        const oldPosition = parent.style.position;
        if (!oldPosition || oldPosition === 'static') {
          parent.style.position = 'relative';
        }
        parent.appendChild(overlay);
        parent.appendChild(label);
      }
    });
    
    console.log('%c✨ Visual highlights applied!', 'color: green; font-weight: bold;');
    console.log('Green = Focal point applied ✅');
    console.log('Red = No focal point ❌');
    console.log('');
    console.log('%cRun clearHighlights() to remove', 'color: #666;');
  };
  
  // Clear function
  window.clearHighlights = function() {
    document.querySelectorAll('.focal-point-highlight').forEach(el => el.remove());
    console.log('%c🧹 Highlights cleared', 'color: #666;');
  };
  
  console.log('%c═══════════════════════════════════════', 'color: #4A90E2;');
  console.log('%c✅ Diagnostic Complete!', 'font-size: 16px; font-weight: bold; color: green;');
  console.log('');
  console.log('%cAvailable commands:', 'color: #666;');
  console.log('• %chighlightFocalPoints()%c - Add visual overlays', 'font-family: monospace;', '');
  console.log('• %cclearHighlights()%c - Remove overlays', 'font-family: monospace;', '');
  console.log('• %cfocalPointResults%c - Access raw data', 'font-family: monospace;', '');
  
})();

