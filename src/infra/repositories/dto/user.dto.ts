import { Prisma } from '@prisma/client';

export type IUserPayload = Pick<Prisma.UserGetPayload<Prisma.UserArgs>, 'email' | 'nickname' | 'password' | 'status'>;
