import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Yoro.fi autentikaatio middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ESTÄ SUORA PÄÄSY DATAKANSIOON - TÄRKEINTÄ!
  if (pathname.startsWith('/data/')) {
    return NextResponse.json(
      { error: 'Pääsy estetty' },
      { status: 403 }
    )
  }

  // Suojaa API-reitit ja data-haut
  if (pathname.startsWith('/api/')) {
    
    // Tarkista autentikaatio-tokeni
    const authToken = request.headers.get('authorization') || 
                     request.cookies.get('yoro-auth')?.value

    if (!authToken) {
      return NextResponse.json(
        { error: 'Kirjautuminen vaaditaan' },
        { status: 401 }
      )
    }

    // TODO: Validoi token yoro.fi:n kanssa
    // const isValid = await validateYoroToken(authToken)
    // if (!isValid) {
    //   return NextResponse.json(
    //     { error: 'Virheellinen autentikaatio' },
    //     { status: 403 }
    //   )
    // }
  }

  // Rate limiting - estä massiivinen hakeminen
  const ip = request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  
  // Hylkää epäilyttävät User-Agentit (bokit, scrapperit)
  const suspiciousAgents = [
    'python-requests', 'curl', 'wget', 'scrapy', 'beautifulsoup', 'bot', 'spider'
  ]
  
  if (suspiciousAgents.some(agent => 
    userAgent.toLowerCase().includes(agent.toLowerCase())
  )) {
    return NextResponse.json(
      { error: 'Käyttö estetty' },
      { status: 403 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/data/:path*'  // Estä kaikki /data/* pyynnöt
  ]
}
