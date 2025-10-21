const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'iedths1l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

console.log('🔍 Testing Sanity connection...\n');

// Test 1: Check connection
client.fetch('*[_type == "page"]')
  .then(pages => {
    console.log(`✅ Sanity connected! Found ${pages.length} pages`);
    
    if (pages.length === 0) {
      console.log('\n⚠️  NO PAGES FOUND!');
      console.log('   → Create pages in Sanity Studio');
      console.log('   → Make sure they are PUBLISHED (not draft)');
    } else {
      console.log('\n📄 Available pages:');
      pages.forEach(page => {
        console.log(`   - ${page.title} (slug: ${page.slug?.current || 'NO SLUG'})`);
      });
    }
    
    // Test 2: Check for home page
    console.log('\n🏠 Checking for "home" page...');
    return client.fetch('*[_type == "page" && slug.current == "home"][0]');
  })
  .then(homePage => {
    if (homePage) {
      console.log('✅ Home page found!');
      console.log(`   Title: ${homePage.title}`);
      console.log(`   Content blocks: ${homePage.content?.length || 0}`);
    } else {
      console.log('❌ HOME PAGE NOT FOUND!');
      console.log('\n🔧 FIX:');
      console.log('   1. Open Sanity Studio: http://localhost:3333');
      console.log('   2. Go to "Pages"');
      console.log('   3. Create a new page with:');
      console.log('      - Title: "Home"');
      console.log('      - Slug: "home"');
      console.log('   4. Add some content blocks');
      console.log('   5. Click "Publish"');
    }
  })
  .catch(err => {
    console.error('❌ Sanity connection error:');
    console.error(`   ${err.message}`);
    console.error('\n🔧 Possible fixes:');
    console.error('   - Check internet connection');
    console.error('   - Verify project ID: iedths1l');
    console.error('   - Check Sanity Studio is running');
  });

