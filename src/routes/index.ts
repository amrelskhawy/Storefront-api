import { Router } from 'express';
import userRoutes from './api/users.routes';
import productsRoutes from './api/products.routes';
import ordersRoutes from './api/orders.routes';
import validateTokenMiddleware from '../middlewares/authenticate.middleware';

const routes = Router();

routes.use('/users',validateTokenMiddleware, userRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/products', productsRoutes);

export default routes;
