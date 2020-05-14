import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import files from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', express.static(files.uploadsFolder));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
app.listen(3333, () => console.log('Server listening 3333'));