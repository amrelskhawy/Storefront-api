import { NextFunction } from "express";
import { Errorr } from "../interfaces/error.interface";

export const handleAuthenticationErrors = (next: NextFunction) => {
    const error: Errorr = new Error('Login Error: Please try again');
    error.status = 401;
    next(error);
  };