
import { Request, Response, NextFunction } from 'express';
import logger from '../core/logger';
export default function errorHandler(err:any, _req:Request, res:Response, _next:NextFunction) {
  logger.error({ err }, 'unhandled error');
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message || 'internal server error' });
}
