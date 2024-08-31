import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { verifyPasswordWithBcrypt } from '../helpers/Authentication';
import UserService from '../services/UserService';
import AuthController from '../controllers/AuthController';

const jwtSecret: string = process.env.JWT_SECRET as string;

class AuthMiddleware {
  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.getUserByEmailWithPassword(req.body.email);

    if (user) {
      if (await verifyPasswordWithBcrypt(req.body.password, user.password)) {
        req.body = {
          userId: user.id,
          email: user.email
        };
        return next();
      }
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid email and/or password',
      errors: ['Invalid email and/or password']
    });
  }

  async verifyRefreshTokenAndCreateToken(req: Request, res: Response, next: NextFunction) {
    if (res.locals.isRefreshToken) {
      if ('refresh-token' in req.cookies) {
        try {
          const user = await UserService.getUserByEmailWithPassword(res.locals.jwt.email);
          const salt = crypto.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
          const hash = crypto
            .createHmac('sha512', salt)
            .update(res.locals.jwt.userId + jwtSecret)
            .digest('base64');

          if (hash === req.cookies['refresh-token']) {
            req.body = {
              userId: user?.id,
              email: user?.email
            };

            return AuthController.createToken(req, res);
          } else {
            return res.status(403).json({
              success: false,
              message: 'Invalid refresh token'
            });
          }
        } catch (error) {
          return res.status(403).json({
            success: false,
            message: 'Invalid refresh token'
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: 'Refresh token not exists'
        });
      }
    }

    next();
  }
}

export default new AuthMiddleware();
