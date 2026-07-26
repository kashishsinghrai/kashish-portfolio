"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated as checkAuth, logout as logoutAction } from "@/lib/session";

import AboutManager from "./AboutManager";
import ProjectsManager from "./ProjectsManager";
import PostsManager from "./PostsManager";
import NotesManager from "./NotesManager";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // High-Level Dashboard Tab State
  const [activeTab, setActiveTab] = useState<"overview" | "about" | "projects" | "posts" | "notes">("overview");

  // Check HttpOnly cookie via Server Action
  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: password, action: "login" }),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Invalid credentials. Access denied.");
      }
    } catch (err) {
      setError("System failure during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-zinc-500 font-medium">
        Authenticating ecosystem...
      </div>
    );
  }

  // Render Login Form if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-black font-bold text-xl">KS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">System Gateway</h1>
            <p className="text-sm text-zinc-400 mt-2">Enter founder credentials to access the ecosystem.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                Identifier
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-all shadow-inner"
                placeholder="founder@navojit.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                Passkey
              </label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-bold rounded-lg px-4 py-3 mt-4 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Initialize Session"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Premium CMS Layout (Sidebar + Content)
  const navItems = [
    { id: "overview", label: "Dashboard Overview" },
    { id: "about", label: "About (Profile)" },
    { id: "projects", label: "Projects Database" },
    { id: "posts", label: "Knowledge Hub (Blogs)" },
    { id: "notes", label: "Engineering Notes" },
  ] as const;

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Navojit CMS</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Authorized Session</p>
        </div>
        
        <nav className="flex flex-col space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-8"
        >
          Terminate Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pb-20">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {navItems.filter(i => i.id !== 'overview').map(item => (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-500/50 transition-all cursor-pointer group backdrop-blur-sm shadow-xl"
              >
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                  {item.label} <span>→</span>
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Manage content and structure for the {item.label.toLowerCase()} module.
                </p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "about" && <AboutManager />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "posts" && <PostsManager />}
        {activeTab === "notes" && <NotesManager />}
      </main>
    </div>
  );
}
