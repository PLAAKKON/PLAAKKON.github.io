const fs = require('fs');
const path = require('path');

console.log('🔄 AUTOMATIC HTML UPDATE WITH COMPACT DATA');

// Paths
const compactDataPath = path.join(__dirname, 'checkbox-data-html-compact.json');
const htmlPath = path.join(__dirname, 'index.html');
const deployPath = path.join(__dirname, '..', 'kotisivu', 'yoro.fi', 'profiiliselain', 'index.html');

console.log('📖 Reading compact data...');
const compactData = fs.readFileSync(compactDataPath, 'utf8');

console.log('📖 Reading HTML file...');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('🔍 Finding STATIC_CHECKBOX_DATA...');
// Find the start and end of STATIC_CHECKBOX_DATA object
const startPattern = /const STATIC_CHECKBOX_DATA = \{/;
const startMatch = htmlContent.match(startPattern);

if (!startMatch) {
    console.error('❌ Could not find STATIC_CHECKBOX_DATA in HTML');
    process.exit(1);
}

const startIndex = startMatch.index;
console.log(`✅ Found STATIC_CHECKBOX_DATA at position ${startIndex}`);

// Find the end of the object (look for }; after the start)
let braceCount = 0;
let endIndex = -1;
let foundFirstBrace = false;

for (let i = startIndex; i < htmlContent.length; i++) {
    const char = htmlContent[i];
    
    if (char === '{') {
        braceCount++;
        foundFirstBrace = true;
    } else if (char === '}') {
        braceCount--;
        if (foundFirstBrace && braceCount === 0) {
            // Look for the semicolon after the closing brace
            if (htmlContent[i + 1] === ';') {
                endIndex = i + 2;
                break;
            }
        }
    }
}

if (endIndex === -1) {
    console.error('❌ Could not find end of STATIC_CHECKBOX_DATA object');
    process.exit(1);
}

console.log(`✅ Found end of object at position ${endIndex}`);

// Replace the data
const beforeData = htmlContent.substring(0, startIndex);
const afterData = htmlContent.substring(endIndex);
const newHtmlContent = beforeData + `const STATIC_CHECKBOX_DATA = ${compactData};` + afterData;

console.log('💾 Writing updated HTML...');
fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');

console.log('📋 Copying to deployment directory...');
fs.writeFileSync(deployPath, newHtmlContent, 'utf8');

console.log('✅ HTML UPDATE COMPLETE!');
console.log(`📊 Compact data embedded: ${JSON.parse(compactData).data ? 'YES' : 'NO'}`);
console.log(`📈 Profile count: ${JSON.parse(compactData).profileCount}`);
console.log(`🎯 Total categories: ${Object.keys(JSON.parse(compactData).data).length}`);

const totalOptions = Object.values(JSON.parse(compactData).data).reduce((sum, arr) => sum + arr.length, 0);
console.log(`📋 Total checkbox options: ${totalOptions}`);

console.log('\n🚀 READY FOR GIT DEPLOYMENT!');
console.log('Next steps:');
console.log('1. cd C:\\Konsultti_yritys_Yoro_Oy\\kotisivu\\yoro.fi');
console.log('2. git add profiiliselain/index.html');
console.log('3. git commit -m "UPDATE: Real Firebase data with 197 options"');
console.log('4. git push origin master');
