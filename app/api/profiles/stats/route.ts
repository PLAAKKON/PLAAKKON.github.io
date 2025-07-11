import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// Hae profiilitilastoja ilman koko datan lataamista
export async function GET(request: NextRequest) {
  try {
    const indexPath = join(process.cwd(), 'private/data/chunks/index.json')
    
    if (!require('fs').existsSync(indexPath)) {
      return NextResponse.json({
        error: 'Chunks ei ole luotu. Aja ensin setup-chunks skripti'
      }, { status: 404 })
    }
    
    const index = JSON.parse(readFileSync(indexPath, 'utf8'))
    
    // Hae sample data ensimmäisestä chunkista tilastoja varten
    const firstChunkPath = join(process.cwd(), 'private/data/chunks/profiles_chunk_0.json')
    const sampleData = JSON.parse(readFileSync(firstChunkPath, 'utf8'))
    
    // Analysoi kenttien tyypit
    const fieldTypes: Record<string, string> = {}
    const fieldValues: Record<string, any[]> = {}
    
    if (sampleData.length > 0) {
      const sampleProfile = sampleData[0]
      
      Object.keys(sampleProfile).forEach(field => {
        fieldTypes[field] = typeof sampleProfile[field]
        
        // Kerää uniikkeja arvoja categorisille kentille
        if (typeof sampleProfile[field] === 'string') {
          fieldValues[field] = [...new Set(
            sampleData.slice(0, 100).map((p: any) => p[field]).filter((v: any) => v)
          )].slice(0, 20) // Maksimi 20 esimerkkiä
        }
      })
    }
    
    const stats = {
      totalProfiles: index.totalProfiles,
      totalChunks: index.chunks.length,
      chunkSize: index.chunkSize,
      createdAt: index.createdAt,
      fieldTypes,
      fieldValues,
      memoryUsage: {
        totalDataSize: '~75MB',
        chunkSize: `~${Math.round(75 / index.chunks.length)}MB per chunk`,
        recommendation: 'Käytä filttereitä tehokkaaseen hakuun'
      }
    }
    
    return NextResponse.json(stats)
    
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({ error: 'Tilastojen haku epäonnistui' }, { status: 500 })
  }
}
