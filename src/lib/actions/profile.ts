"use server";

import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized access");
}

export async function getProfile() {
  // Since we only have one profile, we'll just grab the first one
  const profile = await prisma.profile.findFirst();
  return profile;
}

export async function upsertProfile(data: {
  bio: string;
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  currentFocus?: string;
  education?: string;
  techStack?: string;
  hardwareSetup?: string;
  lastUpdated?: string;
}) {
  await requireAuth();
  
  const existing = await prisma.profile.findFirst();
  
  let profile;
  if (existing) {
    profile = await prisma.profile.update({
      where: { id: existing.id },
      data
    });
  } else {
    profile = await prisma.profile.create({
      data
    });
  }
  
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
  return profile;
}
