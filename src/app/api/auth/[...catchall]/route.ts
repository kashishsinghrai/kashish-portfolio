import { NavojitAuth, createNextAuthHandler } from "@navojit/auth";
import prisma from "@/db"; // Initializes PrismaClient from our singleton instance

// -----------------------------------------------------------------------------
// NAVOJIT AUTH CONFIGURATION & INITIALIZATION
// -----------------------------------------------------------------------------
// This file mounts the custom @navojit/auth package to the Next.js API route.
// Any request coming to `/api/auth/*` will be handled by the Sovereign Engine.
// -----------------------------------------------------------------------------

// 1. Adapter Setup
// We map the database operations (via Prisma) to the interface expected by NavojitAuth.
// This decouples the auth engine from the specific database schema, making it highly modular.
const prismaAdapter = {
  createUser: async (data: any) => {
    const { password, isVerified, ...rest } = data;
    const user = await prisma.adminUser.create({
      data: {
        ...rest,
        passwordHash: password,
      },
    });
    return { ...user, password: user.passwordHash };
  },
  findUserByEmail: async (email: string) => {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) return null;
    return { ...user, password: user.passwordHash };
  },
  findUserById: async (id: string) => {
    const user = await prisma.adminUser.findUnique({ where: { id } });
    if (!user) return null;
    return { ...user, password: user.passwordHash };
  }
};

// 2. Initialize the Sovereign Engine
// We pass our Prisma adapter and secure secret into the core NavojitAuth class.
const engine = new NavojitAuth({
  adapter: prismaAdapter,
  secret: process.env.NAVOJIT_SECRET || "fallback_secret_for_dev",
  prefix: "/api/auth" 
});

// 3. Mount and export the App Router handler
// createNextAuthHandler returns standard Web Request handlers for Next.js App Router
const handler = createNextAuthHandler(engine);

// Export standard HTTP methods for Next.js API Routes
export const POST = handler.POST;
