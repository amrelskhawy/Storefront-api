import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { handleAuthenticationErrors } from './handlingAuthErrors.middleware';


const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase(),
            authToken = authHeader.split(' ')[1];
      if (!authToken && bearer !== 'bearer') {
        handleAuthenticationErrors(next);
      } else {
        const decode = jwt.verify(
          authToken, config.tokenSecret as unknown as string
        );
        if (decode) {
          next();
        }
      }
    } else {
      handleAuthenticationErrors(next);
    }
  } catch (error) {
    handleAuthenticationErrors(next);
  }
};

export default validateTokenMiddleware;