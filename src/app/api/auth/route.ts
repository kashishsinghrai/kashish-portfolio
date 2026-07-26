import { NavojitAuth, createNextAuthHandler } from "@navojit/auth";
import { prisma } from "@/lib/db";

// ============================================================================
// NAVOJIT AUTHENTICATION ENGINE
// ============================================================================
// Mounts the custom @navojit/auth package to handle Next.js API requests.
// Configured with a custom Prisma adapter to persist sessions in PostgreSQL.

// The @navojit/auth package requires a specific AuthAdapter interface
const prismaAdapter = {
  createUser: async (data: any) => prisma.adminUser.create({ data }),
  findUserByEmail: async (email: string) => prisma.adminUser.findUnique({ where: { email } }),
  findUserById: async (id: string) => prisma.adminUser.findUnique({ where: { id } }),
};

const authEngine = new NavojitAuth({
  adapter: prismaAdapter,
  secret: process.env.NAVOJIT_SECRET || "fallback-secret",
});

// Generate standard App Router handlers for POST requests
const handlers = createNextAuthHandler(authEngine);

import { cookies } from "next/headers";

export const POST = async (req: Request) => {
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
