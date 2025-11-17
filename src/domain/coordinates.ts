
import { DomainError } from '../errors/errors';

export class Coordinates {
  private constructor(public readonly lat: number, public readonly lon: number) {}
  static create(lat: number, lon: number) {
    if (Number.isNaN(Number(lat)) || Number.isNaN(Number(lon))) throw new DomainError('lat/lon must be numbers');
    const _lat = Number(lat), _lon = Number(lon);
    if (_lat < -90 || _lat > 90) throw new DomainError('lat out of range');
    if (_lon < -180 || _lon > 180) throw new DomainError('lon out of range');
    return new Coordinates(_lat, _lon);
  }
  toKey() { return `${this.lat}:${this.lon}`; }
}
