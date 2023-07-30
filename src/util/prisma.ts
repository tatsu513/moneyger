import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
/* eslint-disable */
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}
prisma = globalForPrisma.prisma;

export default prisma;
