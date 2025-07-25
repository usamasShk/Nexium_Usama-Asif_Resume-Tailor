import React, { useRef, useEffect, useState } from "react";

const STAR_COLOR = "#a259ff";
const BASKET_COLOR = "#fff";
const CARD_WIDTH = 400;
const CARD_HEIGHT = 220;
const STAR_RADIUS = 12;
const BASKET_WIDTH = 60;
const BASKET_HEIGHT = 18;

export default function CatchStarCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [caught, setCaught] = useState(false);
  const [score, setScore] = useState(0);
  const [basketX, setBasketX] = useState(CARD_WIDTH / 2 - BASKET_WIDTH / 2);
  const [star, setStar] = useState({
    x: Math.random() * (CARD_WIDTH - STAR_RADIUS * 2) + STAR_RADIUS,
    y: 0,
    vy: 3.2,
  });

  // Handle mouse movement for basket
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      let x = e.clientX - rect.left - BASKET_WIDTH / 2;
      x = Math.max(0, Math.min(x, CARD_WIDTH - BASKET_WIDTH));
      setBasketX(x);
    };
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (canvas) canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    let animationId: number;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    function drawStar(x: number, y: number) {
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = STAR_COLOR;
      ctx.shadowColor = STAR_COLOR;
      ctx.shadowBlur = 16;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawBasket(x: number) {
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, CARD_HEIGHT - BASKET_HEIGHT - 8, BASKET_WIDTH, BASKET_HEIGHT);
      ctx.fillStyle = BASKET_COLOR;
      ctx.shadowColor = STAR_COLOR;
      ctx.shadowBlur = 8;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawSparkle(x: number, y: number) {
      if (!ctx) return;
      ctx.save();
      ctx.strokeStyle = STAR_COLOR;
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        const angle = (i * Math.PI) / 4;
        ctx.lineTo(x + Math.cos(angle) * 18, y + Math.sin(angle) * 18);
        ctx.stroke();
      }
      ctx.restore();
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
      drawStar(star.x, star.y);
      drawBasket(basketX);
      if (caught) {
        drawSparkle(star.x, star.y);
      }
      // Move star
      if (!caught) {
        setStar((prev) => ({ ...prev, y: prev.y + prev.vy }));
      }
      // Check for catch
      if (
        !caught &&
        star.y + STAR_RADIUS >= CARD_HEIGHT - BASKET_HEIGHT - 8 &&
        star.x > basketX &&
        star.x < basketX + BASKET_WIDTH
      ) {
        setCaught(true);
        setScore((s) => s + 1);
        setTimeout(() => {
          setCaught(false);
          setStar({
            x: Math.random() * (CARD_WIDTH - STAR_RADIUS * 2) + STAR_RADIUS,
            y: 0,
            vy: 3.2 + Math.random() * 1.5,
          });
        }, 700);
      } else if (star.y > CARD_HEIGHT + STAR_RADIUS) {
        // Missed, reset
        setStar({
          x: Math.random() * (CARD_WIDTH - STAR_RADIUS * 2) + STAR_RADIUS,
          y: 0,
          vy: 3.2 + Math.random() * 1.5,
        });
      }
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line
  }, [star, basketX, caught]);

  return (
    <div className="feature-card flex flex-col items-center w-full max-w-xl mx-auto mb-8" style={{ minHeight: CARD_HEIGHT + 32 }}>
      <h2 className="text-2xl font-bold text-[var(--accent)] mb-2">Catch the Falling Star!</h2>
      <canvas
        ref={canvasRef}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={{ borderRadius: 24, background: "rgba(0,0,0,0.7)", boxShadow: "0 0 32px #a259ff55", marginBottom: 16, cursor: "pointer" }}
      />
      <div className="text-white text-lg font-semibold">Stars Caught: <span className="text-[var(--accent)]">{score}</span></div>
      <div className="text-xs text-[var(--accent)] mt-1">Move your mouse to catch the star!</div>
    </div>
  );
} 