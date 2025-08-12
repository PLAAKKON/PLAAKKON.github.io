const fs = require('fs');
const path = require('path');

console.log('🔧 Luodaan chunked versio jossa KAIKKI ammatit (myös 2 henkilön) mutta järkevästi jaoteltu...');

try {
    // Lue nykyinen täysi data
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Etsi STATIC_CHECKBOX_DATA
    const dataStartPattern = 'const STATIC_CHECKBOX_DATA = {';
    const dataStartIndex = htmlContent.indexOf(dataStartPattern);
    
    if (dataStartIndex === -1) {
        throw new Error('STATIC_CHECKBOX_DATA ei löytynyt');
    }
    
    // Etsi datan loppu
    let braceCount = 0;
    let dataEndIndex = -1;
    let foundFirstBrace = false;
    
    for (let i = dataStartIndex; i < htmlContent.length; i++) {
        const char = htmlContent[i];
        
        if (char === '{') {
            braceCount++;
            foundFirstBrace = true;
        } else if (char === '}') {
            braceCount--;
            
            if (foundFirstBrace && braceCount === 0) {
                let j = i + 1;
                while (j < htmlContent.length && htmlContent[j].match(/\s/)) {
                    j++;
                }
                if (htmlContent[j] === ';') {
                    dataEndIndex = j + 1;
                    break;
                }
            }
        }
    }
    
    if (dataEndIndex === -1) {
        throw new Error('Datan loppu ei löytynyt');
    }
    
    // Pura nykyinen data
    const currentDataStr = htmlContent.substring(dataStartIndex + dataStartPattern.length, dataEndIndex - 1);
    const currentData = JSON.parse(currentDataStr.trim());
    
    console.log('📊 Nykyinen data:');
    Object.keys(currentData.data).forEach(category => {
        console.log(`  ${category}: ${currentData.data[category].length} vaihtoehtoa`);
    });
    
    // Jaa kategoriat osiin - näytä alkuun suosituimmat, mutta pidä KAIKKI haettavissa
    const chunkSize = 200; // Maksimi 200 vaihtoehtoa kerralla näytettävänä
    
    const newData = {
        data: {},
        generated: currentData.generated,
        profileCount: currentData.profileCount,
        version: "CHUNKED_FULL_DATA_7.0"
    };
    
    Object.keys(currentData.data).forEach(category => {
        const items = currentData.data[category];
        
        if (items.length <= chunkSize) {
            // Jos vähän dataa, näytä kaikki
            newData.data[category] = items;
        } else {
            // Jos paljon dataa, näytä ensimmäiset 200 mutta pidä kaikki mukana hakua varten
            const visibleItems = items.slice(0, chunkSize);
            const hiddenItems = items.slice(chunkSize);
            
            // Lisää hidden-merkintä että JavaScript tietää että lisää dataa on saatavilla
            newData.data[category] = visibleItems;
            newData.data[category + '_hidden'] = hiddenItems;
            
            console.log(`📦 ${category}: Näytetään ${visibleItems.length}, piilotettu ${hiddenItems.length} (yhteensä ${items.length})`);
        }
    });
    
    // Korvaa data HTML:ssä
    const newDataSection = `const STATIC_CHECKBOX_DATA = ${JSON.stringify(newData, null, 2)};
    
    // Funktio joka yhdistää näkyvän ja piilotetun datan hakua varten
    function getAllOptionsForCategory(category) {
        const visible = STATIC_CHECKBOX_DATA.data[category] || [];
        const hidden = STATIC_CHECKBOX_DATA.data[category + '_hidden'] || [];
        return [...visible, ...hidden];
    }`;
    
    const beforeData = htmlContent.substring(0, dataStartIndex);
    const afterData = htmlContent.substring(dataEndIndex);
    
    const newHtmlContent = beforeData + newDataSection + afterData;
    
    fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');
    
    const totalVisible = Object.keys(newData.data)
        .filter(key => !key.endsWith('_hidden'))
        .reduce((sum, key) => sum + newData.data[key].length, 0);
    
    const totalHidden = Object.keys(newData.data)
        .filter(key => key.endsWith('_hidden'))
        .reduce((sum, key) => sum + newData.data[key].length, 0);
    
    console.log('✅ Chunked versio luotu!');
    console.log(`📊 Näkyviä vaihtoehtoja: ${totalVisible}`);
    console.log(`📦 Piilotettuja vaihtoehtoja: ${totalHidden}`);
    console.log(`🎯 Yhteensä vaihtoehtoja (mukaan lukien 2 henkilön ammatit): ${totalVisible + totalHidden}`);
    console.log('📱 Sivu latautuu nyt nopeammin mutta KAIKKI data on silti haettavissa!');
    
} catch (error) {
    console.error('❌ Virhe:', error.message);
    process.exit(1);
}
