import { Request, Response, NextFunction } from 'express'; // Calculating
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const show = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await orderModel.show(req.params.id);
        if (order) {
            res.json({
                status: 'Success',
                data: { ...order },
                message: 'Order with id: ' + req.params.id + ' Already here',
            });
        } else {
            res.status(404).json({
                status: 'Failed',
                message: 'Order with id: ' + req.params.id + ' Not in Our Database!!',
            });
        }
    } catch (error) {
        next(error)
    }
};
