'use client';

import { useRef, useEffect, useCallback } from 'react';

/* ── Color palettes ───────────────────────────────────────────── */

interface Palette {
  bg: string;
  grid: string;
  aurora: { h: number; s: number; l: number }[];
  candleUp: string;
  candleDown: string;
  candleUpGlow: string;
  candleDownGlow: string;
  trend: string;
  trendGlow: string;
  trendFill: string;
  streak: { h: number; s: number; l: number }[];
  particle: string;
  particleGlow: string;
  sparkColor: string;
}

const DARK: Palette = {
  bg: 'rgb(6,0,16)',
  grid: 'rgba(134, 96, 250, 0.12)',
  aurora: [
    { h: 270, s: 90, l: 60 },
    { h: 290, s: 85, l: 55 },
    { h: 250, s: 95, l: 65 },
    { h: 310, s: 80, l: 50 },
    { h: 195, s: 90, l: 55 },
  ],
  candleUp: 'rgba(74, 222, 128, ALPHA)',
  candleDown: 'rgba(248, 113, 113, ALPHA)',
  candleUpGlow: 'rgba(74, 222, 128, 0.7)',
  candleDownGlow: 'rgba(248, 113, 113, 0.7)',
  trend: 'rgba(168, 85, 247, 0.85)',
  trendGlow: 'rgba(168, 85, 247, 0.9)',
  trendFill: 'rgba(168, 85, 247, 0.15)',
  streak: [
    { h: 270, s: 90, l: 70 },
    { h: 150, s: 85, l: 65 },
    { h: 0, s: 85, l: 70 },
    { h: 195, s: 95, l: 65 },
  ],
  particle: 'rgba(168, 85, 247, ALPHA)',
  particleGlow: 'rgba(168, 85, 247, 0.9)',
  sparkColor: 'rgba(255, 255, 255, ALPHA)',
};

const LIGHT: Palette = {
  bg: '#f8f6fb',
  grid: 'rgba(124, 58, 237, 0.1)',
  aurora: [
    { h: 260, s: 75, l: 45 },
    { h: 280, s: 80, l: 40 },
    { h: 240, s: 85, l: 50 },
    { h: 300, s: 70, l: 42 },
    { h: 195, s: 80, l: 40 },
  ],
  candleUp: 'rgba(22, 163, 74, ALPHA)',
  candleDown: 'rgba(220, 38, 38, ALPHA)',
  candleUpGlow: 'rgba(22, 163, 74, 0.6)',
  candleDownGlow: 'rgba(220, 38, 38, 0.6)',
  trend: 'rgba(124, 58, 237, 0.8)',
  trendGlow: 'rgba(124, 58, 237, 0.85)',
  trendFill: 'rgba(124, 58, 237, 0.1)',
  streak: [
    { h: 260, s: 80, l: 50 },
    { h: 150, s: 75, l: 40 },
    { h: 350, s: 80, l: 50 },
    { h: 195, s: 85, l: 45 },
  ],
  particle: 'rgba(124, 58, 237, ALPHA)',
  particleGlow: 'rgba(124, 58, 237, 0.8)',
  sparkColor: 'rgba(124, 58, 237, ALPHA)',
};

/* ── Types ────────────────────────────────────────────────────── */

interface AuroraWave {
  offset: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  yRatio: number;
  colorIdx: number;
  opacity: number;
  thickness: number;
}

interface Streak {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  colorIdx: number;
  alpha: number;
  width: number;
  life: number;
  maxLife: number;
}

interface Candle {
  xRatio: number;
  top: number;
  bottom: number;
  wickTop: number;
  wickBottom: number;
  positive: boolean;
  w: number;
  phase: number;
  speed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  r: number;
}

interface State {
  aurora: AuroraWave[];
  streaks: Streak[];
  candles: Candle[];
  sparks: Spark[];
  tick: number;
  w: number;
  h: number;
  dark: boolean;
}

/* ── Helpers ──────────────────────────────────────────────────── */

function alphaStr(template: string, a: number): string {
  return template.replace('ALPHA', a.toFixed(3));
}

function hsl(c: { h: number; s: number; l: number }, a: number): string {
  return `hsla(${c.h}, ${c.s}%, ${c.l}%, ${a})`;
}

/* ── Component ────────────────────────────────────────────────── */

