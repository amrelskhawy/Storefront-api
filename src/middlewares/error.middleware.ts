import { Request, Response, NextFunction } from 'express';
import { Errorr } from '../interfaces/error.interface';
export const errorMiddleWare = (
  error: Errorr,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong !! please call the system admin';
  res.status(status).json({
    status,
    message,
  });
};
