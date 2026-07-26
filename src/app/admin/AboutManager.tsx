"use client";

import React, { useState, useEffect } from "react";
import { getProfile, upsertProfile } from "@/lib/actions/profile";

type Profile = {
  id: string;
  bio: string;
  avatarUrl: string | null;
  resumeUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
};

export default function AboutManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    avatarUrl: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: ""
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      if (data) {
        setProfile(data);
        setFormData({
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
          resumeUrl: data.resumeUrl || "",
          githubUrl: data.githubUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          twitterUrl: data.twitterUrl || ""
        });
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    try {
      await upsertProfile({
        bio: formData.bio,
        avatarUrl: formData.avatarUrl || undefined,
        resumeUrl: formData.resumeUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
        twitterUrl: formData.twitterUrl || undefined,
      });
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchProfile();
    } catch (e) {
      alert("Failed to update profile.");
    }
    setIsSubmitting(false);
  };

  if (loading) return <div className="text-zinc-500 animate-pulse p-8">Loading profile data...</div>;

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 shadow-xl backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Profile Config</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage global About section data.</p>
        </div>
        {successMsg && (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded text-sm font-medium">
            {successMsg}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Global Bio (Markdown supported)</label>
          <textarea 
            required 
            value={formData.bio} 
            onChange={e => setFormData({...formData, bio: e.target.value})} 
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono text-sm" 
            rows={8} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Avatar URL</label>
            <input 
              value={formData.avatarUrl} 
              onChange={e => setFormData({...formData, avatarUrl: e.target.value})} 
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Resume URL</label>
            <input 
              value={formData.resumeUrl} 
              onChange={e => setFormData({...formData, resumeUrl: e.target.value})} 
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">GitHub URL</label>
            <input 
              value={formData.githubUrl} 
              onChange={e => setFormData({...formData, githubUrl: e.target.value})} 
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">LinkedIn URL</label>
            <input 
              value={formData.linkedinUrl} 
              onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} 
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors" 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/50">
          <button 
            type="submit"
            disabled={isSubmitting} 
            className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Syncing..." : "Sync Profile Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
