import { Request, Response } from 'express';
import { RefreshDataType } from '../common/types/refresh';
import { generateRefreshToken, generateTokenJWT } from '../helpers/Authentication';
import UserService from '../services/UserService';

const jwtSecret: string = process.env.JWT_SECRET as string;

class AuthController {
  createToken(req: Request, res: Response) {
    try {
      const refreshId = req.body.userId + jwtSecret;
      const { refreshToken, refreshKey } = generateRefreshToken(refreshId) as RefreshDataType;
      req.body.refreshKey = refreshKey;
      const accessToken = generateTokenJWT(req.body, jwtSecret, '180m'); // 3 Jam

      const expCookie = new Date(Date.now() + 60 * 60 * 1000 * 24); // 24 Jam
      res.cookie('refresh-token', refreshToken, {
        expires: expCookie,
        httpOnly: true,
        sameSite: 'strict'
      });

      UserService.edit(req.body.userId, { lastLogin: new Date(Date.now()) });

      const responseStatus = res.locals.isRefreshToken ? 401 : 201;
      const responseMessage = res.locals.isRefreshToken ? 'refresh-token' : 'Logged';
      return res.status(responseStatus).json({
        success: true,
        message: responseMessage,
        data: {
          accessToken,
          user: {
            userId: req.body.userId,
            email: req.body.email
          }
        }
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: 'Failed create token'
      });
    }
  }
}

export default new AuthController();
