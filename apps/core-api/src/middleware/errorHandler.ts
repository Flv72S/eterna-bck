import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Errore:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Dati non validi',
      details: err.errors
    });
  }

  return res.status(500).json({
    error: 'Errore interno del server'
  });
}; 