"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for session on mount
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/dashboard");
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the magic link!");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)] pt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full max-w-md card flex flex-col items-center backdrop-blur-xl"
      >
        <div className="mb-6 flex flex-col items-center">
          <Logo />
        </div>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text-dark)]">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-[var(--accent2)] rounded-lg bg-[var(--secondary-bg)] text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 12px var(--accent)" }}
            type="submit"
            className="w-full btn-primary font-bold py-3 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Login"}
          </motion.button>
          {message && <p className="mt-2 text-center text-[var(--accent)] font-medium">{message}</p>}
        </form>
        <div className="mt-6 w-full text-center">
          <span className="text-[var(--text-dark)]">Don't have an account? </span>
          <button
            className="text-[var(--accent)] hover:underline font-semibold transition px-4 py-2 rounded-lg bg-[var(--secondary-bg)] border border-[var(--accent2)] ml-2"
            onClick={() => router.push("/signup")}
            type="button"
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </main>
  );
}
