export const dynamic = "force-dynamic";

import { prisma } from "@/db";
import { cookies } from "next/headers";
import { verifyPassword, signJwt } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });

    if (!user) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await verifyPassword(user.passwordHash, password);

    if (!isValid) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const access_token = signJwt({ sub: user.id, email: user.email, role: user.role });

    const cookieStore = await cookies();
    cookieStore.set("navojit_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return Response.json({ success: true, access_token });
  } catch (error: any) {
    console.error("[AUTH] Login failed:", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
