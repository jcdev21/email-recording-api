import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.list();
      return res.status(200).json({
        success: true,
        message: 'Success get list user',
        data: users
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await UserService.readById(req.body.id);
      return res.status(200).json({
        success: true,
        message: 'Success get user',
        data: user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const { email, password, nickname, status = true } = req.body;

    try {
      const user = await UserService.store({ email, password, nickname, status });
      return res.status(201).json({
        success: true,
        message: 'Success create user',
        data: user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }
  }
}

export default new UserController();
