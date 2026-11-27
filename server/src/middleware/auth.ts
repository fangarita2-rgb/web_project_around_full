import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

<<<<<<< HEAD
=======
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-key';

>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
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
<<<<<<< HEAD
    payload = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret-key') as JwtPayload;
=======
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
  } catch {
    next(Object.assign(new Error('No autorizado'), { statusCode: 401 }));
    return;
  }

  req.user = { _id: payload._id };
  next();
};