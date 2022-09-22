import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/users.controller';


const routes = Router();


routes
  .route('/')
  .get(controllers.index)
  .post(controllers.create);

// routes
// .route('/:id')
// .get(controllers.show)


routes
  .route('/auth')
  .get(controllers.auth)


export default routes;
