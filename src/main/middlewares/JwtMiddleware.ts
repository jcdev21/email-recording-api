import { NextFunction, Request, Response } from 'express';
import { JwtPayloadType } from '../common/types/jwt';
import { decodeTokenJwt, verifyTokenJwt } from '../helpers/Authentication';

const jwtSecret: string = process.env.JWT_SECRET as string;

class JwtMiddleware {
  validJwtNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        } else {
          res.locals.jwt = verifyTokenJwt(authorization[1], jwtSecret) as JwtPayloadType;
          next();
        }
      } catch (error) {
        const authorization = req.headers['authorization'].split(' ');
        const tokenDecoded = decodeTokenJwt(authorization[1]) as JwtPayloadType;

        if (tokenDecoded && tokenDecoded.exp < Date.now() / 1000) {
          res.locals.jwt = tokenDecoded;
          res.locals.isRefreshToken = true;
          return next();
        }
        return res.status(401).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
