const fs = require('fs');
const path = require('path');

// Read the profile data
console.log('📊 Loading profile data...');
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

// Count occurrences
profiles.forEach((profile, index) => {
    if (index % 5000 === 0) {
        console.log(`Processing profile ${index}/${profiles.length}`);
    }
    
    // Ammatti (field: ammatit - array)
    if (profile.ammatit) {
        const ammatit = Array.isArray(profile.ammatit) ? profile.ammatit : [profile.ammatit];
        ammatit.forEach(ammatti => {
            if (ammatti && typeof ammatti === 'string') {
                const ammattiTrimmed = ammatti.trim();
                if (ammattiTrimmed) {
                    categoryIndex.ammatti[ammattiTrimmed] = (categoryIndex.ammatti[ammattiTrimmed] || 0) + 1;
                }
            }
        });
    }
    
    // Osaaminen (field: osaamiset - array)
    if (profile.osaamiset) {
        const osaamiset = Array.isArray(profile.osaamiset) ? profile.osaamiset : [profile.osaamiset];
        osaamiset.forEach(osaaminen => {
            if (osaaminen && typeof osaaminen === 'string') {
                const osaaminenTrimmed = osaaminen.trim();
                if (osaaminenTrimmed) {
                    categoryIndex.osaaminen[osaaminenTrimmed] = (categoryIndex.osaaminen[osaaminenTrimmed] || 0) + 1;
                }
            }
        });
    }
    
    // Työtoiveet (field: tyotoiveet - no ö, object/array)
    if (profile.tyotoiveet) {
        const tyotoiveet = Array.isArray(profile.tyotoiveet) ? profile.tyotoiveet : [profile.tyotoiveet];
        tyotoiveet.forEach(toive => {
            if (toive && typeof toive === 'string') {
                const toiveTrimmed = toive.trim();
                if (toiveTrimmed) {
                    categoryIndex.työtoiveet[toiveTrimmed] = (categoryIndex.työtoiveet[toiveTrimmed] || 0) + 1;
                }
            }
        });
    }
    
    // Työnhakualue (field: tyonhakualue - no ö, object/array)
    if (profile.tyonhakualue) {
        const alueet = Array.isArray(profile.tyonhakualue) ? profile.tyonhakualue : [profile.tyonhakualue];
        alueet.forEach(alue => {
            if (alue && typeof alue === 'string') {
                const alueTrimmed = alue.trim();
                if (alueTrimmed) {
                    categoryIndex.työnhakualue[alueTrimmed] = (categoryIndex.työnhakualue[alueTrimmed] || 0) + 1;
                }
            }
        });
    }
    
    // Kielitaito (direct field)
    if (profile.kielitaito) {
        const kielet = Array.isArray(profile.kielitaito) ? profile.kielitaito : [profile.kielitaito];
        kielet.forEach(kieli => {
            if (kieli && typeof kieli === 'string') {
                const kieliTrimmed = kieli.trim();
                if (kieliTrimmed) {
                    categoryIndex.kielitaito[kieliTrimmed] = (categoryIndex.kielitaito[kieliTrimmed] || 0) + 1;
                }
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
    
    // Ajokortit (array or string)
    if (profile.ajokortit) {
        const ajokortit = Array.isArray(profile.ajokortit) ? profile.ajokortit : [profile.ajokortit];
        ajokortit.forEach(ajokortti => {
            if (ajokortti && typeof ajokortti === 'string') {
                const ajokorttitrimmed = ajokortti.trim();
                if (ajokorttitrimmed) {
                    categoryIndex.ajokortit[ajokorttitrimmed] = (categoryIndex.ajokortit[ajokorttitrimmed] || 0) + 1;
                }
            }
        });
    }
    
    // Lupatiedot (direct field)
    if (profile.lupatiedot) {
        const luvat = Array.isArray(profile.lupatiedot) ? profile.lupatiedot : [profile.lupatiedot];
        luvat.forEach(lupa => {
            if (lupa && typeof lupa === 'string') {
                const lupaTrimmed = lupa.trim();
                if (lupaTrimmed) {
                    categoryIndex.lupatiedot[lupaTrimmed] = (categoryIndex.lupatiedot[lupaTrimmed] || 0) + 1;
                }
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
    version: "2.0"
};

// Save the result
const outputPath = path.join(__dirname, 'checkbox-data-full.json');
fs.writeFileSync(outputPath, JSON.stringify(checkboxData, null, 2));

console.log('\n📊 CHECKBOX DATA GENERATED:');
Object.keys(result).forEach(category => {
    console.log(`${category}: ${result[category].length} options (max: ${result[category][0]?.count || 0})`);
});

console.log(`\n✅ Full checkbox data saved to: ${outputPath}`);
console.log(`📈 Total profiles processed: ${profiles.length}`);
