
import { z } from 'zod';
export const GetWeatherDTO = z.object({
  lat: z.preprocess((v)=>Number(v), z.number().min(-90).max(90)),
  lon: z.preprocess((v)=>Number(v), z.number().min(-180).max(180))
});
export type GetWeatherDTO = z.infer<typeof GetWeatherDTO>;
