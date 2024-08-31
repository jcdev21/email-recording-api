import Connection from '../database';
import { IRecordPayload } from './dto/record.dto';

const prisma = Connection.getInstance();

class RecordRepository {
  async create(payload: IRecordPayload) {
    const record = await prisma.record.create({ data: payload });
    return {
      id: record.id,
      email: record.email,
      date: record.date,
      description: record.description
    };
  }

  async getAll() {
    const records = await prisma.record.findMany({
      select: {
        id: true,
        email: true
      }
    });
    return records;
  }
}

export default new RecordRepository();
