import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';

import '@shared/infrastructure/typeorm';
import '@shared/container';

import routes from '@shared/infrastructure/http/routes';
import AppError from '@shared/errors/AppError';

export const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    // se for um erro do client, vai cair nesse if.
    if (error instanceof AppError) {
      /**
       * Estou verificando se o error retorna true. 
       * E estou verificando se o "error" herda o prototipo do "AppError".
       */
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }
    // caso seja um erro do servidor, vai rodar esse codigo.

    // para o desenvolvedor;
    console.log(error);

    // para o client;
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
)