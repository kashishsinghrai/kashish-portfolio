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
  currentFocus: string | null;
  education: string | null;
  techStack: string | null;
  hardwareSetup: string | null;
  lastUpdated: string | null;
  updatedAt: Date;
};

const inputClass = "w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors text-sm";
const labelClass = "block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest";
const sectionClass = "bg-zinc-900/20 border border-zinc-800/30 rounded-xl p-6 space-y-5";
const sectionTitle = "text-sm font-bold text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2";

export default function AboutManager() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    avatarUrl: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    currentFocus: "",
    education: "",
    techStack: "",
    hardwareSetup: "",
    lastUpdated: "",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile() as Profile | null;
      if (data) {
        setFormData({
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
          resumeUrl: data.resumeUrl || "",
          githubUrl: data.githubUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          twitterUrl: data.twitterUrl || "",
          currentFocus: data.currentFocus || "",
          education: data.education || "",
          techStack: data.techStack || "",
          hardwareSetup: data.hardwareSetup || "",
          lastUpdated: data.lastUpdated || "",
        });
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfile(); }, []);

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
        currentFocus: formData.currentFocus || undefined,
        education: formData.education || undefined,
        techStack: formData.techStack || undefined,
        hardwareSetup: formData.hardwareSetup || undefined,
        lastUpdated: formData.lastUpdated || undefined,
      });
      setSuccessMsg("Profile synced successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchProfile();
    } catch (e) {
      alert("Failed to update profile.");
    }
    setIsSubmitting(false);
  };

  if (loading) return <div className="text-zinc-500 animate-pulse p-8">Loading profile data...</div>;

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 shadow-xl backdrop-blur-md space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Profile Config</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage all About section content.</p>
        </div>
        {successMsg && (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded text-sm font-medium">
            {successMsg}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ── Bio ── */}
        <div className={sectionClass}>
          <p className={sectionTitle}>📝 Bio</p>
          <div>
            <label className={labelClass}>Global Bio (Markdown supported)</label>
            <textarea
              required
              value={formData.bio}
              onChange={set("bio")}
              className={`${inputClass} font-mono`}
              rows={6}
            />
          </div>
        </div>

        {/* ── Current Focus ── */}
        <div className={sectionClass}>
          <p className={sectionTitle}>🎯 Current Focus</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Last Updated (e.g. July 2026)</label>
              <input value={formData.lastUpdated} onChange={set("lastUpdated")} className={inputClass} placeholder="July 2026" />
            </div>
            <div>
              <label className={labelClass}>Education</label>
              <input value={formData.education} onChange={set("education")} className={inputClass} placeholder="B.Tech CSE at Rai University" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Current Focus / What I'm Working On</label>
            <textarea
              value={formData.currentFocus}
              onChange={set("currentFocus")}
              className={inputClass}
              rows={3}
              placeholder="Scaling Navojit Auth Engine&#10;Building open-source tools..."
            />
          </div>
        </div>

        {/* ── Tech Stack & Gear ── */}
        <div className={sectionClass}>
          <p className={sectionTitle}>⚙️ Technical Stack & Gear</p>
          <div>
            <label className={labelClass}>Software Ecosystem (one item per line)</label>
            <textarea
              value={formData.techStack}
              onChange={set("techStack")}
              className={`${inputClass} font-mono`}
              rows={5}
              placeholder="Backend: Next.js, Node.js, Fastify&#10;Frontend: React, TailwindCSS&#10;Database: PostgreSQL, Prisma"
            />
          </div>
          <div>
            <label className={labelClass}>Hardware Setup / Workstation</label>
            <textarea
              value={formData.hardwareSetup}
              onChange={set("hardwareSetup")}
              className={inputClass}
              rows={3}
              placeholder="Workstation: Custom Built Windows Machine&#10;Monitor: ..."
            />
          </div>
        </div>

        {/* ── Links ── */}
        <div className={sectionClass}>
          <p className={sectionTitle}>🔗 Links & URLs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Avatar URL</label>
              <input value={formData.avatarUrl} onChange={set("avatarUrl")} className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>Resume URL</label>
              <input value={formData.resumeUrl} onChange={set("resumeUrl")} className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input value={formData.githubUrl} onChange={set("githubUrl")} className={inputClass} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input value={formData.linkedinUrl} onChange={set("linkedinUrl")} className={inputClass} placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className={labelClass}>Twitter / X URL</label>
              <input value={formData.twitterUrl} onChange={set("twitterUrl")} className={inputClass} placeholder="https://x.com/..." />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800/50">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Syncing..." : "Sync Profile Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
