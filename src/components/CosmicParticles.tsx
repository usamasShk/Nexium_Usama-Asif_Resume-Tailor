"use client";
import Particles from "@tsparticles/react";
import { useCallback } from "react";
import { type Engine } from "@tsparticles/engine";

export default function CosmicParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // No custom presets needed for now
  }, []);
  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "#0d0d0d" } },
        fpsLimit: 60,
        particles: {
          number: { value: 120, density: { enable: true } },
          color: { value: ["#fff", "#00BFFF", "#8A2BE2"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            animation: { enable: true, speed: 0.5, sync: false }
          },
          size: {
            value: { min: 0.5, max: 1.5 },
            animation: { enable: false }
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "bottom",
            random: true,
            straight: false,
            outModes: { default: "out" },
            gravity: { enable: true, acceleration: 0.2 },
          },
          twinkle: { particles: { enable: true, frequency: 0.15, color: { value: "#fff" } } },
          shadow: { enable: true, color: "#00BFFF", blur: 2 },
        },
        detectRetina: true,
        fullScreen: { enable: false },
      }}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
