import React, { useEffect, useRef } from 'react';

export interface ConfettiBurst {
  id: number;
  x: number;
  y: number;
}

interface HeartConfettiProps {
  bursts: ConfettiBurst[];
}

interface HeartParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  tiltPhase: number;
  tiltSpeed: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
}

const COQUETTE_HEART_COLORS = [
  '#C85475',
  '#E36D8E',
  '#B84868',
  '#F4B6C7',
  '#9E3B58',
  '#D989A1',
  '#F9D2DF',
  '#752039',
];

function drawHeartPath(ctx: CanvasRenderingContext2D, size: number) {
  const s = size * 0.5;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(0, -s * 0.25, -s, -s * 0.25, -s, s * 0.35);
  ctx.bezierCurveTo(-s, s * 0.85, -s * 0.2, s * 1.15, 0, s * 1.45);
  ctx.bezierCurveTo(s * 0.2, s * 1.15, s, s * 0.85, s, s * 0.35);
  ctx.bezierCurveTo(s, -s * 0.25, 0, -s * 0.25, 0, s * 0.35);
  ctx.closePath();
}

export function HeartConfetti({ bursts }: HeartConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const rafRef = useRef<number | null>(null);
  const processedIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || bursts.length === 0) return;

    let added = false;

    for (const burst of bursts) {
      if (processedIdsRef.current.has(burst.id)) continue;
      processedIdsRef.current.add(burst.id);
      added = true;

      const count = 48;
      for (let i = 0; i < count; i++) {
        // Fan upward in a celebratory fountain arc with gentle scatter
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.25;
        const speed = 3.2 + Math.random() * 6.8;
        particlesRef.current.push({
          x: burst.x + (Math.random() - 0.5) * 24,
          y: burst.y + (Math.random() - 0.5) * 16,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 10 + Math.random() * 11,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.14,
          tiltPhase: Math.random() * Math.PI * 2,
          tiltSpeed: 0.08 + Math.random() * 0.1,
          color:
            COQUETTE_HEART_COLORS[
              Math.floor(Math.random() * COQUETTE_HEART_COLORS.length)
            ],
          alpha: 0.96,
          decay: 0.009 + Math.random() * 0.008,
          gravity: 0.13 + Math.random() * 0.06,
          drag: 0.985,
        });
      }
    }

    if (!added || rafRef.current !== null) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const renderFrame = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const nextParticles: HeartParticle[] = [];

      for (const p of particlesRef.current) {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx + Math.sin(p.tiltPhase) * 0.45;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tiltPhase += p.tiltSpeed;
        p.alpha -= p.decay;

        if (p.alpha > 0.02 && p.y < window.innerHeight + 60) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          // Subtle 3D flutter scale on X axis
          ctx.scale(0.45 + 0.55 * Math.abs(Math.cos(p.tiltPhase)), 1);
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.fillStyle = p.color;
          drawHeartPath(ctx, p.size);
          ctx.fill();
          ctx.restore();
          nextParticles.push(p);
        }
      }

      particlesRef.current = nextParticles;

      if (nextParticles.length > 0) {
        rafRef.current = window.requestAnimationFrame(renderFrame);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        rafRef.current = null;
      }
    };

    rafRef.current = window.requestAnimationFrame(renderFrame);
  }, [bursts]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none"
    />
  );
}
