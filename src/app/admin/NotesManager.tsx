"use client";

import React, { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "@/lib/actions/notes";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  createdAt: Date;
};

export default function NotesManager() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Slide-over state
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", category: "" });

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const openDrawer = (note?: Note) => {
    if (note) {
      setEditId(note.id);
      setFormData({
        title: note.title,
        content: note.content,
        category: note.category || ""
      });
    } else {
      setEditId(null);
      setFormData({ title: "", content: "", category: "" });
    }
    setIsSlideOpen(true);
  };

  const closeDrawer = () => setIsSlideOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editId) {
        await updateNote(editId, {
          title: formData.title,
          content: formData.content,
          category: formData.category || null
        });
      } else {
        await createNote({
          title: formData.title,
          content: formData.content,
          category: formData.category || undefined
        });
      }
      closeDrawer();
      fetchNotes();
    } catch (e) {
      alert("Failed to save note.");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note permanently?")) return;
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (e) {
      alert("Failed to delete note");
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Engineering Notes</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage technical snippets and raw thoughts.</p>
        </div>
        <button 
          onClick={() => openDrawer()}
          className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
        >
          + New Note
        </button>
      </div>

      {loading ? (
        <div className="text-zinc-500 animate-pulse">Loading notes database...</div>
      ) : (
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {notes.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No notes found. Create one above.</td></tr>
              ) : notes.map(note => (
                <tr key={note.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{note.title}</td>
                  <td className="px-6 py-4 text-zinc-400">
                    {note.category ? <span className="bg-zinc-800 px-2 py-1 rounded text-xs">{note.category}</span> : '-'}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{new Date(note.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openDrawer(note)} className="text-blue-400 hover:text-blue-300 mr-4 font-medium">Edit</button>
                    <button onClick={() => handleDelete(note.id)} className="text-red-400 hover:text-red-300 font-medium">Delete</button>
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
              <h3 className="text-xl font-bold text-white">{editId ? "Edit Note" : "New Note"}</h3>
              <button onClick={closeDrawer} className="text-zinc-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="note-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Category (Optional)</label>
                  <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Content (Markdown)</label>
                  <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white font-mono text-sm min-h-[300px] focus:border-zinc-500 transition-colors" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur">
              <div className="flex gap-4">
                <button type="button" onClick={closeDrawer} className="flex-1 bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors">Cancel</button>
                <button type="submit" form="note-form" disabled={isSubmitting} className="flex-1 bg-white text-black py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
