import config from '../config';
import { Request, Response, NextFunction } from 'express'; // Calculating
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

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
    next(error);
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
      data: { ...user },
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
      ...user,
    });
  } catch (error) {
    next(error);
  }
};


// export const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.Authentication(email, password);
//     const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
//     if (!user) {
//       return res.status(401).json({
//         status: 'erorr',
//         message: 'the username and password do not match please try again',
//       });
//     } else {
//       return res.status(200).json({
//         status: 'success',
//         message: 'User Authenticated Successfully',
//         data: { ...user, token },
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// "email": "0542GEMY@hotmail.com",
// "user_name": "modo1545",
// "first_name": "Mohamed",
// "last_name": "Gamal",
// "password": "702648415****"
