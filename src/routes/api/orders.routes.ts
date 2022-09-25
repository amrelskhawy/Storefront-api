
import { Router } from 'express';
import * as controllers from '../../controllers/orders.controller';
import validateTokenMiddleware from '../../middlewares/authenticate.middleware';


const routes = Router();


routes
  .route('/:id')
  .get(validateTokenMiddleware , controllers.show)
  .post(validateTokenMiddleware ,controllers.addProduct)
  
routes
  .route('/')
  .post(controllers.create)


export default routes;
