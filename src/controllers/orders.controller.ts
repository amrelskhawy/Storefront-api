import { OrderProduct } from './../types/orders.type';
import { Request, Response, NextFunction } from 'express'; // Calculating
import OrderModel from '../models/order.model';
import { Order } from '../types/orders.type';

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

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {user_id, status} = req.body
        const order = await orderModel.create( {user_id, status});
        if (order) {
            res.json({
                status: 'Created Order Successfully',
                data: { ...order },
            });
        } else {
            res.status(404).json({
                status: 'Failed',
                message: 'Faild to create Order ',
            });
        }
    } catch (error) {
        next(error)
    }
};

export const addProduct = async (
    req: Request,
    res: Response
  )=> {
    try {
      const order_ID: number = parseInt(req.params.id);
      const { product_ID, quantity } = req.body;
      const result = await orderModel.addProduct(order_ID, product_ID, quantity);

      if (result) {
        res.json({
            status: 'Created Order Successfully',
            data: { ...result },
        });
    } else {
        res.status(404).json({
            status: 'Failed',
            message: 'Faild to create Order ',
        });
    }

      return result.rows[0];
    } catch (err) {
        // throw new Error('Error Creating Order a Product')
    }
  };