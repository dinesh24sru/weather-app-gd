
import express from 'express';
import { WeatherService } from '../../services/weatherService';
import { GetWeatherDTO } from '../../presentation/dto/getWeather.dto';
import { Coordinates } from '../../domain/coordinates';
import logger from '../../core/logger';

const router = express.Router();
const svc = new WeatherService();

router.get('/weather', async (req, res, next) => {
  try {
    const dto = GetWeatherDTO.parse(req.query);
    const coords = Coordinates.create(dto.lat, dto.lon);
    const result = await svc.getForecast(coords);
    if (!result.ok) return res.status(result.error instanceof Error && (result.error as any).status ? (result.error as any).status : 502).json({ error: result.error?.message });
    res.json(result.value);
  } catch (err) {
    logger.error({ err }, 'controller error');
    next(err);
  }
});

export default router;
