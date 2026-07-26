"use server";

import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized access");
}

export async function getNotes() {
  return prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createNote(data: {
  title: string;
  content: string;
  category?: string;
}) {
  await requireAuth();
  
  const note = await prisma.note.create({
    data
  });
  
  revalidatePath("/notes");
  revalidatePath("/admin");
  return note;
}

export async function updateNote(id: string, data: Partial<{
  title: string;
  content: string;
  category: string | null;
}>) {
  await requireAuth();
  
  const note = await prisma.note.update({
    where: { id },
    data
  });
  
  revalidatePath("/notes");
  revalidatePath("/admin");
  return note;
}

export async function deleteNote(id: string) {
  await requireAuth();
  
  await prisma.note.delete({
    where: { id }
  });
  
  revalidatePath("/notes");
  revalidatePath("/admin");
  return { success: true };
}
