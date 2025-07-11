import { NextRequest, NextResponse } from 'next/server'
import { saveApplicationToFirestore } from '@/lib/firestore-data'

// Uuden työhakemuksen vastaanotto - SUOSTUMUSPERUSTEINEN
export async function POST(request: NextRequest) {
  try {
    // Tarkista origin
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://yoro.fi',
      'https://www.yoro.fi',
      'https://hakemukset.yoro.fi',
      'http://localhost:3000'
    ]
    
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Virheellinen lähde' }, { status: 403 })
    }

    const applicationData = await request.json()
    
    // Validoi pakolliset kentät (samoja kuin 30000 olemassa olevassa profiilissa)
    const requiredFields = [
      'email', 'name', 'phone', 'location', 
      'skills', 'experience', 'education', 'motivation',
      'dataProcessingConsent', 'profileVisibilityConsent'
    ]
    
    const missingFields = requiredFields.filter(field => !applicationData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        error: `Puuttuvat kentät: ${missingFields.join(', ')}`
      }, { status: 400 })
    }

    // Tarkista GDPR-suostumukset
    if (!applicationData.dataProcessingConsent) {
      return NextResponse.json({
        error: 'Tietojen käsittely vaatii suostumuksen'
      }, { status: 400 })
    }

    if (!applicationData.profileVisibilityConsent) {
      return NextResponse.json({
        error: 'Profiilin näkyvyys työnantajille vaatii suostumuksen'
      }, { status: 400 })
    }

    // Tallenna KAIKKI tiedot Firestoreen (ei anonymisointia)
    const profileData = {
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: 'active',
      profileType: 'new_application',
      isVisible: applicationData.profileVisibilityConsent,
      canBeContacted: applicationData.dataProcessingConsent,
      lastUpdated: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    const savedProfile = await saveApplicationToFirestore(profileData)
    
    return NextResponse.json({
      success: true,
      message: 'Profiili luotu onnistuneesti',
      profileId: savedProfile.id,
      message_fi: 'Profiilisi on nyt näkyvissä työnantajille. Voit muokata sitä kirjautumalla sisään.',
      loginUrl: 'https://yoro.fi/login',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Profile creation error:', error)
    return NextResponse.json({ 
      error: 'Profiilin luomisessa tapahtui virhe' 
    }, { status: 500 })
  }
}

// Käytä ChatGPT 3.5 Turboa anonymisointiin (sama menetelmä kuin aiemmassa integraatiossa)
async function processApplicationWithAI(applicationData: any) {
  const prompt = `
Anonymisoi tämä työhakemus GDPR-säädösten mukaisesti. 
Poista tai muuta kaikki henkilökohtaiset tunnisteet mutta säilytä ammattitaidot ja kokemus.

Alkuperäinen hakemus:
${JSON.stringify(applicationData, null, 2)}

Ohjeita:
1. Poista/muuta nimi, osoite, puhelinnumero, sähköposti
2. Muuta tarkka sijaintitietoja yleisemmiksi (esim. "Uusimaa" eikä "Espoo, Kivenlahti")
3. Poista yritysnimet mutta säilytä toimialat
4. Säilytä taidot, kokemusvuodet ja koulutustaso
5. Poista mahdolliset tunnistettavat projektit
6. Luo uusi anonymous ID

Palauta JSON-muodossa anonymisoitu hakemus:
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Olet GDPR-asiantuntija joka anonymisoi työhakemuksia. Säilytä ammattitaidot mutta poista tunnisteet."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.1, // Matala lämpötila = johdonmukaisempi anonymisointi
    max_tokens: 1500
  })

  const aiResponse = response.choices[0]?.message?.content
  
  if (!aiResponse) {
    throw new Error('AI-anonymisointi epäonnistui')
  }

  try {
    // Parseaa AI:n vastaus
    const anonymizedData = JSON.parse(aiResponse)
    
    // Lisää metadata
    return {
      ...anonymizedData,
      processedAt: new Date().toISOString(),
      aiProcessed: true,
      originalHash: generateHash(JSON.stringify(applicationData)), // Tunniste ilman tietoja
      status: 'active'
    }
  } catch (parseError) {
    console.error('AI response parsing error:', parseError)
    throw new Error('AI-anonymisointi tuotti virheellisen datan')
  }
}

// Tallenna uusi hakemus chunkeihin
async function saveNewApplication(application: any) {
  const { saveNewProfile } = await import('@/lib/data-chunking')
  
  // Käytä samaa chunkkaus-systeemiä
  const applicationWithId = {
    ...application,
    id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'application',
    createdAt: new Date().toISOString(),
    source: 'web_form'
  }
  
  // Tallenna chunkki-systeemiin
  await saveNewProfile(applicationWithId)
  
  return applicationWithId
}

// Luo hash tunnistamista varten ilman arkaluontoisia tietoja
function generateHash(data: string): string {
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16)
}
