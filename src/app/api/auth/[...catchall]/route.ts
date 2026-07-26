export const dynamic = "force-dynamic";

import { prisma } from "@/db";
import { NavojitAuth, createNextAuthHandler } from "@navojit/auth";

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

const engine = new NavojitAuth({
  adapter: prismaAdapter,
  secret: process.env.NAVOJIT_SECRET || "fallback_secret_for_dev",
  prefix: "/api/auth" 
});

const handler = createNextAuthHandler(engine);

export async function POST(req: Request, ctx: any) {
  return (handler as any).POST(req, ctx);
}

export async function GET(req: Request, ctx: any) {
  if ((handler as any).GET) {
    return (handler as any).GET(req, ctx);
  }
  return new Response("Method Not Allowed", { status: 405 });
}
