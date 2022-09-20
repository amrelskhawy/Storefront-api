import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/users.controller';


const routes = Router();


routes
  .route('/')
  .get(controllers.index)
  .post(controllers.create);


export default routes;
