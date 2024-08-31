import { Prisma } from '@prisma/client';

export type IRecordPayload = Pick<Prisma.RecordGetPayload<Prisma.RecordArgs>, 'email' | 'date' | 'description'>;
