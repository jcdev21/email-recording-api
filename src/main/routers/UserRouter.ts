import { Application } from 'express';
import CommonRoutes from '../common/CommonRoutes';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import JwtMiddleware from '../middlewares/JwtMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

export class UserRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'UserRouter');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .route(`/users`)
      .all(JwtMiddleware.validJwtNeeded, AuthMiddleware.verifyRefreshTokenAndCreateToken)
      .get(UserController.getAll)
      .post(UserController.createUser);

    this.app.param('userId', UserMiddleware.extractUserId);
    this.app.route(`/users/:userId`).get(UserController.getById);

    return this.app;
  }
}
