import { Request, Response } from 'express';
import { RefreshDataType } from '../common/types/refresh';
import { generateRefreshToken, generateTokenJWT } from '../helpers/Authentication';

const jwtSecret: string = process.env.JWT_SECRET as string;

class AuthController {
  createToken(req: Request, res: Response) {
    try {
      const refreshId = req.body.userId + jwtSecret;
      const { refreshToken, refreshKey } = generateRefreshToken(refreshId) as RefreshDataType;
      req.body.refreshKey = refreshKey;
      const accessToken = generateTokenJWT(req.body, jwtSecret, '1m');

      const expCookie = new Date(Date.now() + 60 * 60 * 1000); // 1 Jam
      res.cookie('refresh-token', refreshToken, {
        expires: expCookie,
        httpOnly: true,
        sameSite: 'strict'
      });

      const responseStatus = res.locals.isRefreshToken ? 401 : 201;
      const responseMessage = res.locals.isRefreshToken ? 'refresh-token' : 'Logged';
      return res.status(responseStatus).json({
        success: true,
        message: responseMessage,
        data: {
          accessToken
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed create token'
      });
    }
  }
}

export default new AuthController();
