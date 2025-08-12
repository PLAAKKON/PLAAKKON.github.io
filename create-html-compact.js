const fs = require('fs');
const path = require('path');

// SUPER COMPACT VERSION FOR HTML EMBEDDING
console.log('📦 CREATING COMPACT VERSION FOR HTML');

const compressedPath = path.join(__dirname, 'checkbox-data-compressed.json');
const data = JSON.parse(fs.readFileSync(compressedPath, 'utf8'));

// Ultra compact limits for HTML embedding
const compactLimits = {
    'ammatti': 30,         // Top 30 professions
    'osaaminen': 40,       // Top 40 skills  
    'työtoiveet': 20,      // Top 20 work wishes
    'työnhakualue': 30,    // Top 30 areas
    'kielitaito': 25,      // Top 25 languages
    'koulutus': 25,        // Top 25 educations (compressed)
    'ajokortit': 10,       // Top 10 driving licenses
    'lupatiedot': 20       // Top 20 permits
};

const compactData = {
    data: {},
    generated: data.generated,
    profileCount: data.profileCount,
    version: "ULTRA_COMPACT_HTML_4.0"
};

Object.keys(data.data).forEach(category => {
    const limit = compactLimits[category] || 20;
    compactData.data[category] = data.data[category].slice(0, limit);
});

// Save ultra compact version
const outputPath = path.join(__dirname, 'checkbox-data-html-compact.json');
fs.writeFileSync(outputPath, JSON.stringify(compactData, null, 2));

console.log('\n📦 ULTRA COMPACT DATA CREATED:');
Object.keys(compactData.data).forEach(category => {
    console.log(`${category}: ${compactData.data[category].length} options (max: ${compactData.data[category][0]?.count || 0})`);
});

const compactSize = fs.statSync(outputPath).size;
console.log(`\n✅ Ultra compact data saved to: ${outputPath}`);
console.log(`📦 File size: ${(compactSize/1024).toFixed(1)}KB (perfect for HTML embedding)`);

// Show total options
const totalOptions = Object.values(compactData.data).reduce((sum, arr) => sum + arr.length, 0);
console.log(`🎯 Total checkbox options: ${totalOptions}`);
console.log('🚀 READY FOR HTML DEPLOYMENT!');
