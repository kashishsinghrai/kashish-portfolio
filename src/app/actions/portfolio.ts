"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- Projects ---

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function createProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const year = formData.get("year") as string;
    const tagsString = formData.get("tags") as string;
    
    if (!title || !description || !year) {
      return { success: false, error: "Missing required fields" };
    }

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()) : [];

    const project = await prisma.project.create({
      data: {
        title,
        description,
        year,
        tags,
        demoUrl: formData.get("demoUrl") as string | null,
        sourceUrl: formData.get("sourceUrl") as string | null,
        articleUrl: formData.get("articleUrl") as string | null,
        imageUrl: formData.get("imageUrl") as string | null,
        featured: formData.get("featured") === "true",
      },
    });

    // Revalidate the home page to show the new project
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: project };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

// --- Blog Posts ---

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return { success: false, error: "Failed to fetch blog posts" };
  }
}

// --- Open Source Packages ---

export async function getOpenSourcePackages() {
  try {
    const packages = await prisma.openSourcePackage.findMany({
      orderBy: { downloads: "desc" },
    });
    return { success: true, data: packages };
  } catch (error) {
    console.error("Failed to fetch open source packages:", error);
    return { success: false, error: "Failed to fetch open source packages" };
  }
}
