const fs = require('fs');
const path = require('path');

console.log('🔧 Luodaan chunked-versio jossa KAIKKI ammatit ovat saatavilla...');

try {
    // Lue alkuperäinen Firebase-data
    const firebasePath = path.join(__dirname, 'private', 'data', 'profiilit_anonymized.json');
    const firebaseData = JSON.parse(fs.readFileSync(firebasePath, 'utf8'));
    console.log('✅ Firebase data luettu:', Object.keys(firebaseData).length, 'profiilia');
    
    // Laske KAIKKI kategoriat
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
        if (++processed % 5000 === 0) console.log(`  Käsitelty ${processed} profiilia...`);
        
        // AMMATTI - KAIKKI
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
        
        // KOULUTUS - yksinkertaistettu
        if (profile.koulutus) {
            let simpleEdu;
            if (typeof profile.koulutus === 'string') {
                simpleEdu = profile.koulutus.toLowerCase();
                if (simpleEdu.includes('ylioppilas')) simpleEdu = 'Ylioppilastutkinto';
                else if (simpleEdu.includes('tekniikka') || simpleEdu.includes('insinööri')) simpleEdu = 'Tekniikka';
                else if (simpleEdu.includes('tradenomi')) simpleEdu = 'Tradenomi';
                else if (simpleEdu.includes('liiketalous')) simpleEdu = 'Liiketalous';
                else if (simpleEdu.includes('maist')) simpleEdu = 'Maisterin tutkinto';
                else simpleEdu = profile.koulutus; // Pidä alkuperäinen jos ei osaa kategorisoida
            } else {
                // Jos ei ole string, muunna stringiksi
                simpleEdu = String(profile.koulutus);
            }
            
            counters.koulutus.set(simpleEdu, (counters.koulutus.get(simpleEdu) || 0) + 1);
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
    
    console.log('📊 Datan tilastot:');
    Object.keys(counters).forEach(category => {
        const count = counters[category].size;
        console.log(`  ${category}: ${count} vaihtoehtoa`);
    });
    
    // Jaa data osiin - INITIAL chunk (top 50 per kategoria) + FULL chunk (kaikki)
    const initialData = { data: {} };
    const fullData = { data: {} };
    
    Object.keys(counters).forEach(category => {
        const sorted = Array.from(counters[category].entries())
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count);
        
        // INITIAL: Top 50 (näytetään heti)
        initialData.data[category] = sorted.slice(0, 50);
        
        // FULL: Kaikki (ladataan hakua varten)
        fullData.data[category] = sorted;
        
        console.log(`  ${category}: Initial ${initialData.data[category].length}, Full ${fullData.data[category].length}`);
    });
    
    initialData.generated = new Date().toISOString();
    initialData.profileCount = Object.keys(firebaseData).length;
    initialData.version = "CHUNKED_INITIAL_1.0";
    
    fullData.generated = new Date().toISOString();
    fullData.profileCount = Object.keys(firebaseData).length;
    fullData.version = "CHUNKED_FULL_1.0";
    
    // Tallenna chunkit
    fs.writeFileSync(path.join(__dirname, 'checkbox-data-initial.json'), JSON.stringify(initialData, null, 2));
    fs.writeFileSync(path.join(__dirname, 'checkbox-data-full.json'), JSON.stringify(fullData, null, 2));
    
    console.log('✅ Chunked data tallennettu');
    console.log(`📊 Initial size: ${JSON.stringify(initialData).length} merkkiä`);
    console.log(`📊 Full size: ${JSON.stringify(fullData).length} merkkiä`);
    
    // Päivitä HTML chunked-versiolla
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Etsi ja korvaa STATIC_CHECKBOX_DATA osio
    const dataStart = htmlContent.indexOf('const STATIC_CHECKBOX_DATA = {');
    if (dataStart === -1) throw new Error('STATIC_CHECKBOX_DATA ei löytynyt');
    
    let braceCount = 0, dataEnd = -1;
    for (let i = dataStart; i < htmlContent.length; i++) {
        if (htmlContent[i] === '{') braceCount++;
        else if (htmlContent[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                let j = i + 1;
                while (j < htmlContent.length && htmlContent[j].match(/\s/)) j++;
                if (htmlContent[j] === ';') {
                    dataEnd = j + 1;
                    break;
                }
            }
        }
    }
    
    // Luo chunked HTML template
    const htmlTemplate = `const STATIC_CHECKBOX_DATA = ${JSON.stringify(initialData, null, 2)};
    
    // Full data ladataan dynaamisesti hakua varten
    let FULL_CHECKBOX_DATA = null;
    
    // Lataa full data (KAIKKI ammatit myös 1-2 henkilön)
    async function loadFullData() {
        if (FULL_CHECKBOX_DATA) return FULL_CHECKBOX_DATA;
        
        try {
            const response = await fetch('./checkbox-data-full.json');
            FULL_CHECKBOX_DATA = await response.json();
            console.log('✅ Full data ladattu:', FULL_CHECKBOX_DATA.profileCount, 'profiilia, KAIKKI ammatit');
            return FULL_CHECKBOX_DATA;
        } catch (error) {
            console.error('❌ Virhe ladattaessa full dataa:', error);
            return STATIC_CHECKBOX_DATA; // Fallback initial dataan
        }
    }`;
    
    // Korvaa data osio
    const newHtml = htmlContent.substring(0, dataStart) + htmlTemplate + htmlContent.substring(dataEnd);
    fs.writeFileSync(htmlPath, newHtml, 'utf8');
    
    console.log('✅ HTML päivitetty chunked-versiolla!');
    console.log('📊 Initial data (top 50) upotettu, full data ladataan dynaamisesti');
    
} catch (error) {
    console.error('❌ Virhe:', error.message);
    process.exit(1);
}
