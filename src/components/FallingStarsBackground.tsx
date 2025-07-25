"use client";
import React, { useEffect, useRef } from "react";

// Colors: purple (#a259ff), white only
const STAR_COLORS = ["#a259ff", "#fff"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}


interface FallingStarsBackgroundProps {
  maskSelector?: string;
}

const FallingStarsBackground: React.FC<FallingStarsBackgroundProps> = ({ maskSelector }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const stars = useRef<any[]>([]);
  const staticStars = useRef<any[]>([]);
  const STAR_COUNT = 4;
  const STATIC_STAR_COUNT = 160;
  const globalAngle = useRef(randomBetween(70, 110) * (Math.PI / 180));
  const lastAngleChange = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);

    // Static background stars
    function createStaticStar() {
      return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        size: randomBetween(0.5, 1.5),
        opacity: randomBetween(0.7, 1),
      };
    }
    staticStars.current = Array.from({ length: STATIC_STAR_COUNT }, createStaticStar);

    // Star shape: short line with glow
    function createStar(initialProgress = 0) {
      const size = randomBetween(1, 2.5);
      const len = randomBetween(200, 300);
      const speed = randomBetween(2.0, 4.0);
      // Randomize start near top right
      const startX = width - randomBetween(0, 40);
      const startY = randomBetween(0, 40);
      return {
        startX,
        startY,
        len,
        speed,
        size,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        opacity: randomBetween(0.7, 1),
        twinkle: Math.random() < 0.25,
        twinklePhase: Math.random() * Math.PI * 2,
        progress: initialProgress, // 0 = just spawned, 1 = off screen
      };
    }

    // Stagger stars along the diagonal, spaced by progress
    const progressOffsets = [0, 0.3, 0.6, 0.9];
    stars.current = Array.from({ length: STAR_COUNT }, (__, i) => {
      const star = createStar(progressOffsets[i]);
      star.startX = width - randomBetween(0, 40);
      star.startY = randomBetween(0, 40);
      return star;
    });

    function drawStar(star: any, frame: number) {
      if (!ctx) return;
      // Interpolate position from near top right to near bottom left
      const sx = star.startX - star.progress * width;
      const sy = star.startY + star.progress * height;
      const angle = Math.atan2(height, -width); // angle from (width,0) to (0,height)
      // Draw trail
      const trailLen = star.len;
      const steps = 18;
      for (let i = steps; i > 0; i--) {
        const t = i / steps;
        ctx.save();
        ctx.globalAlpha = star.opacity * t * 0.7;
        ctx.strokeStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 16 * t;
        ctx.lineWidth = star.size * t;
        ctx.beginPath();
        ctx.moveTo(
          sx - Math.cos(angle) * trailLen * (1 - t),
          sy - Math.sin(angle) * trailLen * (1 - t)
        );
        ctx.lineTo(
          sx - Math.cos(angle) * trailLen * (1 - (t - 1 / steps)),
          sy - Math.sin(angle) * trailLen * (1 - (t - 1 / steps))
        );
        ctx.stroke();
        ctx.restore();
      }
      // Twinkle effect
      let twinkleAlpha = 1;
      if (star.twinkle) {
        twinkleAlpha = 0.7 + 0.3 * Math.sin(frame / 6 + star.twinklePhase);
      }
      // Draw star head
      ctx.save();
      ctx.globalAlpha = star.opacity * twinkleAlpha;
      ctx.strokeStyle = star.color;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = 18;
      ctx.lineWidth = star.size;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(
        sx + Math.cos(angle) * star.size * 2,
        sy + Math.sin(angle) * star.size * 2
      );
      ctx.stroke();
      ctx.restore();
    }

    let frame = 0;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Draw static half-moon in the top-left
      const moonX = 120;
      const moonY = 200;
      const moonRadius = 45;
      // Main moon
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      // Crescent cutout
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(moonX + 28, moonY - 10, moonRadius * 0.85, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
      // Draw static background stars
      for (let star of staticStars.current) {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
      for (let star of stars.current) {
        // Update progress
        star.progress += (star.speed / 900); // adjust denominator for speed
        if (star.progress > 1) {
          // Respawn at progress 0, randomize startX/startY again
          star.progress = 0;
          star.startX = width - randomBetween(0, 40);
          star.startY = randomBetween(0, 40);
        }
        drawStar(star, frame);
      }
      frame++;
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [maskSelector]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
      aria-hidden="true"
    />
  );
};

export default FallingStarsBackground;
