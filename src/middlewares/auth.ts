import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/token';

export const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken && !bearerToken?.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized',
      });
    }

    const token = bearerToken.split(' ')[1];

    const decoded = verifyToken(token!) as JwtPayload;

    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).send({
        success: false,
        message: 'Forbidden',
      });
    }

    req.user = decoded;

    next();
  };
};
