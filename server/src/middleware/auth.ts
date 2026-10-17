import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-key';

interface JwtPayload {
  _id: string;
}

export const auth = (req: Request, _res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(Object.assign(new Error('No autorizado'), { statusCode: 401 }));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    next(Object.assign(new Error('No autorizado'), { statusCode: 401 }));
    return;
  }

  req.user = { _id: payload._id };
  next();
};