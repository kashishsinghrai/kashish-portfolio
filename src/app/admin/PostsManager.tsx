"use client";

import React, { useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "@/lib/actions/posts";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  readTime: number;
  createdAt: Date;
};

export default function PostsManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "", content: "", published: true, readTime: "5"
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openDrawer = (post?: BlogPost) => {
    if (post) {
      setEditId(post.id);
      setFormData({
        title: post.title,
        content: post.content,
        published: post.published,
        readTime: post.readTime.toString()
      });
    } else {
      setEditId(null);
      setFormData({ title: "", content: "", published: true, readTime: "5" });
    }
    setIsSlideOpen(true);
  };

  const closeDrawer = () => setIsSlideOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload = {
      title: formData.title,
      slug,
      content: formData.content,
      published: formData.published,
      readTime: parseInt(formData.readTime, 10) || 5
    };
    
    try {
      if (editId) {
        await updatePost(editId, payload);
      } else {
        await createPost(payload);
      }
      closeDrawer();
      fetchPosts();
    } catch (e) {
      alert("Failed to save post");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (e) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Transmissions</h2>
          <p className="text-zinc-500 text-sm mt-1">Publish technical literature and engineering notes.</p>
        </div>
        <button 
          onClick={() => openDrawer()}
          className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
        >
          + New Post
        </button>
      </div>

      {loading ? (
        <div className="text-zinc-500 animate-pulse">Loading transmissions database...</div>
      ) : (
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {posts.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No posts found. Create one above.</td></tr>
              ) : posts.map(post => (
                <tr key={post.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                  <td className="px-6 py-4">
                    {post.published 
                      ? <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-xs font-medium">Published</span>
                      : <span className="bg-zinc-800 text-zinc-400 px-2 py-1 rounded text-xs font-medium">Draft</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openDrawer(post)} className="text-blue-400 hover:text-blue-300 mr-4 font-medium">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-over Drawer UI */}
      {isSlideOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={closeDrawer} />
          <div className="fixed inset-y-0 right-0 w-full md:w-[700px] bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold text-white">{editId ? "Edit Transmission" : "New Transmission"}</h3>
              <button onClick={closeDrawer} className="text-zinc-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Read Time (m)</label>
                    <input type="number" required value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Content (Markdown)</label>
                  <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white font-mono text-sm min-h-[400px] focus:border-zinc-500 transition-colors" />
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-white" />
                    Published (Live on site)
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur">
              <div className="flex gap-4">
                <button type="button" onClick={closeDrawer} className="flex-1 bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors">Cancel</button>
                <button type="submit" form="post-form" disabled={isSubmitting} className="flex-1 bg-white text-black py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Transmission"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
