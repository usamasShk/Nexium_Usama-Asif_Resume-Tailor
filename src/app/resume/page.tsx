"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";
import CosmicParticlesWrapper from "../../components/CosmicParticlesWrapper";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please upload a PDF file");
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a PDF file");
      return;
    }
    
    setLoading(true);
    try {
      // Store the file in localStorage for the next page
      const fileReader = new FileReader();
      fileReader.onload = function() {
        if (typeof window !== "undefined") {
          localStorage.setItem("resumeFile", JSON.stringify({
            name: file.name,
            type: file.type,
            data: fileReader.result
          }));
          setTimeout(() => {
            router.push("/job");
          }, 100);
        }
      };
      fileReader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing resume:", error);
      alert("Error processing resume. Please try again.");
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
        className="w-full max-w-2xl main-card flex flex-col items-center mb-8"
      >
        {/* Logo and Title */}
        <div className="mb-6 flex flex-col items-center">
          <Logo />
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-light)] mt-4 drop-shadow-glow">
            Upload Your Resume
          </h1>
        </div>

        <p className="text-[var(--accent)] mb-8 text-center text-lg">
          Upload your resume in PDF format to get started.
        </p>
        
        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 max-w-xl">
          <div className="bg-[var(--secondary-bg)] p-6 rounded-lg border border-[var(--accent)]/10">
            <label className="block text-[var(--accent)] font-medium mb-4">Upload PDF File</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-[var(--accent)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-bg)] file:text-[var(--accent)] hover:file:bg-[var(--accent)]/10 transition"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 16px var(--accent)" }}
            type="submit"
            className="w-full btn-purple mt-4"
            disabled={loading || !file}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Continue"
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
