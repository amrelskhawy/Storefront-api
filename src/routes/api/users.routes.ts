import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/users.controller';
import validateTokenMiddleware from '../../middlewares/authenticate.middleware';

const routes = Router();

routes.route('/:id').delete(controllers.deleteOne).patch(controllers.update);

routes
  .route('/')
  .get(validateTokenMiddleware, controllers.getUsers)
  .post(controllers.create);

// authentication
routes.route('/auth').post(controllers.auth);

export default routes;
