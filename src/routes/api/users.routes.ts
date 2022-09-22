import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/users.controller';
import validateTokenMiddleware from '../../middlewares/authenticate.middleware';


const routes = Router();


routes
  .route('/')
  .get(validateTokenMiddleware, controllers.index)
  .post(controllers.create);

routes
.route('/:id')
.get(validateTokenMiddleware,controllers.show)


routes
  .route('/auth')
  .get(controllers.auth)


export default routes;
