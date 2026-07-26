import { PrismaClient } from "@prisma/client";

// -----------------------------------------------------------------------------
// Prisma Client Singleton
// -----------------------------------------------------------------------------
// We use a global variable to prevent instantiating multiple Prisma clients
// during hot-reloading in Next.js development.
// This ensures our database connections are optimized and do not run out.
// -----------------------------------------------------------------------------

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Logs database queries for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
