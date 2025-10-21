// ============================================
// 3LECTRIFY DESIGN SYSTEM AUDIT SCRIPT
// ============================================
// Copy and paste this into your browser console
// Run on any page to verify design system compliance

console.log('%c=== 3LECTRIFY DESIGN SYSTEM AUDIT ===', 'font-size: 20px; font-weight: bold; color: #88c0b1;');
console.log('%cFigma-Aligned Design System Verification', 'font-size: 14px; color: #666;');
console.log('Page:', window.location.pathname);
console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
console.log('\n');

// ============================================
// HELPER FUNCTIONS
// ============================================

function getComputedStyleValue(element, property) {
  if (!element) return null;
  return window.getComputedStyle(element).getPropertyValue(property);
}

function checkValue(actual, expected, unit = 'px') {
  const actualNum = parseFloat(actual);
  const expectedNum = parseFloat(expected);
  const isMatch = Math.abs(actualNum - expectedNum) < 2; // 2px tolerance
  return {
    actual: actualNum + unit,
    expected: expectedNum + unit,
    match: isMatch,
    diff: (actualNum - expectedNum).toFixed(1) + unit
  };
}

function logResult(label, check, indent = '  ') {
  const icon = check.match ? '✅' : '❌';
  const color = check.match ? 'color: green' : 'color: red';
  console.log(`${indent}${icon} ${label}:`, `%c${check.actual}%c (expected: ${check.expected})`, color, 'color: inherit');
  if (!check.match && Math.abs(parseFloat(check.diff)) > 0) {
    console.log(`${indent}   Difference: ${check.diff}`);
  }
}

// ============================================
// 1. CONTENT WRAPPER CHECK
// ============================================
console.log('%c📦 CONTENT WRAPPER', 'font-weight: bold; font-size: 16px;');

const wrapper = document.querySelector('.content-wrapper');
if (wrapper) {
  const wrapperStyles = window.getComputedStyle(wrapper);
  const maxWidth = checkValue(wrapperStyles.maxWidth, 1440, 'px');
  const paddingLeft = checkValue(wrapperStyles.paddingLeft, 50, 'px');
  const paddingRight = checkValue(wrapperStyles.paddingRight, 50, 'px');
  
  logResult('Max Width', maxWidth);
  logResult('Padding Left', paddingLeft);
  logResult('Padding Right', paddingRight);
} else {
  console.log('  ⚠️ Content wrapper not found');
}
console.log('\n');

// ============================================
// 2. HEADER CHECK
// ============================================
console.log('%c📍 HEADER', 'font-weight: bold; font-size: 16px;');

