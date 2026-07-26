"use client";

import React, { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/projects";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string | null;
  sourceUrl: string | null;
  articleUrl: string | null;
  imageUrl: string | null;
  year: string;
  featured: boolean;
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "", description: "", tags: "", demoUrl: "", sourceUrl: "", year: new Date().getFullYear().toString(), featured: false
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openDrawer = (p?: Project) => {
    if (p) {
      setEditId(p.id);
      setFormData({
        title: p.title, description: p.description, tags: p.tags.join(", "),
        demoUrl: p.demoUrl || "", sourceUrl: p.sourceUrl || "",
        year: p.year, featured: p.featured
      });
    } else {
      setEditId(null);
      setFormData({
        title: "", description: "", tags: "", demoUrl: "", sourceUrl: "", year: new Date().getFullYear().toString(), featured: false
      });
    }
    setIsSlideOpen(true);
  };

  const closeDrawer = () => setIsSlideOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      demoUrl: formData.demoUrl || undefined,
      sourceUrl: formData.sourceUrl || undefined,
      year: formData.year,
      featured: formData.featured
    };
    
    try {
      if (editId) {
        await updateProject(editId, payload);
      } else {
        await createProject(payload);
      }
      closeDrawer();
      fetchProjects();
    } catch (e) {
      alert("Failed to save project");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (e) {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Portfolio Projects</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage the Innovation Lab database.</p>
        </div>
        <button 
          onClick={() => openDrawer()}
          className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <div className="text-zinc-500 animate-pulse">Loading projects...</div>
      ) : (
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Year</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {projects.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No projects found.</td></tr>
              ) : projects.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                  <td className="px-6 py-4">
                    {p.featured && <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-1 rounded text-xs font-medium">Featured</span>}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{p.year}</td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openDrawer(p)} className="text-blue-400 hover:text-blue-300 mr-4 font-medium">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 font-medium">Delete</button>
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
          <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold text-white">{editId ? "Edit Project" : "New Project"}</h3>
              <button onClick={closeDrawer} className="text-zinc-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" rows={4} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Tags (comma separated)</label>
                  <input required value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Demo URL</label>
                    <input value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Source URL</label>
                    <input value={formData.sourceUrl} onChange={e => setFormData({...formData, sourceUrl: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Year</label>
                    <input required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-24 bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white text-center focus:border-zinc-500 transition-colors" />
                  </div>
                  <label className="flex items-center gap-2 mt-6 text-white cursor-pointer">
                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-white" />
                    Featured Project
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur">
              <div className="flex gap-4">
                <button type="button" onClick={closeDrawer} className="flex-1 bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors">Cancel</button>
                <button type="submit" form="project-form" disabled={isSubmitting} className="flex-1 bg-white text-black py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Project"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
