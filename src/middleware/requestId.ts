
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
export default function requestId(req: Request, _res: Response, next: NextFunction) {
  (req.headers as any)['x-request-id'] = (req.headers['x-request-id'] as string) || uuidv4();
  next();
}
