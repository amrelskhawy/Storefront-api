import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/orders.controller';
import validateTokenMiddleware from '../../middlewares/authenticate.middleware';


const routes = Router();


routes
  .route('/:id')
  .get(validateTokenMiddleware , controllers.index)


export default routes;
