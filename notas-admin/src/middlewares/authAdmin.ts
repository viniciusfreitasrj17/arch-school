import { Response, Request, NextFunction } from 'express';
import { authAdminConfig } from '../config';
import { authLogger } from '../config/logger';

type TReq = {
  userId: Request<[string], unknown, number, unknown> | unknown | string;
  headers: {
    authorization: string;
  };
};

export default function (
  req: Request | TReq | any,
  res: Response | void | any,
  next: NextFunction
): Promise<Response> | string | unknown {
  const key = req.headers['x-api-key'];

  if (!key) {
    authLogger.error('No key provided')
    return res.status(401).json({ Error: 'No key provided' });
  }

  if (key != authAdminConfig) {
    return res.status(401).json({ Error: 'Key invalid' });
  }

  return next();
}
