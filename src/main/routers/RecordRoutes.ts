import { Application } from 'express';
import CommonRoutes from '../common/CommonRoutes';
import JwtMiddleware from '../middlewares/JwtMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import RecordController from '../controllers/RecordController';
import BodyValidationMiddleware from '../middlewares/BodyValidationMiddleware';
import { body } from 'express-validator';

export class RecordRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'RecordRouter');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .route('/records')
      .all(JwtMiddleware.validJwtNeeded, AuthMiddleware.verifyRefreshTokenAndCreateToken)
      .post([
        body('email').isEmail(),
        body('date').isDate({ format: 'YYYY-MM-DD' }).toDate(),
        body('description').isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        RecordController.createRecord
      ]);

    return this.app;
  }
}
