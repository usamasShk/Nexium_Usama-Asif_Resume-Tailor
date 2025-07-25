"use client";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo";

export default function TailoredPage() {
  const [tailored, setTailored] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTailored = async () => {
      const resume = localStorage.getItem("resume");
      const job = localStorage.getItem("job");
      const res = await fetch("/api/ai-tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job }),
      });
      const data = await res.json();
      setTailored(data.tailoredResume);
      setLoading(false);
    };
    fetchTailored();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)]">
      <div className="w-full max-w-xl card flex flex-col items-center">
        {/* Logo and Title */}
        <div className="mb-6 flex flex-col items-center">
          <Logo />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-dark)] mb-4 drop-shadow-glow text-center">
          Tailored Resume
        </h1>
        {loading ? (
          <div className="text-[var(--accent2)]">Generating tailored resume...</div>
        ) : (
          <div className="bg-[var(--secondary-bg)] border border-[var(--accent2)] p-4 rounded mb-4 whitespace-pre-wrap text-[var(--text-dark)]">{tailored}</div>
        )}
        <div className="flex gap-2 mt-4">
          <button className="btn-primary">Edit</button>
          <button className="btn-primary" style={{ background: 'var(--success)', color: 'white' }}>Download as PDF</button>
          <button className="btn-primary" style={{ background: 'var(--accent2)', color: 'white' }}>Save</button>
        </div>
      </div>
    </main>
  );
}
