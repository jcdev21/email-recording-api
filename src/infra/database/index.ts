import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;

class Connection {
  private static _instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!Connection._instance) {
      Connection._instance = new PrismaClient({
        datasources: {
          db: { url: dbUrl }
        }
      });
    }

    return Connection._instance;
  }
}

export default Connection;
