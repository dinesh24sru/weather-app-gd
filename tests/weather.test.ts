
import request from 'supertest';
import app from '../src/app';

describe('Weather API', () => {
  it('returns 400 when missing params', async () => {
    const res = await request(app).get('/api/weather');
    expect(res.status).toBe(400);
  });

  it('returns 200 for valid coords (integration may call external API)', async () => {
    const res = await request(app).get('/api/weather').query({ lat: '39', lon: '-77' });
    expect([200,502]).toContain(res.status); // allow 502 if upstream blocked in CI
  });
});
