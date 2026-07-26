"use server";

import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";

/**
 * Validates authentication before performing any mutations.
 * Throws an error if the user is not authenticated.
 */
async function requireAuth() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    throw new Error("Unauthorized access. Session invalid or expired.");
  }
}

export async function getProjects() {
  // Can be called publicly (for the main site) or privately
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createProject(data: {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
  articleUrl?: string;
  imageUrl?: string;
  year: string;
  featured: boolean;
}) {
  await requireAuth();
  
  const project = await prisma.project.create({
    data: {
      ...data,
      demoUrl: data.demoUrl || null,
      sourceUrl: data.sourceUrl || null,
      articleUrl: data.articleUrl || null,
      imageUrl: data.imageUrl || null,
    }
  });
  
  revalidatePath("/");
  revalidatePath("/admin");
  return project;
}

export async function updateProject(id: string, data: Partial<{
  title: string;
  description: string;
  tags: string[];
  demoUrl: string | null;
  sourceUrl: string | null;
  articleUrl: string | null;
  imageUrl: string | null;
  year: string;
  featured: boolean;
}>) {
  await requireAuth();
  
  const project = await prisma.project.update({
    where: { id },
    data
  });
  
  revalidatePath("/");
  revalidatePath("/admin");
  return project;
}

export async function deleteProject(id: string) {
  await requireAuth();
  
  await prisma.project.delete({
    where: { id }
  });
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}
