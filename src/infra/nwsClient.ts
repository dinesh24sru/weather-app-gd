
import client from './httpClient';

export async function getPoint(lat: number, lon: number) {
  const r = await client.get(`https://api.weather.gov/points/${lat},${lon}`);
  return r.data;
}
export async function getForecast(url: string) {
  const r = await client.get(url);
  return r.data;
}
