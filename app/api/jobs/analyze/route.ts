import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// ChatGPT 3.5 Turbo - työpaikkailmoitusten analysointi (SÄILYTETÄÄN!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Analysoi työpaikkailmoitus ChatGPT:llä
export async function POST(request: NextRequest) {
  try {
    // Autentikaatio (vain kirjautuneet käyttäjät)
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!authToken) {
      return NextResponse.json({ error: 'Kirjautuminen vaaditaan' }, { status: 401 })
    }

    const { jobDescription, analysisType = 'skills' } = await request.json()
    
    if (!jobDescription) {
      return NextResponse.json({ error: 'Työpaikkailmoitus vaaditaan' }, { status: 400 })
    }

    let prompt = ''
    
    // Eri analyysityypit
    switch (analysisType) {
      case 'skills':
        prompt = `
Analysoi tämä työpaikkailmoitus ja poimii siitä vaadittavat taidot:

Työpaikkailmoitus:
${jobDescription}

Palauta JSON-muodossa:
{
  "requiredSkills": ["taito1", "taito2", ...],
  "preferredSkills": ["bonus_taito1", "bonus_taito2", ...],
  "experienceLevel": "junior|mid|senior",
  "jobTitle": "tehtävänimike",
  "location": "sijainti",
  "salary": "palkka jos mainittu",
  "company": "yritys jos mainittu"
}
`
        break
        
      case 'match':
        prompt = `
Analysoi tämä työpaikkailmoitus ja ehdota sopivia kandidaatteja:

Työpaikkailmoitus:
${jobDescription}

Palauta JSON-muodossa:
{
  "keyRequirements": ["vaatimus1", "vaatimus2", ...],
  "searchTerms": ["hakusana1", "hakusana2", ...],
  "jobLevel": "junior|mid|senior",
  "industryTags": ["toimiala1", "toimiala2", ...]
}
`
        break
        
      default:
        prompt = `Analysoi tämä työpaikkailmoitus: ${jobDescription}`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Olet HR-asiantuntija joka analysoi työpaikkailmoituksia. Vastaa aina JSON-muodossa."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    const aiResponse = completion.choices[0]?.message?.content
    
    if (!aiResponse) {
      throw new Error('ChatGPT ei palauttanut vastausta')
    }

    // Parseaa JSON-vastaus
    try {
      const analysisResult = JSON.parse(aiResponse)
      
      return NextResponse.json({
        success: true,
        analysis: analysisResult,
        originalText: jobDescription,
        analysisType,
        timestamp: new Date().toISOString()
      })
    } catch (parseError) {
      // Jos JSON-parsinta epäonnistuu, palauta raw-teksti
      return NextResponse.json({
        success: true,
        analysis: { rawResponse: aiResponse },
        originalText: jobDescription,
        analysisType,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('ChatGPT job analysis error:', error)
    return NextResponse.json({ 
      error: 'Työpaikkailmoituksen analysoinnissa tapahtui virhe' 
    }, { status: 500 })
  }
}
