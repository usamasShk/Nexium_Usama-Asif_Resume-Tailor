"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";
import CosmicParticlesWrapper from "../../components/CosmicParticlesWrapper";
import { sendToN8nWebhook } from "../../lib/n8nClient";

export default function JobPage() {
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resumeFile = localStorage.getItem("resumeFile");
      if (!resumeFile) {
        router.push("/resume");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get resume file from localStorage
      const resumeFileStr = localStorage.getItem("resumeFile");
      if (!resumeFileStr) {
        throw new Error("No resume found. Please upload your resume first.");
      }

      // Convert stored base64 back to File object
      const resumeData = JSON.parse(resumeFileStr);
      const base64Response = await fetch(resumeData.data);
      const blob = await base64Response.blob();
      const file = new File([blob], resumeData.name, { type: resumeData.type });

      const response = await sendToN8nWebhook(file, job);
      if (response?.formattedText) {
        if (typeof window !== "undefined") {
          localStorage.setItem('tailoredContent', JSON.stringify(response));
          localStorage.setItem('job', job);
          setTimeout(() => {
            router.push("/select-template");
          }, 100);
        }
      } else {
        throw new Error("Failed to get tailored resume content");
      }
    } catch (error: unknown) {
      console.error('Error in handleSubmit:', error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert(errorMessage);
      
      if (errorMessage.includes("resume")) {
        router.push("/resume");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative z-10 bg-[var(--primary-bg)]">
      <CosmicParticlesWrapper />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full max-w-lg main-card flex flex-col items-center mb-8"
      >
        {/* Logo and Title */}
        <div className="mb-6 flex flex-col items-center">
          <Logo />
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-light)] mt-4 drop-shadow-glow text-center">
            Paste Job Description
          </h1>
        </div>

        <p className="text-[var(--accent)] mb-8 text-center text-lg">
          Let AI tailor your resume to match the job requirements perfectly.
        </p>

        {/* Job Description Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 max-w-xl">
          <div className="bg-[var(--secondary-bg)] p-6 rounded-lg border border-[var(--accent)]/10">
            <textarea
              className="w-full bg-[var(--primary-bg)] rounded-lg p-4 text-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition min-h-[200px] mb-6"
              placeholder="Paste the complete job description here..."
              value={job}
              onChange={e => setJob(e.target.value)}
              required
            />

            {/* Tips */}
            {/* Tips card removed as per request */}
          </div>

          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 16px var(--accent)" }}
            type="submit"
            className="w-full btn-purple"
            disabled={loading || !job}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Tailor Resume"
            )}
          </motion.button>
        </form>
      </motion.div>

      <div className="w-full text-center text-white text-xs mt-10">
        &copy; {new Date().getFullYear()} <span className="text-[var(--accent)]">Resume Tailor</span>. All rights reserved.
      </div>
    </main>
  );
} 
