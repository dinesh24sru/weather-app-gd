import express, { Request, Response, NextFunction } from 'express';
import { WeatherService } from '../../services/weatherService';
import { GetWeatherDTO } from '../../presentation/dto/getWeather.dto';
import { Coordinates } from '../../domain/coordinates';
import logger from '../../core/logger';

const router = express.Router();
const svc = new WeatherService();

router.get('/weather', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = GetWeatherDTO.safeParse(req.query);

    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: parseResult.error.errors,
      });
    }

    const dto = parseResult.data;

    const coords = Coordinates.create(dto.lat, dto.lon);

    const result = await svc.getForecast(coords);

    if (!result.ok) {
      const statusCode =
        result.error instanceof Error && (result.error as any).status
          ? (result.error as any).status
          : 502;

      return res.status(statusCode).json({
        error: result.error?.message || 'Something went wrong',
      });
    }

    return res.json(result.value);
  } catch (err) {
    logger.error({ err }, 'Unhandled controller error');
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

export default router;
