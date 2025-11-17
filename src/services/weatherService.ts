import { Coordinates } from '../domain/coordinates';
import { Result } from '../core/result';
import * as nws from '../infra/nwsClient';
import { getCached, setCached } from '../infra/cache';
import { ExternalServiceError } from '../errors/errors';

export class WeatherService {
  /**
   * Get today's weather forecast for the given coordinates
   * Returns:
   *  - summary: short forecast text
   *  - temperature: current or forecast temperature
   *  - characterization: 'cold', 'moderate', 'hot'
   */
  async getForecast(coords: Coordinates): Promise<Result<any>> {
    const key = `forecast:${coords.toKey()}`;
    const cached = await getCached<any>(key);
    if (cached) return Result.success(cached);

    try {
      // Fetch point info from NWS API
      const p = await nws.getPoint(coords.lat, coords.lon);
      const forecastUrl = p.properties?.forecast;
      if (!forecastUrl) return Result.failure(new ExternalServiceError('No forecast URL found'));

      // Fetch forecast data
      const f = await nws.getForecast(forecastUrl);
      const periods = f.properties?.periods ?? [];

      if (!periods.length) return Result.failure(new ExternalServiceError('No forecast periods returned'));

      // Take the first period (today)
      const today = periods[0];

      // Extract temperature
      const temperature = today.temperature;
      const summary = today.shortForecast;

      // Mapping temperature to characterization
      const characterization = this.mapTemperature(temperature);

      const out = {
        summary,
        temperature,
        characterization,
      };

      // Cache result for 5 minutes
      await setCached(key, out, 300);

      return Result.success(out);
    } catch (err: any) {
      return Result.failure(new ExternalServiceError('NWS API error', err));
    }
  }

  /**
   * Map numeric temperature to 'cold', 'moderate', or 'hot'
   * You can adjust ranges as needed
   */
  private mapTemperature(temp: number): 'cold' | 'moderate' | 'hot' {
    if (temp <= 50) return 'cold';
    if (temp <= 75) return 'moderate';
    return 'hot';
  }
}
