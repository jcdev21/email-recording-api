import path from 'path';
import fs from 'fs';
import { IRecordPayload } from '../../infra/repositories/dto/record.dto';
import RecordRepository from '../../infra/repositories/RecordRepository';
import { sendMail } from '../helpers/Mail';
import { ICommonService } from '../interfaces/ICommonService';

class RecordService implements ICommonService {
  async list() {
    try {
      return await RecordRepository.getAll();
    } catch (error: unknown) {
      throw error;
    }
  }

  async listByDate(dateString: string) {
    try {
      const date = new Date(dateString);
      return await RecordRepository.getAllByDate(date);
    } catch (error: unknown) {
      throw error;
    }
  }

  readById(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  async store(payload: IRecordPayload) {
    try {
      return await RecordRepository.create({ ...payload });
    } catch (error: unknown) {
      throw error;
    }
  }

  async sendMail(
    email: string,
    payload?: {
      [key: string]: string | number | Date | boolean | null | undefined;
    }
  ) {
    try {
      const dirr = path.resolve(path.join(process.cwd(), 'public/email-templates', 'create-record.html'));
      const template = fs.readFileSync(dirr);
      return await sendMail('Email from Apps', email, template.toString(), payload);
    } catch (error: unknown) {
      throw error;
    }
  }
}

export default new RecordService();
