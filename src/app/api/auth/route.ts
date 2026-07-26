export const dynamic = "force-dynamic";

import { prisma } from "@/db";
import { cookies } from "next/headers";

// ============================================================================
// NAVOJIT AUTHENTICATION ENGINE
// ============================================================================
// Mounts the custom @navojit/auth package to handle Next.js API requests.
// Configured with a custom Prisma adapter to persist sessions in PostgreSQL.

// The @navojit/auth package requires a specific AuthAdapter interface
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
  },
};

let handlersCache: any = null;

async function getHandlers() {
  if (handlersCache) return handlersCache;
  
  // Lazily import to bypass Turbopack's build-time fs execution error
  const { NavojitAuth, createNextAuthHandler } = await import("@navojit/auth");
  
  const authEngine = new NavojitAuth({
    adapter: prismaAdapter,
    secret: process.env.NAVOJIT_SECRET || "fallback-secret",
  });

  handlersCache = createNextAuthHandler(authEngine);
  return handlersCache;
}

export const POST = async (req: Request) => {
  const handlers = await getHandlers();
  const res = await handlers.POST(req);
  
  if (res.ok) {
    const data = await res.clone().json();
    if (data.access_token) {
      const cookieStore = await cookies();
      cookieStore.set("navojit_access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 day
      });
    }
  }
  
  return res;
};
