import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

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
    return response.status(401).json({
      error: 'JWT token is missing.'
    });
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
    return response.status(401).json({
      error: 'Invalid JWT token'
    })
  }
}

export default EnsureAuthentication;