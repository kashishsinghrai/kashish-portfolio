"use server";

import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";

/**
 * Validates authentication before performing any mutations.
 */
async function requireAuth() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    throw new Error("Unauthorized access. Session invalid or expired.");
  }
}

export async function getPosts(includeUnpublished = false) {
  return prisma.blogPost.findMany({
    where: includeUnpublished ? undefined : { published: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createPost(data: {
  title: string;
  slug: string;
  content: string;
  published: boolean;
  readTime: number;
}) {
  await requireAuth();
  
  const post = await prisma.blogPost.create({
    data
  });
  
  revalidatePath("/blog");
  revalidatePath("/admin");
  return post;
}

export async function updatePost(id: string, data: Partial<{
  title: string;
  slug: string;
  content: string;
  published: boolean;
  readTime: number;
}>) {
  await requireAuth();
  
  const post = await prisma.blogPost.update({
    where: { id },
    data
  });
  
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");
  return post;
}

export async function deletePost(id: string) {
  await requireAuth();
  
  const post = await prisma.blogPost.delete({
    where: { id }
  });
  
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");
  return { success: true };
}
