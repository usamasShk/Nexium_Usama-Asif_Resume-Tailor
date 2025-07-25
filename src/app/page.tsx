"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useCallback } from "react";
import Logo from "../components/Logo";

import CosmicParticlesWrapper from "../components/CosmicParticlesWrapper";

export default function HomePage() {
  const router = useRouter();
  const handleBuildResume = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)] px-4 py-12 pt-20 relative overflow-hidden">
      <CosmicParticlesWrapper maskSelector=".feature-card" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full max-w-xl bg-black/80 border border-[#a259ff]/60 rounded-2xl shadow-[0_0_32px_0_#a259ff55] p-0 flex flex-col items-center backdrop-blur-xl mb-8"
      >
        <div className="w-full flex flex-col items-center p-6 border-b border-[#a259ff]/40">
          <Logo />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-1 drop-shadow-glow text-center">Cosmic AI Resume Builder</h1>
          <p className="text-[var(--accent)] text-center text-base max-w-md">Create, tailor, and manage your resumes with AI. Stand out with a futuristic, professional look—powered by the latest tech and cosmic inspiration.</p>
        </div>
        <div className="w-full p-6 flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 16px var(--accent)" }}
            onClick={handleBuildResume}
            className="btn-purple text-lg w-full"
          >
            Build Your Resume
          </motion.button>
        </div>
      </motion.div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="feature-card flex flex-col items-center p-6 rounded-2xl border border-[#a259ff] bg-black/80 shadow-[0_0_24px_0_#a259ff55]">
          <span className="text-[var(--accent)] text-3xl font-extrabold mb-2">⚡680</span>
          <span className="font-semibold text-[var(--accent)] mb-1 text-lg">AI-Powered Tailoring</span>
          <span className="text-white text-sm text-center">
            Instantly adapt your resume for any job with smart, AI-driven suggestions.
          </span>
        </div>
        <div className="feature-card flex flex-col items-center p-6 rounded-2xl border border-[#a259ff] bg-black/80 shadow-[0_0_24px_0_#a259ff55]">
          <span className="text-[var(--accent)] text-3xl font-extrabold mb-2">🔒512</span>
          <span className="font-semibold text-[var(--accent)] mb-1 text-lg">Secure & Private</span>
          <span className="text-white text-sm text-center">
            Your data is encrypted and never shared. You're always in control.
          </span>
        </div>
      </div>
      <div className="w-full text-center text-[var(--accent)] text-xs mt-10">
        &copy; {new Date().getFullYear()} Resume Tailor. All rights reserved.
      </div>
    </main>
  );
}
