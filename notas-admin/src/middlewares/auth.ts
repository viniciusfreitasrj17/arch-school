import { Response, Request, NextFunction } from 'express';
import { VerifyErrors, verify } from 'jsonwebtoken';
import { authConfig } from '../config';

type TReq = {
  userId: Request<[string], unknown, number, unknown> | unknown | string;
  headers: {
    authorization: string;
  };
};

type TDecoded = {
  id: string | number | unknown;
};

export default function (
  req: Request | TReq | any,
  res: Response | void | any,
  next: NextFunction
): Promise<Response> | string | unknown {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ Error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ Error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ Error: 'Token malformatted' });
  }

  verify(
    token,
    authConfig,
    (err: VerifyErrors | null, decoded: object | undefined | TDecoded) => {
      if (err) {
        return res.status(401).json({ Error: 'Token invalid' });
      }

      req.userId = (<TDecoded>decoded).id;
      return next();
    }
  );
}
