const fs = require('fs');
const path = require('path');

console.log('🚀 NOPEA: Luodaan KAIKKI ammatit suoraan Firebase-datasta...');

try {
    // Lue alkuperäinen Firebase-data (27,717 profiilia)
    const firebasePath = path.join(__dirname, 'private', 'data', 'profiilit_anonymized.json');
    const firebaseData = JSON.parse(fs.readFileSync(firebasePath, 'utf8'));
    console.log('✅ Firebase data luettu:', Object.keys(firebaseData).length, 'profiilia');
    
    // Laske KAIKKI kategoriat (ei rajauksia!)
    const counters = {
        ammatti: new Map(),
        osaaminen: new Map(),
        työtoiveet: new Map(),
        työnhakualue: new Map(),
        kielitaito: new Map(),
        koulutus: new Map(),
        ajokortit: new Map(),
        lupatiedot: new Map()
    };
    
    let processed = 0;
    Object.values(firebaseData).forEach(profile => {
        if (++processed % 1000 === 0) console.log(`  Käsitelty ${processed} profiilia...`);
        
        // AMMATTI - KAIKKI (myös 1 henkilön ammatit!)
        if (profile.ammatit && Array.isArray(profile.ammatit)) {
            profile.ammatit.forEach(ammatti => {
                if (ammatti && ammatti.trim()) {
                    counters.ammatti.set(ammatti, (counters.ammatti.get(ammatti) || 0) + 1);
                }
            });
        }
        
        // OSAAMINEN - KAIKKI
        if (profile.osaamiset && Array.isArray(profile.osaamiset)) {
            profile.osaamiset.forEach(skill => {
                if (skill && skill.trim()) {
                    counters.osaaminen.set(skill, (counters.osaaminen.get(skill) || 0) + 1);
                }
            });
        }
        
        // TYÖTOIVEET - KAIKKI
        if (profile.työtoiveet && Array.isArray(profile.työtoiveet)) {
            profile.työtoiveet.forEach(wish => {
                if (wish && wish.trim()) {
                    counters.työtoiveet.set(wish, (counters.työtoiveet.get(wish) || 0) + 1);
                }
            });
        }
        
        // TYÖNHAKUALUE - KAIKKI
        if (profile.työnhakualue && Array.isArray(profile.työnhakualue)) {
            profile.työnhakualue.forEach(area => {
                if (area && area.trim()) {
                    counters.työnhakualue.set(area, (counters.työnhakualue.get(area) || 0) + 1);
                }
            });
        }
        
        // KIELITAITO - KAIKKI
        if (profile.kielitaito && Array.isArray(profile.kielitaito)) {
            profile.kielitaito.forEach(lang => {
                if (lang && lang.trim()) {
                    counters.kielitaito.set(lang, (counters.kielitaito.get(lang) || 0) + 1);
                }
            });
        }
        
        // KOULUTUS - kompressoitu versio
        if (profile.koulutus) {
            // Käytä yksinkertaistettua koulutusdata
            let compressedEdu = profile.koulutus;
            if (compressedEdu.includes('tekniikka') || compressedEdu.includes('insinööri')) compressedEdu = 'Tekniikka';
            else if (compressedEdu.includes('tradenomi')) compressedEdu = 'Tradenomi';
            else if (compressedEdu.includes('liiketalous')) compressedEdu = 'Liiketalous';
            // ... jne (käytä samaa logiikkaa kuin ennen)
            
            counters.koulutus.set(compressedEdu, (counters.koulutus.get(compressedEdu) || 0) + 1);
        }
        
        // AJOKORTIT - KAIKKI
        if (profile.ajokortit && Array.isArray(profile.ajokortit)) {
            profile.ajokortit.forEach(license => {
                if (license && license.trim()) {
                    counters.ajokortit.set(license, (counters.ajokortit.get(license) || 0) + 1);
                }
            });
        }
        
        // LUPATIEDOT - KAIKKI
        if (profile.lupatiedot && Array.isArray(profile.lupatiedot)) {
            profile.lupatiedot.forEach(permit => {
                if (permit && permit.trim()) {
                    counters.lupatiedot.set(permit, (counters.lupatiedot.get(permit) || 0) + 1);
                }
            });
        }
    });
    
    // Muunna Map -> Array ja järjestä määrän mukaan
    const result = {
        data: {},
        generated: new Date().toISOString(),
        profileCount: Object.keys(firebaseData).length,
        version: "ABSOLUTE_FULL_NO_LIMITS_6.0"
    };
    
    Object.keys(counters).forEach(category => {
        result.data[category] = Array.from(counters[category].entries())
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count);
        
        console.log(`📊 ${category}: ${result.data[category].length} vaihtoehtoa (suurin: ${result.data[category][0]?.count}, pienin: ${result.data[category][result.data[category].length-1]?.count})`);
    });
    
    // Tallenna HTML
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    const dataStart = htmlContent.indexOf('const STATIC_CHECKBOX_DATA = {');
    if (dataStart === -1) throw new Error('STATIC_CHECKBOX_DATA ei löytynyt');
    
    let braceCount = 0, found = false, dataEnd = -1;
    for (let i = dataStart; i < htmlContent.length; i++) {
        if (htmlContent[i] === '{') braceCount++;
        else if (htmlContent[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                found = true;
                let j = i + 1;
                while (j < htmlContent.length && htmlContent[j].match(/\s/)) j++;
                if (htmlContent[j] === ';') {
                    dataEnd = j + 1;
                    break;
                }
            }
        }
    }
    
    const newHtml = htmlContent.substring(0, dataStart) + 
                   `const STATIC_CHECKBOX_DATA = ${JSON.stringify(result, null, 2)};` + 
                   htmlContent.substring(dataEnd);
    
    fs.writeFileSync(htmlPath, newHtml, 'utf8');
    
    console.log('✅ VALMIS! HTML päivitetty KAIKILLA ammatinimikkeillä!');
    console.log('📊 Yhteensä hakuehtoja:', Object.values(result.data).reduce((sum, arr) => sum + arr.length, 0));
    
} catch (error) {
    console.error('❌ Virhe:', error.message);
}
