import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { RefreshDataType } from '../common/types/refresh';

type PayloadJWT = {
  userId: string;
  email: string;
};

export async function hashPasswordWithBcrypt(plainPassword: string): Promise<string> {
  const salts = await bcrypt.genSalt(14);
  return await bcrypt.hash(plainPassword, salts);
}

export async function verifyPasswordWithBcrypt(plainPassword: string, passwordHash: string) {
  return await bcrypt.compare(plainPassword, passwordHash);
}

export function generateTokenJWT(payload: PayloadJWT, secret: string, expiredTime?: number | string): string {
  return jwt.sign(payload, secret, {
    expiresIn: expiredTime
  });
}

export function generateRefreshToken(refreshId: string): RefreshDataType {
  const salt = crypto.createSecretKey(crypto.randomBytes(16));
  const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
  const refreshKey = salt.export();
  return {
    refreshToken: hash,
    refreshKey
  };
}

export function verifyTokenJwt(token: string, secret: string) {
  return jwt.verify(token, secret);
}

export function decodeTokenJwt(token: string) {
  return jwt.decode(token);
}

// export function verifyRefreshToken(refreshKey: Buffer) {

// }
