const fs = require('fs');
const path = require('path');

console.log('🔧 Luodaan FULL-data jossa vain koulutus on yksinkertaistettu...');

try {
    // Lue täysi data (9,673 ammattia + kaikki muu)
    const fullDataPath = path.join(__dirname, 'checkbox-data-complete.json');
    const fullData = JSON.parse(fs.readFileSync(fullDataPath, 'utf8'));
    console.log('✅ Täysi data luettu:', fullData.profileCount, 'profiilia');
    
    // Lue yksinkertaistettu koulutusdata
    const compressedDataPath = path.join(__dirname, 'checkbox-data-compressed.json');
    const compressedData = JSON.parse(fs.readFileSync(compressedDataPath, 'utf8'));
    console.log('✅ Kompressoitu data luettu (koulutus-osio)');
    
    // Muodosta uusi data: kaikki täydeltä datalta PAITSI koulutus kompressoidulta
    const newData = {
        data: {
            ammatti: fullData.data.ammatti,           // KAIKKI 9,673 ammattia
            osaaminen: fullData.data.osaaminen,       // KAIKKI 15,000+ osaamista
            työtoiveet: fullData.data.työtoiveet,     // KAIKKI työtoiveet
            työnhakualue: fullData.data.työnhakualue, // KAIKKI paikkakunnat
            kielitaito: fullData.data.kielitaito,     // KAIKKI kielikombot
            koulutus: compressedData.data.koulutus,   // VAIN tämä yksinkertaistettu ~100
            ajokortit: fullData.data.ajokortit,       // KAIKKI ajokortit
            lupatiedot: fullData.data.lupatiedot      // KAIKKI luvat
        },
        generated: new Date().toISOString(),
        profileCount: fullData.profileCount,
        version: "FULL_DATA_COMPRESSED_EDUCATION_ONLY_5.0"
    };
    
    console.log('📊 Uuden datan tilastot:');
    Object.keys(newData.data).forEach(category => {
        console.log(`  ${category}: ${newData.data[category].length} vaihtoehtoa`);
    });
    
    // Tallenna uusi data
    const outputPath = path.join(__dirname, 'checkbox-data-full-compressed-edu.json');
    fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2), 'utf8');
    
    console.log('✅ Uusi data tallennettu:', outputPath);
    console.log('📊 Kokonaiskoko:', JSON.stringify(newData).length, 'merkkiä');
    
    // Päivitä HTML automaattisesti
    console.log('🔄 Päivitetään HTML...');
    
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Etsi ja korvaa STATIC_CHECKBOX_DATA
    const dataStartPattern = 'const STATIC_CHECKBOX_DATA = {';
    const dataStartIndex = htmlContent.indexOf(dataStartPattern);
    
    if (dataStartIndex === -1) {
        throw new Error('STATIC_CHECKBOX_DATA ei löytynyt HTML:stä');
    }
    
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
    
    // Korvaa data HTML:ssä
    const newDataSection = `const STATIC_CHECKBOX_DATA = ${JSON.stringify(newData, null, 2)};`;
    const beforeData = htmlContent.substring(0, dataStartIndex);
    const afterData = htmlContent.substring(dataEndIndex);
    const newHtmlContent = beforeData + newDataSection + afterData;
    
    fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');
    
    console.log('✅ HTML päivitetty onnistuneesti!');
    console.log('📊 HTML koko:', newHtmlContent.length, 'merkkiä');
    console.log('🎯 Ammatit HTML:ssä:', newData.data.ammatti.length);
    
} catch (error) {
    console.error('❌ Virhe:', error.message);
    process.exit(1);
}
