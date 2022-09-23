import { Request, Response, NextFunction } from 'express'; // Calculating
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';

const newUser = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await newUser.create(req.body);
    res.json({
      status: 'Success',
      data: { ...user },
      message: 'User Created Successfully',
    });
  } catch (error) {
    res.status(400).json({
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
    const users = await newUser.index();
    res.json({
      status: 'Success',
      data: { ...users},
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
    const user = await newUser.show(req.params.id);
    res.json({...user});
  } catch (error) {
    next(error);
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {first_name , password} = req.body
    const user = await newUser.Authentication(first_name, password);
    const token = jwt.sign({user}, config.tokenSecret as unknown as string)
    if ( !user ) {
      return res.status(401).json({
        status: 'erorr',
        message: 'the username and password do not match please try again',
      })
    }
    return res.json({
      status: 'success',
      data: {...user , token},
      message: 'User Authenticated Successfully',
    }) 
    
  } catch (error) {
    return next(error)
  }
}
