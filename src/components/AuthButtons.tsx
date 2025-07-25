"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthButtons() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (user) {
    return (
      <button onClick={handleSignOut} className="ml-4 text-white hover:text-[#a259ff] font-semibold transition drop-shadow-glow">Sign Out</button>
    );
  }
  return (
    <a href="/login" className="ml-4 text-white hover:text-[#a259ff] font-semibold transition drop-shadow-glow">Sign In</a>
  );
}
