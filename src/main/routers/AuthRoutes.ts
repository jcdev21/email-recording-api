import { Application } from 'express';
import { body } from 'express-validator';
import CommonRoutes from '../common/CommonRoutes';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import BodyValidationMiddleware from '../middlewares/BodyValidationMiddleware';

export class AuthRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'AuthRouter');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      AuthMiddleware.verifyUserPassword,
      AuthController.createToken
    ]);

    return this.app;
  }
}
