import config from '../config';
import { Request, Response, NextFunction } from 'express'; // Calculating
import jwt from 'jsonwebtoken';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.index();
        res.json({
            status: 'Success',
            data: { ...product },
            message: 'All Products Are here',
        });
    } catch (error) {
        next(error);
    }
};


export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            status: 'Success',
            data: { ...product },
            message: 'Product Created Successfully',
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
        const product = await productModel.show(req.params.id);
        res.json({
            ...product,
        });
    } catch (error) {
        next(error);
    }
};
