import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

import '@shared/infrastructure/typeorm';
import '@shared/container';

import routes from '@shared/infrastructure/http/routes';
import AppError from '@shared/errors/AppError';

interface ValidationError {
  [key: string]: string;
}

export const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (errors: Error, request: Request, response: Response, _: NextFunction) => {
    // se for um erro do client;
    if (errors instanceof AppError) {
      /**
       * Estou verificando se o error retorna true. 
       * E estou verificando se o "error" herda o prototipo do "AppError".
       */
      return response.status(errors.statusCode).json({
        status: 'error',
        message: errors.message
      });
    }

    // Se for um erro de Validação;
    if (isCelebrateError(errors)) {
      let validateErrors: ValidationError = {};
      
      errors.details.forEach(error => {
        error.details.map(validateError => {
          validateErrors[validateError.path[0]] = validateError.message;
        })
      })

      return response.status(400).json({
        status: 'Validate Fails',
        errors: validateErrors
      });
    }
    // Caso seja um erro do servidor;

    // para o desenvolvedor;
    console.log(errors);

    // para o client;
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
)