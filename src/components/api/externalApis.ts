import axios from 'axios';

// Types for our dataset responses
interface NasaDataset {
  title: string;
  description: string;
  keywords: string[];
  dateCreated: string;
  creator: string;
  downloadUrl: string;
}

interface SimbadDataset {
  id: string;
  name: string;
  description: string;
  ra: string;
  dec: string;
}

interface VizieRDataset {
  id: string;
  name: string;
  description: string;
  downloadUrl: string;
}

export interface UnifiedDataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  date: string;
  contributor: string;
  downloadUrl: string;
  fileSize?: number;
  source: 'nasa' | 'simbad' | 'vizier' | 'others';
  originalUrl: string;
}

export class ExternalDatasetService {
  // Correctly assign API keys
  private static NASA_API_KEY = process.env.NASA_API_KEY || 'ZRzN57GbPQHhWLcTiID5dWZ5Ew4BGcApfv0ZhQdF';

  static async searchNASA(query: string): Promise<UnifiedDataset[]> {
    try {
        const response = await axios.get('GET https://api.nasa.gov/planetary/apod', {
        params: {
          q: query,
          api_key: this.NASA_API_KEY,
          media_type: 'data',
        },
        headers: {
          'Authorization': `Bearer ${this.NASA_API_KEY}`,
        }
      });

      return response.data.collection.items.map((item: any) => ({
        id: `nasa-${item.data[0].nasa_id}`,
        name: item.data[0].title,
        description: item.data[0].description,
        tags: item.data[0].keywords || [],
        date: item.data[0].date_created,
        contributor: item.data[0].center || 'NASA',
        downloadUrl: item.href,
        source: 'nasa',
        originalUrl: item.data[0].nasa_id,
      }));
    } catch (error) {
      console.error('NASA API error:', error.response ? error.response.data : error.message);
      return [];
    }
  }

  static async searchSIMBAD(query: string): Promise<UnifiedDataset[]> {
    try {
      const tapQuery = `
        SELECT 
          basic.OID as id,
          basic.MAIN_ID as name,
          ident.id as other_names,
          basic.RA as ra,
          basic.DEC as dec
        FROM basic 
        LEFT JOIN ident ON basic.OID = ident.oidref
        WHERE basic.MAIN_ID LIKE '%${query}%'
        LIMIT 10
      `;

      const response = await axios.post('http://simbad.u-strasbg.fr/simbad/sim-tap/sync', {
        query: tapQuery,
        format: 'json',
      });

      return response.data.data.map((item: any) => ({
        id: `simbad-${item.id}`,
        name: item.name,
        description: `RA: ${item.ra}, DEC: ${item.dec}`,
        tags: ['star', 'celestial object'],
        date: new Date().toISOString(),
        contributor: 'SIMBAD Astronomical Database',
        downloadUrl: `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`,
        source: 'simbad',
        originalUrl: `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`,
      }));
    } catch (error) {
      console.error('SIMBAD API error:', error.response ? error.response.data : error.message);
      return [];
    }
  }

  static async searchVizieR(query: string): Promise<UnifiedDataset[]> {
    try {
      const response = await axios.get('https://vizier.u-strasbg.fr/viz-bin/VizieR', {
        params: {
          VizieRQuery: `SELECT TOP 10 * FROM catalog WHERE MAIN_ID LIKE '%${query}%'`,
        },
      });

      return response.data.data.map((item: any) => ({
        id: `vizier-${item.id}`,
        name: item.name,
        description: item.description,
        tags: ['astronomy', 'star', 'galaxy', 'catalog'],
        date: new Date().toISOString(),
        contributor: 'VizieR Catalog Service',
        downloadUrl: item.downloadUrl,
        source: 'vizier',
        originalUrl: item.originalUrl,
      }));
    } catch (error) {
      console.error('VizieR API error:', error.response ? error.response.data : error.message);
      return [];
    }
  }

  static async searchAll(query: string): Promise<UnifiedDataset[]> {
    try {
      const [nasaResults, simbadResults, vizierResults] = await Promise.all([
        this.searchNASA(query),
        this.searchSIMBAD(query),
        this.searchVizieR(query),
      ]);

      // Combine and sort results by date
      return [...nasaResults, ...simbadResults, ...vizierResults]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error searching external APIs:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}
