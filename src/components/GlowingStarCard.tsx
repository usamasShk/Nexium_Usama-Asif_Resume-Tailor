import React, { useEffect, useRef, useState } from "react";

export default function GlowingStarCard() {
  const [glow, setGlow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function triggerGlow() {
      setGlow(true);
      timeoutRef.current = setTimeout(() => setGlow(false), 700);
    }
    // Trigger glow at random intervals between 1.5s and 3.5s
    const interval = setInterval(() => {
      triggerGlow();
    }, Math.random() * 2000 + 1500);
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`feature-card flex flex-col items-center w-full max-w-xl mx-auto mb-8 transition-shadow duration-500 ${
        glow ? "glow-animate" : ""
      }`}
      style={{
        minHeight: 180,
        boxShadow: glow
          ? "0 0 48px 8px #a259ff, 0 0 0 4px #a259ff55"
          : "0 0 32px 0 #a259ff55",
        borderColor: glow ? "#a259ff" : "#a259ff77",
        borderWidth: 2,
        borderStyle: "solid",
        background: "rgba(0,0,0,0.7)",
        position: "relative",
      }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-3xl select-none" style={{ color: "#a259ff", filter: glow ? "drop-shadow(0 0 16px #a259ff)" : "none" }}>
        ★
      </div>
      <h2 className="text-2xl font-bold text-[var(--accent)] mb-2 mt-8">Cosmic Inspiration</h2>
      <div className="text-white text-lg text-center max-w-md">
        "Shoot for the stars! Every resume you tailor brings you closer to your dream job."
      </div>
      <div className="text-xs text-[var(--accent)] mt-3">A star energizes your journey every few seconds...</div>
    </div>
  );
}

// Add this to your global CSS (globals.css):
// .glow-animate {
//   animation: border-glow 0.7s cubic-bezier(0.4,0,0.2,1);
// }
// @keyframes border-glow {
//   0% { box-shadow: 0 0 32px 0 #a259ff55; border-color: #a259ff77; }
//   30% { box-shadow: 0 0 48px 8px #a259ff, 0 0 0 4px #a259ff55; border-color: #a259ff; }
//   100% { box-shadow: 0 0 32px 0 #a259ff55; border-color: #a259ff77; }
// } 