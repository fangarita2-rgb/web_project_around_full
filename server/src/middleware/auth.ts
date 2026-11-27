import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    payload = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret-key') as JwtPayload;
  } catch {
    next(Object.assign(new Error('No autorizado'), { statusCode: 401 }));
    return;
  }
  req.user = payload;
  next();
};