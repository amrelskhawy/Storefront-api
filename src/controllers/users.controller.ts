import config from '../config';
import { Request, Response, NextFunction } from 'express'; // Calculating
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import User from '../types/user.type';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'Success',
      data: { ...user },
      message: 'User Created Successfully',
    });
  } catch (error) {
    res.json({
      status: 'faild',
      message: 'Unable to create user',
    });
  }
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.index();
    res.json({
      status: 'Success',
      data: { ...user},
      message: 'All Users Are here',
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.show(req.params.id);
    res.json({
      ...user
    });
  } catch (error) {
    next(error);
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {first_name , password} = req.body
    const user = await userModel.Authentication(first_name, password);
    const token = jwt.sign({user}, config.tokenSecret as unknown as string)
    if ( !user ) {
      return res.status(401).json({
        status: 'erorr',
        message: 'the username and password do not match please try again',
      })
    }
    return res.json({
      status: 'success',
      message: 'User Authenticate Successfully',
    }) 
    
  } catch (error) {
    return next(error)
  }

  
}

// "email": "0542GEMY@hotmail.com",
// "user_name": "modo1545",
// "first_name": "Mohamed",
// "last_name": "Gamal",
// "password": "702648415****"
