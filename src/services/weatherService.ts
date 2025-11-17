
import { Coordinates } from '../domain/coordinates';
import { Result } from '../core/result';
import * as nws from '../infra/nwsClient';
import { getCached, setCached } from '../infra/cache';
import { ExternalServiceError } from '../errors/errors';

export class WeatherService {
  async getForecast(coords: Coordinates) : Promise<Result<any>> {
    const key = `forecast:${coords.toKey()}`;
    const cached = await getCached<any>(key);
    if (cached) return Result.success(cached);

    try {
      const p = await nws.getPoint(coords.lat, coords.lon);
      const forecastUrl = p.properties?.forecast;
      if (!forecastUrl) return Result.failure(new ExternalServiceError('no forecast url'));
      const f = await nws.getForecast(forecastUrl);
      const out = { summary: f.properties?.periods?.slice(0,3) ?? [] };
      await setCached(key, out, 300);
      return Result.success(out);
    } catch (err:any) {
      return Result.failure(new ExternalServiceError('NWS error', err));
    }
  }
}
