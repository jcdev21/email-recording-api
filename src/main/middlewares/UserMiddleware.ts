import { NextFunction, Request, Response } from 'express';

class UserMiddleware {
  async extractUserId(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UserMiddleware();
