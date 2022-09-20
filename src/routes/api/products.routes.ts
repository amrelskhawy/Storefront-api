import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/products.controller';


const routes = Router();


routes
  .route('/')
  .get(controllers.index)
  .post(controllers.create);


export default routes;
