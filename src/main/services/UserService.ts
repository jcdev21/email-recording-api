import { IUserPayload, IUserUpdatePayload } from '../../infra/repositories/dto/user.dto';
import UserRepository from '../../infra/repositories/UserRepository';
import { hashPasswordWithBcrypt } from '../helpers/Authentication';
import { ICommonService } from '../interfaces/ICommonService';

class UserService implements ICommonService {
  async list() {
    try {
      return await UserRepository.getAll();
    } catch (error: unknown) {
      throw error;
    }
  }

  async readById(id: string) {
    try {
      return await UserRepository.getById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async store(payload: IUserPayload) {
    try {
      const hashedPassword = await hashPasswordWithBcrypt(payload.password);
      return await UserRepository.create({ ...payload, password: hashedPassword });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserByEmailWithPassword(email: string) {
    try {
      return await UserRepository.getByEmail(email);
    } catch (error: unknown) {
      throw error;
    }
  }

  async edit(id: string, payload: IUserUpdatePayload) {
    try {
      return await UserRepository.update(id, payload);
    } catch (error: unknown) {
      throw error;
    }
  }
}

export default new UserService();
