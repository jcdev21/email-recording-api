import { Request, Response } from 'express';
import RecordService from '../services/RecordService';

class RecordController {
  async createRecord(req: Request, res: Response) {
    const { email, date, description } = req.body;

    try {
      const record = await RecordService.store({ email, date, description });
      await RecordService.sendMail(record.email);
      return res.status(201).json({
        success: true,
        message: 'Success create record & send mail',
        data: record
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }
  }

  async getAll(req: Request, res: Response) {
    const { date } = req.query;

    try {
      const records = await RecordService.listByDate(date as string);
      return res.status(200).json({
        success: true,
        message: 'Success get list record',
        data: records
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }
  }
}

export default new RecordController();
