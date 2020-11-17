import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function EnsureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [_, token] = authHeader.split(' ');

  try {

    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch(err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export default EnsureAuthentication;