const header = document.querySelector('header');
if (header) {
  const headerStyles = window.getComputedStyle(header);
  const position = headerStyles.position;
  const zIndex = headerStyles.zIndex;
  const bg = headerStyles.backgroundColor;
  
  console.log('  Position:', position === 'sticky' ? '✅ sticky' : `❌ ${position} (expected: sticky)`);
  console.log('  Z-Index:', zIndex === '1000' ? '✅ 1000' : `❌ ${zIndex} (expected: 1000)`);
  console.log('  Background:', bg);
  
  // Check nav links
  const navLinks = header.querySelectorAll('nav a');
  if (navLinks.length > 0) {
    const firstLink = navLinks[0];
    const linkStyles = window.getComputedStyle(firstLink);
    const fontSize = checkValue(linkStyles.fontSize, 18, 'px');
    const lineHeight = checkValue(linkStyles.lineHeight, 24, 'px');
    
    console.log('  Nav Links:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
} else {
  console.log('  ⚠️ Header not found');
}
console.log('\n');

// ============================================
// 3. HERO SECTION CHECK
// ============================================
console.log('%c🎯 HERO SECTION', 'font-weight: bold; font-size: 16px;');

const heroSections = document.querySelectorAll('section');
let heroSection = null;
heroSections.forEach(section => {
  const bg = window.getComputedStyle(section).backgroundColor;
  if (bg.includes('41, 54, 69') || bg.includes('#293645')) { // Dark blue hero background
    heroSection = section;
  }
});

if (heroSection) {
  const heroStyles = window.getComputedStyle(heroSection);
  const bg = heroStyles.backgroundColor;
  const paddingTop = checkValue(heroStyles.paddingTop, 50, 'px');
  const paddingBottom = checkValue(heroStyles.paddingBottom, 80, 'px');
  
  console.log('  Background:', bg);
  logResult('Padding Top', paddingTop);
  logResult('Padding Bottom', paddingBottom);
  
  // Check H1
  const h1 = heroSection.querySelector('h1');
  if (h1) {
    const h1Styles = window.getComputedStyle(h1);
    const fontSize = checkValue(h1Styles.fontSize, 48, 'px');
    const lineHeight = checkValue(h1Styles.lineHeight, 58, 'px');
    const letterSpacing = checkValue(h1Styles.letterSpacing, 0.48, 'px');
    const fontWeight = h1Styles.fontWeight;
    
    console.log('  H1:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
    logResult('Letter Spacing', letterSpacing, '    ');
    console.log('    Font Weight:', fontWeight === '300' ? '✅ 300 (light)' : `❌ ${fontWeight} (expected: 300)`);
  }
  
  // Check body text
  const bodyText = heroSection.querySelector('div[class*="text-"]');
  if (bodyText) {
    const bodyStyles = window.getComputedStyle(bodyText);
    const fontSize = checkValue(bodyStyles.fontSize, 24, 'px');
    const lineHeight = checkValue(bodyStyles.lineHeight, 34, 'px');
    
    console.log('  Body Text:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
} else {
  console.log('  ⚠️ Hero section not found');
}
console.log('\n');

// ============================================
// 4. FEATURE CARDS CHECK
// ============================================
console.log('%c🎴 FEATURE CARDS', 'font-weight: bold; font-size: 16px;');

const cardElements = document.querySelectorAll('[data-card]');
if (cardElements.length > 0) {
  const firstCard = cardElements[0];
  const cardStyles = window.getComputedStyle(firstCard);
  const padding = checkValue(cardStyles.padding, 25, 'px');
  const borderRadius = checkValue(cardStyles.borderRadius, 10, 'px');
  const bg = cardStyles.backgroundColor;
  
  console.log(`  Found ${cardElements.length} cards`);
  console.log('  First Card:');
  logResult('Padding', padding, '    ');
  logResult('Border Radius', borderRadius, '    ');
  console.log('    Background:', bg);
  
  // Check card title
  const cardTitle = firstCard.querySelector('h3');
  if (cardTitle) {
    const titleStyles = window.getComputedStyle(cardTitle);
    const fontSize = checkValue(titleStyles.fontSize, 24, 'px');
    const lineHeight = checkValue(titleStyles.lineHeight, 34, 'px');
    
    console.log('  Card Title:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
  
  // Check grid gap
  const cardsContainer = firstCard.parentElement;
  if (cardsContainer) {
    const containerStyles = window.getComputedStyle(cardsContainer);
    const gap = checkValue(containerStyles.gap, 25, 'px');
    const display = containerStyles.display;
    
    console.log('  Cards Container:');
    console.log('    Display:', display === 'grid' ? '✅ grid' : `❌ ${display} (expected: grid)`);
    logResult('Gap', gap, '    ');
  }
} else {
  console.log('  ⚠️ Feature cards not found (not on this page)');
}
console.log('\n');

// ============================================
// 5. TEXT + IMAGE SECTION CHECK
// ============================================
console.log('%c🖼️ TEXT + IMAGE SECTION', 'font-weight: bold; font-size: 16px;');

const imageEl = document.querySelector('[data-image]');
const textEl = document.querySelector('[data-text]');

if (imageEl && textEl) {
  const gridContainer = imageEl.parentElement;
  const gridStyles = window.getComputedStyle(gridContainer);
  
  console.log('  Grid Layout:');
  console.log('    Display:', gridStyles.display);
  console.log('    Grid Template Columns:', gridStyles.gridTemplateColumns);
  
  // Check if it's 2-column on desktop
  if (window.innerWidth >= 768) {
    const is2Column = gridStyles.gridTemplateColumns.includes('645px 645px');
    console.log('    2-Column Layout:', is2Column ? '✅ Yes (645px 645px)' : `❌ No (${gridStyles.gridTemplateColumns})`);
  }
  
  const gap = checkValue(gridStyles.gap, 50, 'px');
  logResult('Gap', gap, '    ');
  
  // Check image size
  const imgWidth = imageEl.offsetWidth;
  const imgHeight = imageEl.offsetHeight;
  console.log('  Image:');
  console.log('    Width:', imgWidth + 'px', window.innerWidth >= 768 ? (imgWidth === 645 ? '✅' : '❌ (expected: 645px)') : '');
  console.log('    Height:', imgHeight + 'px', window.innerWidth >= 768 ? (imgHeight === 430 ? '✅' : '⚠️ (expected: 430px)') : '');
  
  // Check text width
  const textWidth = textEl.offsetWidth;
  console.log('  Text:');
  console.log('    Width:', textWidth + 'px', window.innerWidth >= 768 ? (textWidth === 645 ? '✅' : '❌ (expected: 645px)') : '');
  
  // Check H2 in text section
  const h2 = textEl.querySelector('h2');
  if (h2) {
    const h2Styles = window.getComputedStyle(h2);
    const fontSize = checkValue(h2Styles.fontSize, 36, 'px');
    const lineHeight = checkValue(h2Styles.lineHeight, 46, 'px');
    
    console.log('  H2:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
  
  // Check layout positioning
  const imageRect = imageEl.getBoundingClientRect();
  const textRect = textEl.getBoundingClientRect();
  const sideBySide = Math.abs(imageRect.top - textRect.top) < 50;
  
  console.log('  Layout:');
  console.log('    Elements:', sideBySide ? '✅ Side-by-side' : '❌ Stacked');
} else {
  console.log('  ⚠️ Text + Image section not found (not on this page)');
}
console.log('\n');

// ============================================
// 6. FOOTER CHECK
// ============================================
console.log('%c🦶 FOOTER', 'font-weight: bold; font-size: 16px;');

const footer = document.querySelector('footer');
if (footer) {
  const footerStyles = window.getComputedStyle(footer);
  const bg = footerStyles.backgroundColor;
  const paddingTop = checkValue(footerStyles.paddingTop, 30, 'px');
  const paddingBottom = checkValue(footerStyles.paddingBottom, 50, 'px');
  
  console.log('  Background:', bg);
  logResult('Padding Top', paddingTop);
  logResult('Padding Bottom', paddingBottom);
  
  // Check footer headline
  const footerHeadline = footer.querySelector('h2');
  if (footerHeadline) {
    const headlineStyles = window.getComputedStyle(footerHeadline);
    const fontSize = checkValue(headlineStyles.fontSize, 36, 'px');
    const lineHeight = checkValue(headlineStyles.lineHeight, 48, 'px');
    
    console.log('  Headline:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
  
  // Check newsletter input
  const input = footer.querySelector('input[type="email"]');
  if (input) {
    const inputStyles = window.getComputedStyle(input);
    const height = checkValue(inputStyles.height, 36, 'px');
    const borderRadius = checkValue(inputStyles.borderRadius, 5, 'px');
    
    console.log('  Newsletter Input:');
    logResult('Height', height, '    ');
    logResult('Border Radius', borderRadius, '    ');
  }
  
  // Check footer nav links
  const footerNavLinks = footer.querySelectorAll('nav a');
  if (footerNavLinks.length > 0) {
    const firstLink = footerNavLinks[0];
    const linkStyles = window.getComputedStyle(firstLink);
    const fontSize = checkValue(linkStyles.fontSize, 18, 'px');
    const lineHeight = checkValue(linkStyles.lineHeight, 24, 'px');
    
    console.log('  Nav Links:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
  
  // Check LinkedIn icon
  const linkedInIcon = footer.querySelector('a[href*="linkedin"]');
  if (linkedInIcon) {
    console.log('  LinkedIn Icon: ✅ Present');
  } else {
    console.log('  LinkedIn Icon: ❌ Not found');
  }
  
  // Check legal links
  const legalLinks = footer.querySelectorAll('a[href*="impressum"], a[href*="datenschutz"]');
  if (legalLinks.length > 0) {
    const legalLinkStyles = window.getComputedStyle(legalLinks[0]);
    const fontSize = checkValue(legalLinkStyles.fontSize, 14, 'px');
    const lineHeight = checkValue(legalLinkStyles.lineHeight, 22, 'px');
    
    console.log('  Legal Links:');
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
  }
} else {
  console.log('  ⚠️ Footer not found');
}
console.log('\n');

// ============================================
// 7. GRADIENT SPACER CHECK
// ============================================
console.log('%c🌈 GRADIENT SPACER', 'font-weight: bold; font-size: 16px;');

const gradientSpacer = document.querySelector('div[style*="gradient"]');
if (gradientSpacer) {
  const spacerStyles = window.getComputedStyle(gradientSpacer);
  const height = checkValue(spacerStyles.height, 20, 'px');
  
  logResult('Height', height);
  console.log('  Background:', spacerStyles.background);
} else {
  console.log('  ⚠️ Gradient spacer not found');
}
console.log('\n');

// ============================================
// 8. TYPOGRAPHY SUMMARY
// ============================================
console.log('%c📝 TYPOGRAPHY SUMMARY', 'font-weight: bold; font-size: 16px;');

const typographyTests = [
  { selector: 'h1', expectedSize: 48, expectedLineHeight: 58, expectedWeight: '300' },
  { selector: 'h2', expectedSize: 36, expectedLineHeight: 46, expectedWeight: '300' },
  { selector: 'h3', expectedSize: 24, expectedLineHeight: 34, expectedWeight: '400' },
  { selector: 'body', expectedSize: 18, expectedLineHeight: 24, expectedWeight: '400' },
];

typographyTests.forEach(test => {
  const element = document.querySelector(test.selector);
  if (element) {
    const styles = window.getComputedStyle(element);
    const fontSize = checkValue(styles.fontSize, test.expectedSize, 'px');
    const lineHeight = checkValue(styles.lineHeight, test.expectedLineHeight, 'px');
    const fontWeight = styles.fontWeight;
    
    console.log(`  ${test.selector.toUpperCase()}:`);
    logResult('Font Size', fontSize, '    ');
    logResult('Line Height', lineHeight, '    ');
    console.log('    Font Weight:', fontWeight === test.expectedWeight ? `✅ ${fontWeight}` : `❌ ${fontWeight} (expected: ${test.expectedWeight})`);
  }
});
console.log('\n');

// ============================================
// 9. COLOR PALETTE CHECK
// ============================================
console.log('%c🎨 COLOR PALETTE', 'font-weight: bold; font-size: 16px;');

const colorElements = {
  'Brand Green (Mid)': document.querySelector('[class*="text-brand-green"], [style*="88c0b1"]'),
  'Brand Orange': document.querySelector('[class*="text-brand-orange"], [style*="d04227"]'),
  'Brand Blue (Dark)': document.querySelector('[class*="bg-brand-blue-dark"], [style*="293645"]'),
  'Neutral Light Grey': document.querySelector('[class*="text-neutral-light-grey"], [style*="c2c2c2"]'),
};

Object.entries(colorElements).forEach(([name, element]) => {
  if (element) {
    console.log(`  ✅ ${name}: Found`);
  } else {
    console.log(`  ⚠️ ${name}: Not found on this page`);
  }
});
console.log('\n');

// ============================================
// 10. RESPONSIVE BREAKPOINTS
// ============================================
console.log('%c📱 RESPONSIVE BREAKPOINTS', 'font-weight: bold; font-size: 16px;');

const width = window.innerWidth;
let breakpoint = '';
if (width < 768) {
  breakpoint = 'Mobile (< 768px)';
} else if (width < 1024) {
  breakpoint = 'Tablet (768-1024px)';
} else {
  breakpoint = 'Desktop (>= 1024px)';
}

console.log('  Current Viewport:', width + 'px');
console.log('  Active Breakpoint:', breakpoint);
console.log('\n');

// ============================================
// FINAL SUMMARY
// ============================================
console.log('%c=== AUDIT COMPLETE ===', 'font-weight: bold; font-size: 16px; color: #88c0b1;');
console.log('Check the results above for any ❌ marks.');
console.log('All ✅ marks indicate Figma-compliant values.');
console.log('\n');
console.log('%cTip: Run this script on different pages (/ihr-vorteil, /, etc.) to verify consistency.', 'font-style: italic; color: #666;');

