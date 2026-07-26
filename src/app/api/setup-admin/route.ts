import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import * as argon2 from "argon2";

export async function GET() {
  try {
    const email = "founder@navojit.com";
    const plainTextPassword = "Navojit2026";
    
    // Hash the password securely using argon2
    const passwordHash = await argon2.hash(plainTextPassword);

    // Use upsert to avoid crashing if the user already exists.
    // It will update the password if the email is found, or create it if not.
    const adminUser = await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash },
      create: {
        email,
        passwordHash,
        name: "Kashish Singh",
        role: "FOUNDER"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Admin account initialized securely.",
      user: { 
        id: adminUser.id, 
        email: adminUser.email,
        role: adminUser.role 
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An unknown error occurred" }, 
      { status: 500 }
    );
  }
}
