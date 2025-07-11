import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Profile {
  id: string;
  työtoiveet?: string[];
  valitut_ammatit?: string[];
  valitut_osaamiset?: string[];
  työnhakualue?: string[];
  esittely?: string;
  työkokemus?: string;
  koulutus?: string;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Lue data-tiedosto
    const dataPath = join(process.cwd(), 'public', 'data', 'profiilit.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    const allProfiles: Profile[] = JSON.parse(fileContent);

    // Suodata profiilit hakusanan mukaan
    let filteredProfiles = allProfiles;
    
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredProfiles = allProfiles.filter(profile => {
        const searchableText = [
          ...(profile.työtoiveet || []),
          ...(profile.valitut_ammatit || []),
          ...(profile.valitut_osaamiset || []),
          ...(profile.työnhakualue || []),
          profile.esittely || '',
          profile.työkokemus || '',
          profile.koulutus || ''
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchTerm);
      });
    }

    // Sivutus
    const paginatedProfiles = filteredProfiles.slice(offset, offset + limit);

    return NextResponse.json({
      profiles: paginatedProfiles,
      total: filteredProfiles.length,
      offset,
      limit,
      hasMore: offset + limit < filteredProfiles.length
    });

  } catch (error) {
    console.error('Error loading profiles:', error);
    return NextResponse.json(
      { error: 'Virhe ladattaessa profiileja' },
      { status: 500 }
    );
  }
}
