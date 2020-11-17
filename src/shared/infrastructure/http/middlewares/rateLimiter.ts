import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/errors/AppError';

import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} from '@shared/utils/environment';

const redisClient = createClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD || undefined
});

/**
 * Quem estiver consumindo minha API tem direto de fazer 4 requests em 1 segundo,
 * se for mais de 4 requets em 1 segundo a API vai bloqueiar.
 */
const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter', // chave unica, que contem essas opções.
  points: 4, // 4 pontos
  duration: 1 // por 1 segundo.
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    // salvando o ip do consumidor da minha API.
    await limiter.consume(request.ip);

    return next();
  } catch(error) {
    throw new AppError('Too many request', 429);
  }
}

export default rateLimiter;
