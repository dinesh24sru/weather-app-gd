
import pino from 'pino';
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { service: 'weather-api' },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ['req.headers.authorization']
});
export default logger;
