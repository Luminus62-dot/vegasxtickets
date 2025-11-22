import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/http-error.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message, details: err.details });
  }

  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
};
