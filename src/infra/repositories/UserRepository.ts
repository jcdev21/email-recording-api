import Connection from '../database';
import { IUserPayload } from './dto/user.dto';

const prisma = Connection.getInstance();

class UserRepository {
  async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nickname: true,
        status: true
      }
    });
    return users;
  }

  async getById(id: string) {
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        nickname: true,
        status: true
      }
    });
    return user;
  }

  async create(payload: IUserPayload) {
    const user = await prisma.user.create({ data: payload });
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname
    };
  }

  async getByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true
      }
    });
    return user;
  }
}

export default new UserRepository();
