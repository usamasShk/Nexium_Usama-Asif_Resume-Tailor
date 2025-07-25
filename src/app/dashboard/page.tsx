"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";
import CosmicParticlesWrapper from "../../components/CosmicParticlesWrapper";
import GlowingStarCard from "../../components/GlowingStarCard";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[var(--primary-bg)]">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative z-10 bg-[var(--primary-bg)]">
      <CosmicParticlesWrapper />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full max-w-2xl main-card flex flex-col items-center mb-8"
      >
        <div className="mb-8 flex flex-col items-center">
          <Logo />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-light)] mb-4 drop-shadow-glow text-center">
          Welcome, {user?.email}
        </h1>
        <p className="text-[var(--accent)] mb-4 text-center text-lg max-w-xl">
          Your AI-Powered Resume Dashboard
        </p>
        <p className="text-white mb-8 text-center text-lg max-w-xl">
          Easily upload, tailor, and manage your resumes for every job opportunity. Let AI help you stand out!
        </p>
        <div className="flex gap-4 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 16px var(--accent)" }}
            className="btn-purple"
            onClick={() => router.push("/resume")}
          >
            Upload / Paste Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 16px var(--accent)" }}
            className="btn-purple"
            onClick={() => router.push("/job")}
          >
            Tailor Resume
          </motion.button>
        </div>
      </motion.div>
      {/* Quick Stats */}
      <GlowingStarCard />
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-3xl feature-card mb-8"
      >
        <h2 className="text-lg font-bold text-[var(--accent)] mb-4">Recent Activity</h2>
        <ul className="text-sm text-white space-y-2">
          <li className="flex items-center gap-2"><span className="text-[var(--accent)]">•</span> No recent activity yet. Upload or tailor a resume to get started!</li>
        </ul>
      </motion.div>
      <div className="w-full text-center text-white text-xs mt-10">
        &copy; {new Date().getFullYear()} <span className="text-[var(--accent)]">Resume Tailor</span>. All rights reserved.
      </div>
    </main>
  );
}
