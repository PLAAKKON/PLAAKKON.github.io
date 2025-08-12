const fs = require('fs');
const path = require('path');

// Read the profile data
console.log('🔥 FIREBASE PARAMETER EXTRACTION - Loading profile data...');
const profilePath = path.join(__dirname, 'public', 'data', 'profiilit.json');
const profiles = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

console.log(`✅ Loaded ${profiles.length} profiles`);

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
        console.log('\n🔥 FIREBASE OBJECT ANALYSIS:');
        console.log('tyotoiveet type:', typeof profile.tyotoiveet);
        console.log('tyotoiveet sample:', JSON.stringify(profile.tyotoiveet, null, 2)?.substring(0, 200));
        console.log('tyonhakualue type:', typeof profile.tyonhakualue);
        console.log('tyonhakualue sample:', JSON.stringify(profile.tyonhakualue, null, 2)?.substring(0, 200));
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
    
    // Työtoiveet (tyotoiveet - Firebase object)
    if (profile.tyotoiveet) {
        const tyotoiveet = extractFirebaseValues(profile.tyotoiveet);
        tyotoiveet.forEach(toive => {
            if (toive) {
                categoryIndex.työtoiveet[toive] = (categoryIndex.työtoiveet[toive] || 0) + 1;
            }
        });
    }
    
    // Työnhakualue (tyonhakualue - Firebase object)
    if (profile.tyonhakualue) {
        const alueet = extractFirebaseValues(profile.tyonhakualue);
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
    result[category] = Object.entries(categoryIndex[category])
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 50); // Top 50 most common values
});

// Create final checkbox data structure
const checkboxData = {
    data: result,
    generated: new Date().toISOString(),
    profileCount: profiles.length,
    version: "FIREBASE_EXTRACTION_2.0"
};

// Save the result
const outputPath = path.join(__dirname, 'checkbox-data-firebase.json');
fs.writeFileSync(outputPath, JSON.stringify(checkboxData, null, 2));

console.log('\n🔥 FIREBASE CHECKBOX DATA GENERATED:');
Object.keys(result).forEach(category => {
    console.log(`${category}: ${result[category].length} options (max: ${result[category][0]?.count || 0})`);
});

console.log(`\n✅ Firebase checkbox data saved to: ${outputPath}`);
console.log(`📈 Total profiles processed: ${profiles.length}`);
console.log('🔥 FIREBASE OBJECTS SUCCESSFULLY PARAMETRIZED! 🔥');
