// Yoro.fi autentikaatio-utilities
export interface YoroUser {
  id: string
  email: string
  name: string
  role: string
  permissions: string[]
}

export async function validateYoroToken(token: string): Promise<YoroUser | null> {
  try {
    // TODO: Korvaa oikealla Yoro.fi API-kutsulla
    const response = await fetch('https://yoro.fi/api/auth/validate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return null
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Yoro auth validation error:', error)
    return null
  }
}

export async function getYoroLoginUrl(redirectUrl: string): Promise<string> {
  // TODO: Oikea OAuth/SSO URL
  return `https://yoro.fi/login?redirect=${encodeURIComponent(redirectUrl)}`
}

export function hasProfileAccess(user: YoroUser): boolean {
  // Määritä käyttöoikeudet
  const allowedRoles = ['admin', 'consultant', 'analyst']
  return allowedRoles.includes(user.role) || 
         user.permissions.includes('profile-access')
}

// Rate limiting per käyttäjä
const userRequestCounts = new Map<string, { count: number, resetTime: number }>()

export function checkRateLimit(userId: string, maxRequests = 100): boolean {
  const now = Date.now()
  const hourInMs = 60 * 60 * 1000
  
  const userData = userRequestCounts.get(userId)
  
  if (!userData || now > userData.resetTime) {
    userRequestCounts.set(userId, { count: 1, resetTime: now + hourInMs })
    return true
  }
  
  if (userData.count >= maxRequests) {
    return false
  }
  
  userData.count++
  return true
}
