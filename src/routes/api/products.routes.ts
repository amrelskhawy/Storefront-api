import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/products.controller';

import validateTokenMiddleware from '../../middlewares/authenticate.middleware';


const routes = Router();


routes
  .route('/')
  .get(controllers.index)
  .post(validateTokenMiddleware, controllers.create);
routes
  .route('/:id')
  .get(controllers.show)


export default routes;
