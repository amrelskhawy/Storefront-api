import { Request, Response, NextFunction } from 'express'; // Calculating
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await orderModel.index();
        res.json({
            status: 'Success',
            data: { ...order },
            message: 'All orders Are here',
        });
    } catch (error) {
        next(error);
    }
};
