import { PFError } from './pf-error.js';
import { CapacityData, CapacityResult } from './types/capacity.js';
import { GymsResponse } from './types/gyms.js';

class PlanetFitness {
  private static makeRequest(url: string, options?: RequestInit) {
    options ??= {};
    options.headers ??= {};
    (options.headers as Record<string, string>)['user-agent'] =
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)';

    return fetch(url, options);
  }

  static async getGyms(zipCode: number) {
    const res = await this.makeRequest(
      'https://www.planetfitness.com/gyms/?q=' +
        zipCode +
        '&_data=routes-join%2Fgyms%2Froute',
      {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.6',
          Referer: 'https://www.planetfitness.com/gyms/',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      }
    );

    if (res.status !== 200) {
      throw new PFError('Bad status code received');
      //   throw new Error(
      //     'Invalid status code ' + res.status + ': ' + (await res.text())
      //   );
    }

    const json: GymsResponse = await res.json();
    if (json.placeName !== String(zipCode) || !Array.isArray(json.clubs)) {
      throw new PFError('Invalid ZIP code');
    }

    return json.clubs;
  }

  static async getCapacity(clubId: string): Promise<CapacityData> {
    const res = await fetch(
      'https://www.planetfitness.com/gyms/pfx/api/clubs/' +
        clubId +
        '/capacity',
      {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.8',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'user-agent':
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)' // IE user agent, Chrome/Firefox UA gets blocked for some reason
        },
        method: 'GET'
      }
    );

    if (!res.ok) {
      throw new Error('Failed to get capacity: ' + res.status);
    }

    const json: CapacityResult = await res.json();

    if (json.errors.length > 0) {
      console.log('PF err:', JSON.stringify(json.errors));
      throw new Error(
        'Planet fitness error(s): ' + json.errors.map(e => e.code).join(',')
      );
    }

    return json.data;
  }
}

export { PlanetFitness };
