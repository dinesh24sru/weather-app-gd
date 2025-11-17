
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import logger from './core/logger';
import requestId from './middleware/requestId';
import prometheusRouter from './presentation/metrics';
import weatherRouter from './presentation/routes/weather';
import errorHandler from './middleware/errorHandler';
import { setupSwagger } from './core/swagger';


const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(cors({ origin: true })); // tighten in prod
app.use(express.json({ limit: '10kb' }));
app.use(compression());
app.use(requestId);
app.use(pinoHttp({ logger }));

app.use('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/metrics', prometheusRouter);

app.use('/v1/api', rateLimit({ windowMs: 60*1000, max: 100 }));
app.use('/v1/api', weatherRouter);

setupSwagger(app);


app.use(errorHandler);

export default app;
