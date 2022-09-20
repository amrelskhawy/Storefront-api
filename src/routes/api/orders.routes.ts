import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/orders.controller';


const routes = Router();


routes
  .route('/')
  .get(controllers.index)


export default routes;
