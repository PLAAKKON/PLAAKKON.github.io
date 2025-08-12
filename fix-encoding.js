const fs = require('fs');
const path = require('path');

console.log('🔧 Korjataan koodausongelmat HTML:ssä...');

try {
    // Lue oikea data
    const correctDataPath = path.join(__dirname, 'checkbox-data-html-compact.json');
    const correctData = JSON.parse(fs.readFileSync(correctDataPath, 'utf8'));
    console.log('✅ Oikea data luettu:', correctData.profileCount, 'profiilia');
    
    // Lue nykyinen HTML
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    console.log('✅ HTML luettu, koko:', htmlContent.length, 'merkkiä');
    
    // Etsi STATIC_CHECKBOX_DATA alkukohta
    const dataStartPattern = 'const STATIC_CHECKBOX_DATA = {';
    const dataStartIndex = htmlContent.indexOf(dataStartPattern);
    
    if (dataStartIndex === -1) {
        throw new Error('STATIC_CHECKBOX_DATA ei löytynyt HTML:stä');
    }
    
    console.log('🎯 STATIC_CHECKBOX_DATA löytyi kohdasta:', dataStartIndex);
    
    // Etsi datan loppu (seuraava }; joka on samalla tasolla)
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
                // Etsi seuraava ;
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
    
    console.log('🎯 Datan loppu löytyi kohdasta:', dataEndIndex);
    
    // Muodosta uusi data-osio
    const newDataSection = `const STATIC_CHECKBOX_DATA = ${JSON.stringify(correctData, null, 2)};`;
    
    // Korvaa data HTML:ssä
    const beforeData = htmlContent.substring(0, dataStartIndex);
    const afterData = htmlContent.substring(dataEndIndex);
    
    const newHtmlContent = beforeData + newDataSection + afterData;
    
    // Tallenna korjattu HTML UTF-8 koodauksella
    fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');
    
    console.log('✅ HTML päivitetty onnistuneesti!');
    console.log('📊 Uusi koko:', newHtmlContent.length, 'merkkiä');
    
    // Tarkista että ohjelmistokehittäjä löytyy
    if (newHtmlContent.includes('ohjelmistokehittäjä')) {
        console.log('🎯 TARKISTUS OK: "ohjelmistokehittäjä" löytyy HTML:stä');
    } else {
        console.log('❌ VAROITUS: "ohjelmistokehittäjä" ei löydy HTML:stä');
    }
    
} catch (error) {
    console.error('❌ Virhe:', error.message);
    process.exit(1);
}