export function FinanceCanvas(): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<State | null>(null);

  const isDark = useCallback((): boolean => {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }, []);

  const buildState = useCallback((w: number, h: number): State => {
    const aurora: AuroraWave[] = [];
    for (let i = 0; i < 5; i++) {
      aurora.push({
        offset: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.006,
        amplitude: 35 + Math.random() * 55,
        wavelength: 0.002 + Math.random() * 0.003,
        yRatio: 0.18 + i * 0.14,
        colorIdx: i,
        opacity: 0.22 + Math.random() * 0.18,
        thickness: 70 + Math.random() * 90,
      });
    }

    const candles: Candle[] = [];
    const count = Math.floor(w / 18);
    let price = h * 0.5;
    for (let i = 0; i < count; i++) {
      price += (Math.random() - 0.47) * 14;
      price = Math.max(h * 0.15, Math.min(h * 0.85, price));
      const pos = Math.random() > 0.44;
      const body = 8 + Math.random() * 28;
      const wick = 4 + Math.random() * 14;
      const top = pos ? price - body : price;
      const bot = pos ? price : price + body;
      candles.push({
        xRatio: i / count,
        top: top / h,
        bottom: bot / h,
        wickTop: (top - wick) / h,
        wickBottom: (bot + wick) / h,
        positive: pos,
        w: 10,
        phase: Math.random() * Math.PI * 2,
        speed: 0.025 + Math.random() * 0.025,
      });
    }

    return {
      aurora,
      streaks: [],
      candles,
      sparks: [],
      tick: 0,
      w,
      h,
      dark: isDark(),
    };
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = (): void => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current = buildState(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      if (stateRef.current) {
        stateRef.current.dark = isDark();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const draw = (): void => {
      const s = stateRef.current;
      if (!s) return;
      const { w, h } = s;
      const P = s.dark ? DARK : LIGHT;

      ctx.clearRect(0, 0, w, h);
      s.tick++;
      const t = s.tick;

      /* ── 1. ELECTRIC GRID ─────────────────────────────────── */
      const gridPulse = 0.6 + Math.sin(t * 0.008) * 0.4;
      ctx.strokeStyle = P.grid;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = gridPulse;

      // Horizontal
      for (let i = 1; i <= 14; i++) {
        const y = (i / 15) * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Vertical converging
      for (let i = 0; i <= 24; i++) {
        const x = (i / 24) * w;
        const cx = w / 2 + (x - w / 2) * 0.2;
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(cx, 0);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* ── 2. CANDLESTICKS with electric glow ───────────────── */
      for (const c of s.candles) {
        const pulse = 0.35 + Math.sin(t * c.speed + c.phase) * 0.25;
        const x = c.xRatio * w;
        const cTop = c.top * h;
        const cBot = c.bottom * h;
        const wTop = c.wickTop * h;
        const wBot = c.wickBottom * h;

        const fill = alphaStr(c.positive ? P.candleUp : P.candleDown, pulse);
        const glow = c.positive ? P.candleUpGlow : P.candleDownGlow;

        ctx.save();
        ctx.shadowColor = glow;
        ctx.shadowBlur = 12 + pulse * 8;

        // Wick
        ctx.strokeStyle = fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, wTop);
        ctx.lineTo(x, wBot);
        ctx.stroke();

        // Body
        ctx.fillStyle = fill;
        ctx.fillRect(x - c.w / 2, cTop, c.w, cBot - cTop);
        ctx.restore();
      }

      /* ── 3. AURORA WAVES ──────────────────────────────────── */
      for (const wave of s.aurora) {
        wave.offset += wave.speed;
        const baseY = wave.yRatio * h;
        const col = P.aurora[wave.colorIdx % P.aurora.length];

        ctx.save();
        const grad = ctx.createLinearGradient(0, baseY - wave.thickness, 0, baseY + wave.thickness);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.2, hsl(col, wave.opacity * 0.5));
        grad.addColorStop(0.5, hsl(col, wave.opacity));
        grad.addColorStop(0.8, hsl(col, wave.opacity * 0.5));
        grad.addColorStop(1, 'transparent');

        // Electric flicker
        const flicker = 1 + Math.sin(t * 0.07 + wave.colorIdx) * 0.15;
        ctx.globalAlpha = flicker;

        ctx.shadowColor = hsl(col, 0.6);
        ctx.shadowBlur = 30;

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-10, baseY + wave.thickness);

        for (let x = -10; x <= w + 10; x += 3) {
          const y = baseY - wave.thickness
            + Math.sin(x * wave.wavelength + wave.offset) * wave.amplitude
            + Math.sin(x * wave.wavelength * 2.5 + wave.offset * 1.7) * wave.amplitude * 0.4
            + Math.sin(x * wave.wavelength * 0.5 + wave.offset * 0.6) * wave.amplitude * 0.6;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w + 10, baseY + wave.thickness);
        for (let x = w + 10; x >= -10; x -= 3) {
          const y = baseY + wave.thickness
            + Math.sin(x * wave.wavelength * 0.8 + wave.offset * 0.9) * wave.amplitude * 0.3;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      /* ── 4. DUAL TREND LINES with heavy glow ─────────────── */
      ctx.save();
      const lo = t * 0.5;

      // Primary line
      ctx.shadowColor = P.trendGlow;
      ctx.shadowBlur = 35;
      ctx.strokeStyle = P.trend;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.45
          + Math.sin((x + lo) * 0.005) * 50
          + Math.sin((x + lo) * 0.017) * 20
          + Math.sin((x + lo) * 0.002) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second accent line
      ctx.shadowBlur = 20;
      ctx.strokeStyle = hsl(P.aurora[4], 0.5);
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.52
          + Math.sin((x + lo * 1.3) * 0.007) * 35
          + Math.sin((x + lo * 1.3) * 0.022) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Gradient fill under primary
      ctx.shadowBlur = 0;
      const fg = ctx.createLinearGradient(0, h * 0.3, 0, h * 0.75);
      fg.addColorStop(0, P.trendFill);
      fg.addColorStop(1, 'transparent');
      ctx.fillStyle = fg;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.45
          + Math.sin((x + lo) * 0.005) * 50
          + Math.sin((x + lo) * 0.017) * 20
          + Math.sin((x + lo) * 0.002) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* ── 5. ELECTRIC STREAKS ──────────────────────────────── */
      if (t % 5 === 0 && s.streaks.length < 20) {
        const left = Math.random() > 0.5;
        const ci = Math.floor(Math.random() * P.streak.length);
        s.streaks.push({
          x: left ? -150 : w + 150,
          y: Math.random() * h,
          len: 120 + Math.random() * 280,
          speed: (left ? 1 : -1) * (4 + Math.random() * 7),
          angle: left ? (-0.08 + Math.random() * 0.16) : (Math.PI - 0.08 + Math.random() * 0.16),
          colorIdx: ci,
          alpha: 0.5 + Math.random() * 0.5,
          width: 1.5 + Math.random() * 2.5,
          life: 0,
          maxLife: 50 + Math.random() * 100,
        });
      }

      for (let i = s.streaks.length - 1; i >= 0; i--) {
        const sk = s.streaks[i];
        sk.life++;
        sk.x += Math.cos(sk.angle) * sk.speed;
        sk.y += Math.sin(sk.angle) * sk.speed;

        const lr = sk.life / sk.maxLife;
        const fa = sk.alpha * (lr < 0.1 ? lr / 0.1 : lr > 0.6 ? (1 - lr) / 0.4 : 1);

        if (sk.life >= sk.maxLife) {
          // Spawn sparks at death
          for (let si = 0; si < 4; si++) {
            s.sparks.push({
              x: sk.x, y: sk.y,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
              life: 0, maxLife: 20 + Math.random() * 30,
              r: 1 + Math.random() * 2,
            });
          }
          s.streaks.splice(i, 1);
          continue;
        }

        const col = P.streak[sk.colorIdx];
        const tx = sk.x - Math.cos(sk.angle) * sk.len;
        const ty = sk.y - Math.sin(sk.angle) * sk.len;

        const sg = ctx.createLinearGradient(tx, ty, sk.x, sk.y);
        sg.addColorStop(0, 'transparent');
        sg.addColorStop(0.5, hsl(col, fa * 0.4));
        sg.addColorStop(0.85, hsl(col, fa * 0.8));
        sg.addColorStop(1, hsl(col, fa));

        ctx.save();
        ctx.shadowColor = hsl(col, fa * 0.8);
        ctx.shadowBlur = 10;
        ctx.strokeStyle = sg;
        ctx.lineWidth = sk.width;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(sk.x, sk.y);
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(sk.x, sk.y, sk.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = hsl(col, fa);
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();
      }

      /* ── 6. SPARKS ───────────────────────────────────────── */
      for (let i = s.sparks.length - 1; i >= 0; i--) {
        const sp = s.sparks[i];
        sp.life++;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.05; // gravity

        if (sp.life >= sp.maxLife) {
          s.sparks.splice(i, 1);
          continue;
        }

        const a = 1 - sp.life / sp.maxLife;
        ctx.save();
        ctx.shadowColor = alphaStr(P.sparkColor, a);
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r * a, 0, Math.PI * 2);
        ctx.fillStyle = alphaStr(P.sparkColor, a);
        ctx.fill();
        ctx.restore();
      }

      /* ── 7. GLOWING PARTICLES ─────────────────────────────── */
      for (let i = 0; i < 60; i++) {
        const seed = i * 7919;
        const px = ((seed * 13 + t * 0.18 * (0.4 + (i % 5) * 0.12)) % w + w) % w;
        const py = ((seed * 17 + t * 0.1 * (0.3 + (i % 3) * 0.12)) % h + h) % h;
        const r = 1.2 + (seed % 3);
        const pulse = 0.4 + Math.sin(t * 0.025 + i * 0.7) * 0.3;

        ctx.save();
        ctx.shadowColor = P.particleGlow;
        ctx.shadowBlur = r * 6;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = alphaStr(P.particle, pulse);
        ctx.fill();
        ctx.restore();
      }

      /* ── 8. ELECTRIC ARCS (occasional) ────────────────────── */
      if (t % 120 < 3) {
        const arcCol = P.aurora[Math.floor(Math.random() * P.aurora.length)];
        const startX = Math.random() * w;
        const startY = Math.random() * h * 0.6;
        let ax = startX;
        let ay = startY;

        ctx.save();
        ctx.shadowColor = hsl(arcCol, 0.9);
        ctx.shadowBlur = 15;
        ctx.strokeStyle = hsl(arcCol, 0.7);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ax, ay);

        const segments = 8 + Math.floor(Math.random() * 8);
        for (let j = 0; j < segments; j++) {
          ax += (Math.random() - 0.5) * 60 + 20;
          ay += (Math.random() - 0.3) * 40;
          ctx.lineTo(ax, ay);
        }
        ctx.stroke();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [buildState, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
