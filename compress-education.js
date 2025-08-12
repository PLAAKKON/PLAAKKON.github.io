const fs = require('fs');
const path = require('path');

// TIIVISTÄ KOULUTUS DATA
console.log('🎓 KOULUTUS DATA COMPRESSION');

// Read the complete data
const completePath = path.join(__dirname, 'checkbox-data-complete.json');
const completeData = JSON.parse(fs.readFileSync(completePath, 'utf8'));

console.log(`Original koulutus entries: ${completeData.data.koulutus.length}`);

// Koulutus compression rules
function compressEducation(educationName) {
    const name = educationName.toLowerCase().trim();
    
    // Remove common suffixes and institution names
    let compressed = name
        .replace(/\s*\/\s*.*$/, '') // Remove / and everything after (institution names)
        .replace(/\s*-\s*.*$/, '') // Remove - and everything after  
        .replace(/\s*,\s*.*$/, '') // Remove , and everything after
        .replace(/\s*\(\s*.*?\s*\)/g, '') // Remove parentheses content
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
    
    // Group similar educations
    if (compressed.includes('liiketalou') || compressed.includes('kauppa')) {
        return 'Liiketalous';
    }
    if (compressed.includes('tietojenkäsittel') || compressed.includes('tietotekniik') || compressed.includes('ohjelmisto')) {
        return 'Tietotekniikka';
    }
    if (compressed.includes('sosiaali') || compressed.includes('terveys') || compressed.includes('hoito')) {
        return 'Sosiaali- ja terveysala';
    }
    if (compressed.includes('tekniik') || compressed.includes('insinöör')) {
        return 'Tekniikka';
    }
    if (compressed.includes('kaupan') || compressed.includes('myyn')) {
        return 'Kauppa ja myynti';
    }
    if (compressed.includes('matkailu') || compressed.includes('ravitsemi') || compressed.includes('hotelli')) {
        return 'Matkailu ja ravitsemisala';
    }
    if (compressed.includes('kuljetus') || compressed.includes('logistiik')) {
        return 'Kuljetus ja logistiikka';
    }
    if (compressed.includes('rakennu') || compressed.includes('talonrak')) {
        return 'Rakennusala';
    }
    if (compressed.includes('media') || compressed.includes('viestint') || compressed.includes('graafi')) {
        return 'Media ja viestintä';
    }
    if (compressed.includes('kieli') || compressed.includes('käännös')) {
        return 'Kielitieteet';
    }
    if (compressed.includes('opetus') || compressed.includes('pedagogiikk')) {
        return 'Opetus ja kasvatus';
    }
    if (compressed.includes('oikeus') || compressed.includes('laki')) {
        return 'Oikeustieteet';
    }
    if (compressed.includes('psykolog') || compressed.includes('mielenter')) {
        return 'Psykologia';
    }
    if (compressed.includes('maatalou') || compressed.includes('metsä') || compressed.includes('ympärist')) {
        return 'Luonnonvarat ja ympäristö';
    }
    if (compressed.includes('taide') || compressed.includes('muotoil') || compressed.includes('kuvataid')) {
        return 'Taide ja muotoilu';
    }
    if (compressed.includes('urheilu') || compressed.includes('liikunt')) {
        return 'Liikunta ja urheilu';
    }
    if (compressed.includes('turvallisuus') || compressed.includes('pelastus')) {
        return 'Turvallisuusala';
    }
    
    // Capitalize first letter
    return compressed.charAt(0).toUpperCase() + compressed.slice(1);
}

// Compress and group educations
const educationGroups = {};

completeData.data.koulutus.forEach(edu => {
    const compressed = compressEducation(edu.value);
    if (educationGroups[compressed]) {
        educationGroups[compressed] += edu.count;
    } else {
        educationGroups[compressed] = edu.count;
    }
});

// Convert back to array and sort
const compressedEducations = Object.entries(educationGroups)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 100); // Top 100 after compression

console.log(`Compressed koulutus entries: ${compressedEducations.length}`);
console.log('Top 10 compressed educations:');
compressedEducations.slice(0, 10).forEach((edu, i) => {
    console.log(`${i+1}. ${edu.value} (${edu.count})`);
});

// Update the complete data
completeData.data.koulutus = compressedEducations;
completeData.version = "COMPRESSED_EDUCATION_3.0";

// Save compressed version
const outputPath = path.join(__dirname, 'checkbox-data-compressed.json');
fs.writeFileSync(outputPath, JSON.stringify(completeData, null, 2));

console.log(`\n✅ Compressed data saved to: ${outputPath}`);

// Check new file size
const newSize = fs.statSync(outputPath).size;
const oldSize = fs.statSync(completePath).size;
console.log(`File size reduced: ${(oldSize/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB`);
console.log(`Compression ratio: ${((oldSize-newSize)/oldSize*100).toFixed(1)}% smaller`);
