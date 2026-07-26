export const dynamic = "force-dynamic";

import { prisma } from "@/db";
import { cookies } from "next/headers";

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
  },
};

const authEngine = new NavojitAuth({
  adapter: prismaAdapter,
  secret: process.env.NAVOJIT_SECRET || "fallback-secret",
});

const handlers = createNextAuthHandler(authEngine);

export const POST = async (req: Request) => {
  try {
    const res = await handlers.POST(req);
    
    if (res.ok) {
      const text = await res.clone().text();
      if (text) {
        const data = JSON.parse(text);
        if (data.access_token) {
          const cookieStore = await cookies();
          cookieStore.set("navojit_access_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24
          });
        }
      }
    }
    return res;
  } catch (error: any) {
    console.error("🔥 AUTH ENGINE CRASHED:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
