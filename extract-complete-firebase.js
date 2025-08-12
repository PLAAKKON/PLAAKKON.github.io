const fs = require('fs');
const path = require('path');

// KÄYTETÄÄN ANONYMIZED DATAA JOSSA ON KAIKKI KENTÄT!
console.log('🔥 FIREBASE DATA RE-READ - ANONYMIZED VERSION');
const profilePath = path.join(__dirname, 'public', 'data', 'profiilit_anonymized.json');
const profiles = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

console.log(`✅ Loaded ${profiles.length} profiles from anonymized data`);

// Initialize counters
const categoryIndex = {
    ammatti: {},
    osaaminen: {},
    työtoiveet: {},
    työnhakualue: {},
    kielitaito: {},
    koulutus: {},
    ajokortit: {},
    lupatiedot: {}
};

// Helper function to extract values from Firebase objects
function extractFirebaseValues(firebaseObj) {
    if (!firebaseObj || typeof firebaseObj !== 'object') return [];
    
    const values = [];
    
    // Check if it's an array-like object with numeric keys
    if (Array.isArray(firebaseObj)) {
        values.push(...firebaseObj.filter(item => typeof item === 'string' && item.trim()));
    } else {
        // Extract values from object keys/values
        Object.keys(firebaseObj).forEach(key => {
            const value = firebaseObj[key];
            if (typeof value === 'string' && value.trim()) {
                values.push(value.trim());
            } else if (typeof key === 'string' && key.trim() && !key.match(/^\d+$/)) {
                // Use key as value if it's not numeric
                values.push(key.trim());
            }
        });
    }
    
    return values;
}

// Count occurrences
profiles.forEach((profile, index) => {
    if (index % 5000 === 0) {
        console.log(`Processing profile ${index}/${profiles.length}`);
    }
    
    // DEBUG: First profile to understand structure
    if (index === 0) {
        console.log('\n🔥 ANONYMIZED FIREBASE STRUCTURE:');
        console.log('työtoiveet type:', typeof profile.työtoiveet);
        console.log('työtoiveet sample:', JSON.stringify(profile.työtoiveet, null, 2)?.substring(0, 300));
        console.log('työnhakualue type:', typeof profile.työnhakualue);
        console.log('työnhakualue sample:', JSON.stringify(profile.työnhakualue, null, 2)?.substring(0, 300));
        console.log('');
    }
    
    // Ammatti (ammatit - array/object)
    if (profile.ammatit) {
        const ammatit = extractFirebaseValues(profile.ammatit);
        ammatit.forEach(ammatti => {
            if (ammatti) {
                categoryIndex.ammatti[ammatti] = (categoryIndex.ammatti[ammatti] || 0) + 1;
            }
        });
    }
    
    // Osaaminen (osaamiset - array/object)
    if (profile.osaamiset) {
        const osaamiset = extractFirebaseValues(profile.osaamiset);
        osaamiset.forEach(osaaminen => {
            if (osaaminen) {
                categoryIndex.osaaminen[osaaminen] = (categoryIndex.osaaminen[osaaminen] || 0) + 1;
            }
        });
    }
    
    // Työtoiveet (työtoiveet - Firebase object with ö)
    if (profile.työtoiveet) {
        const tyotoiveet = extractFirebaseValues(profile.työtoiveet);
        tyotoiveet.forEach(toive => {
            if (toive) {
                categoryIndex.työtoiveet[toive] = (categoryIndex.työtoiveet[toive] || 0) + 1;
            }
        });
    }
    
    // Työnhakualue (työnhakualue - Firebase object with ö)
    if (profile.työnhakualue) {
        const alueet = extractFirebaseValues(profile.työnhakualue);
        alueet.forEach(alue => {
            if (alue) {
                categoryIndex.työnhakualue[alue] = (categoryIndex.työnhakualue[alue] || 0) + 1;
            }
        });
    }
    
    // Kielitaito (Firebase object)
    if (profile.kielitaito) {
        const kielet = extractFirebaseValues(profile.kielitaito);
        kielet.forEach(kieli => {
            if (kieli) {
                categoryIndex.kielitaito[kieli] = (categoryIndex.kielitaito[kieli] || 0) + 1;
            }
        });
    }
    
    // Koulutus (array of arrays - extract first element)
    if (profile.koulutus && Array.isArray(profile.koulutus)) {
        profile.koulutus.forEach(koulutusArray => {
            if (Array.isArray(koulutusArray) && koulutusArray.length > 0) {
                const koulutusNimi = koulutusArray[0]; // First element is the name
                if (koulutusNimi && typeof koulutusNimi === 'string') {
                    const koulutusTrimmed = koulutusNimi.trim();
                    if (koulutusTrimmed) {
                        categoryIndex.koulutus[koulutusTrimmed] = (categoryIndex.koulutus[koulutusTrimmed] || 0) + 1;
                    }
                }
            }
        });
    }
    
    // Ajokortit (Firebase object)
    if (profile.ajokortit) {
        const ajokortit = extractFirebaseValues(profile.ajokortit);
        ajokortit.forEach(ajokortti => {
            if (ajokortti) {
                categoryIndex.ajokortit[ajokortti] = (categoryIndex.ajokortit[ajokortti] || 0) + 1;
            }
        });
    }
    
    // Lupatiedot (Firebase object)
    if (profile.lupatiedot) {
        const luvat = extractFirebaseValues(profile.lupatiedot);
        luvat.forEach(lupa => {
            if (lupa) {
                categoryIndex.lupatiedot[lupa] = (categoryIndex.lupatiedot[lupa] || 0) + 1;
            }
        });
    }
});

// Convert to arrays and sort by count
const result = {};
Object.keys(categoryIndex).forEach(category => {
    const sorted = Object.entries(categoryIndex[category])
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
    
    // Smart limits per category
    const limits = {
        'ammatti': 200,        // Top 200 professions
        'osaaminen': 300,      // Top 300 skills  
        'työtoiveet': 100,     // Top 100 work wishes
        'työnhakualue': 100,   // Top 100 areas
        'kielitaito': 100,     // Top 100 languages
        'koulutus': 500,       // Top 500 educations
        'ajokortit': 20,       // All driving licenses
        'lupatiedot': 94       // All permits
    };
    
    const limit = limits[category] || 100;
    result[category] = sorted.slice(0, limit);
});

// Create final checkbox data structure
const checkboxData = {
    data: result,
    generated: new Date().toISOString(),
    profileCount: profiles.length,
    version: "COMPLETE_FIREBASE_EXTRACTION_3.0"
};

// Save the result
const outputPath = path.join(__dirname, 'checkbox-data-complete.json');
fs.writeFileSync(outputPath, JSON.stringify(checkboxData, null, 2));

console.log('\n🔥 COMPLETE FIREBASE CHECKBOX DATA GENERATED:');
Object.keys(result).forEach(category => {
    console.log(`${category}: ${result[category].length} options (max: ${result[category][0]?.count || 0})`);
});

console.log(`\n✅ Complete Firebase data saved to: ${outputPath}`);
console.log(`📈 Total profiles processed: ${profiles.length}`);
console.log('🔥 ALL FIREBASE FIELDS SUCCESSFULLY EXTRACTED! 🔥');
