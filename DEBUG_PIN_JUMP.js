// 🔍 FEATURECARDS PIN JUMP DIAGNOSTIC
// Paste this into the browser console on /unser-konzept page

console.clear();
console.log('🎬 PIN JUMP DIAGNOSTIC STARTED');
console.log('Scroll slowly to the FeatureCards section...\n');

// Find the section and headline
const section = document.querySelector('[class*="pt-[80px]"][class*="pb-[100px]"]');
const headline = section?.querySelector('h2');

if (!section || !headline) {
  console.error('❌ Could not find section or headline!');
  console.log('Section:', section);
  console.log('Headline:', headline);
} else {
  console.log('✅ Elements found:', { section, headline });
  
  // Track position every frame
  let lastY = null;
  let lastComputedStyle = null;
  let frameCount = 0;
  
  function checkPosition() {
    frameCount++;
    
    // Get headline position
    const rect = headline.getBoundingClientRect();
    const y = rect.top;
    
    // Get computed styles
    const sectionStyle = window.getComputedStyle(section);
    const headlineStyle = window.getComputedStyle(headline);
    
    const currentState = {
      sectionPosition: sectionStyle.position,
      sectionTop: sectionStyle.top,
      sectionTransform: sectionStyle.transform,
      headlineMarginTop: headlineStyle.marginTop,
      headlineLineHeight: headlineStyle.lineHeight,
      headlineFontSize: headlineStyle.fontSize,
    };
    
    // Detect position changes
    if (lastY !== null) {
      const diff = Math.abs(y - lastY);
      
      // Log significant jumps (more than 0.5px)
      if (diff > 0.5 && diff < 100) {
        console.warn(`⚠️ JUMP DETECTED! ${diff.toFixed(2)}px shift`);
        console.log('Frame:', frameCount);
        console.log('Previous Y:', lastY.toFixed(2), 'px');
        console.log('Current Y:', y.toFixed(2), 'px');
        console.log('Shift:', (y - lastY).toFixed(2), 'px');
        console.log('\n📊 Style Changes:');
        
        if (lastComputedStyle) {
          Object.keys(currentState).forEach(key => {
            if (currentState[key] !== lastComputedStyle[key]) {
              console.log(`  ${key}:`, lastComputedStyle[key], '→', currentState[key]);
            }
          });
        }
        
        console.log('\n📐 Current State:');
        console.log('  Section position:', currentState.sectionPosition);
        console.log('  Section top:', currentState.sectionTop);
        console.log('  Section transform:', currentState.sectionTransform);
        console.log('  Headline margin-top:', currentState.headlineMarginTop);
        console.log('  Headline y position:', y.toFixed(2), 'px');
        console.log('\n---\n');
      }
    }
    
    lastY = y;
    lastComputedStyle = currentState;
    
    requestAnimationFrame(checkPosition);
  }
  
  requestAnimationFrame(checkPosition);
  
  console.log('📹 Monitoring position changes...');
  console.log('Any jump > 0.5px will be logged with details!\n');
}

// Also monitor ScrollTrigger events
setTimeout(() => {
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) {
    console.log('✅ ScrollTrigger found, monitoring events...\n');
    
    ScrollTrigger.getAll().forEach((st, index) => {
      st.vars.onToggle = function(self) {
        console.log(`🎯 ScrollTrigger ${index} toggled:`, {
          active: self.isActive,
          direction: self.direction,
          progress: self.progress
        });
      };
      
      st.vars.onEnter = function(self) {
        console.log(`▶️ ScrollTrigger ${index} ENTERED (pin starting)`);
        const headline = document.querySelector('[class*="pt-[80px]"] h2');
        if (headline) {
          const rect = headline.getBoundingClientRect();
          console.log('  Headline Y on pin start:', rect.top.toFixed(2), 'px');
        }
      };
    });
  }
}, 1000);

