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
        res.status(400)
        res.json({
            status: 'Failed',
            message: 'Unable To Create a Product',
        })
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
        res.status(404).json({
            status: 'Failed',
            message: 'There is no Product with this ID',
        })
    }
};
