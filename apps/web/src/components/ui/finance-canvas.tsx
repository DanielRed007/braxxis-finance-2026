'use client';

import { useRef, useEffect, useCallback } from 'react';

interface AuroraWave {
  offset: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  y: number;
  hue: number;
  opacity: number;
  thickness: number;
}

interface LightStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  hue: number;
  alpha: number;
  width: number;
  life: number;
  maxLife: number;
}

interface Candle {
  x: number;
  top: number;
  bottom: number;
  wickTop: number;
  wickBottom: number;
  positive: boolean;
  width: number;
  glowPhase: number;
  glowSpeed: number;
}

interface GridState {
  verticals: number[];
  horizontals: number[];
  vanishY: number;
}

interface State {
  aurora: AuroraWave[];
  streaks: LightStreak[];
  candles: Candle[];
  grid: GridState;
  tick: number;
  w: number;
  h: number;
}

export function FinanceCanvas(): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<State | null>(null);

  const init = useCallback((w: number, h: number): State => {
    const aurora: AuroraWave[] = [];
    for (let i = 0; i < 5; i++) {
      aurora.push({
        offset: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.004,
        amplitude: 30 + Math.random() * 50,
        wavelength: 0.002 + Math.random() * 0.003,
        y: h * (0.25 + i * 0.12),
        hue: 260 + Math.random() * 40,
        opacity: 0.15 + Math.random() * 0.15,
        thickness: 60 + Math.random() * 80,
      });
    }

    const candles: Candle[] = [];
    const candleCount = Math.floor(w / 20);
    let price = h * 0.5;
    for (let i = 0; i < candleCount; i++) {
      price += (Math.random() - 0.48) * 12;
      price = Math.max(h * 0.2, Math.min(h * 0.8, price));
      const positive = Math.random() > 0.45;
      const bodyH = 6 + Math.random() * 20;
      const wickExtra = 3 + Math.random() * 10;
      const top = positive ? price - bodyH : price;
      const bottom = positive ? price : price + bodyH;
      candles.push({
        x: i * 20 + 10,
        top,
        bottom,
        wickTop: top - wickExtra,
        wickBottom: bottom + wickExtra,
        positive,
        width: 8,
        glowPhase: Math.random() * Math.PI * 2,
        glowSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    const verticals: number[] = [];
    for (let i = 0; i <= 20; i++) {
      verticals.push((i / 20) * w);
    }
    const horizontals: number[] = [];
    for (let i = 0; i <= 12; i++) {
      horizontals.push((i / 12) * h);
    }

    return {
      aurora,
      streaks: [],
      candles,
      grid: { verticals, horizontals, vanishY: h * 0.45 },
      tick: 0,
      w,
      h,
    };
  }, []);

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
      stateRef.current = init(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (): void => {
      const s = stateRef.current;
      if (!s) return;
      const { w, h } = s;

      ctx.clearRect(0, 0, w, h);
      s.tick++;
      const t = s.tick;

      // === LAYER 1: Perspective grid ===
      ctx.save();
      const gridAlpha = 0.08 + Math.sin(t * 0.005) * 0.03;

      // Horizontal grid lines
      for (const hy of s.grid.horizontals) {
        const distFromVanish = Math.abs(hy - s.grid.vanishY) / h;
        const a = gridAlpha * distFromVanish;
        ctx.strokeStyle = `rgba(124, 58, 237, ${a})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, hy);
        ctx.lineTo(w, hy);
        ctx.stroke();
      }

      // Vertical grid lines with perspective convergence
      for (const vx of s.grid.verticals) {
        const centerDist = Math.abs(vx - w / 2) / (w / 2);
        const a = gridAlpha * (0.3 + centerDist * 0.7);
        ctx.strokeStyle = `rgba(124, 58, 237, ${a})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(vx, h);
        const convergeX = w / 2 + (vx - w / 2) * 0.3;
        ctx.lineTo(convergeX, 0);
        ctx.stroke();
      }
      ctx.restore();

      // === LAYER 2: Candlesticks ===
      for (const c of s.candles) {
        const glow = 0.25 + Math.sin(t * c.glowSpeed + c.glowPhase) * 0.15;
        const color = c.positive
          ? `rgba(74, 222, 128, ${glow})`
          : `rgba(248, 113, 113, ${glow})`;
        const glowColor = c.positive
          ? `rgba(74, 222, 128, ${glow * 0.4})`
          : `rgba(248, 113, 113, ${glow * 0.4})`;

        // Glow behind candle
        ctx.save();
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x, c.wickTop);
        ctx.lineTo(c.x, c.wickBottom);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.fillRect(c.x - c.width / 2, c.top, c.width, c.bottom - c.top);
        ctx.restore();
      }

      // === LAYER 3: Aurora waves ===
      for (const wave of s.aurora) {
        wave.offset += wave.speed;
        ctx.save();

        const gradient = ctx.createLinearGradient(0, wave.y - wave.thickness, 0, wave.y + wave.thickness);
        const hsl1 = `hsla(${wave.hue}, 80%, 60%, ${wave.opacity})`;
        const hsl2 = `hsla(${wave.hue + 20}, 70%, 50%, ${wave.opacity * 0.6})`;
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.3, hsl1);
        gradient.addColorStop(0.5, hsl2);
        gradient.addColorStop(0.7, hsl1);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, wave.y + wave.thickness);

        // Top edge with wave
        for (let x = 0; x <= w; x += 4) {
          const y = wave.y - wave.thickness
            + Math.sin(x * wave.wavelength + wave.offset) * wave.amplitude
            + Math.sin(x * wave.wavelength * 2.3 + wave.offset * 1.5) * wave.amplitude * 0.3;
          ctx.lineTo(x, y);
        }

        // Bottom edge
        ctx.lineTo(w, wave.y + wave.thickness);

        for (let x = w; x >= 0; x -= 4) {
          const y = wave.y + wave.thickness
            + Math.sin(x * wave.wavelength * 0.7 + wave.offset * 0.8) * wave.amplitude * 0.4;
          ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // === LAYER 4: Bright trend line ===
      ctx.save();
      const trendY = h * 0.48;
      const lineOffset = t * 0.4;

      // Main glowing line
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = trendY
          + Math.sin((x + lineOffset) * 0.006) * 40
          + Math.sin((x + lineOffset) * 0.015) * 15
          + Math.sin((x + lineOffset) * 0.003) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second thinner accent line
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = trendY + 30
          + Math.sin((x + lineOffset * 1.2) * 0.008) * 30
          + Math.sin((x + lineOffset * 1.2) * 0.02) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fill between lines
      ctx.shadowBlur = 0;
      const fillGrad = ctx.createLinearGradient(0, trendY - 60, 0, trendY + 100);
      fillGrad.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      fillGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.04)');
      fillGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fillGrad;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = trendY
          + Math.sin((x + lineOffset) * 0.006) * 40
          + Math.sin((x + lineOffset) * 0.015) * 15
          + Math.sin((x + lineOffset) * 0.003) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // === LAYER 5: Light streaks ===
      if (t % 8 === 0 && s.streaks.length < 15) {
        const fromLeft = Math.random() > 0.5;
        s.streaks.push({
          x: fromLeft ? -100 : w + 100,
          y: Math.random() * h * 0.7 + h * 0.1,
          length: 80 + Math.random() * 200,
          speed: (fromLeft ? 1 : -1) * (3 + Math.random() * 5),
          angle: (fromLeft ? -0.1 : Math.PI + 0.1) + (Math.random() - 0.5) * 0.15,
          hue: Math.random() > 0.6 ? 270 : (Math.random() > 0.5 ? 145 : 0),
          alpha: 0.3 + Math.random() * 0.4,
          width: 1 + Math.random() * 2,
          life: 0,
          maxLife: 60 + Math.random() * 120,
        });
      }

      for (let i = s.streaks.length - 1; i >= 0; i--) {
        const sk = s.streaks[i];
        sk.life++;
        sk.x += Math.cos(sk.angle) * sk.speed;
        sk.y += Math.sin(sk.angle) * sk.speed;

        const lifeRatio = sk.life / sk.maxLife;
        const fadeAlpha = sk.alpha * (lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.7 ? (1 - lifeRatio) / 0.3 : 1);

        if (sk.life >= sk.maxLife || sk.x < -300 || sk.x > w + 300) {
          s.streaks.splice(i, 1);
          continue;
        }

        const tailX = sk.x - Math.cos(sk.angle) * sk.length;
        const tailY = sk.y - Math.sin(sk.angle) * sk.length;

        const grad = ctx.createLinearGradient(tailX, tailY, sk.x, sk.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.6, `hsla(${sk.hue}, 80%, 65%, ${fadeAlpha * 0.5})`);
        grad.addColorStop(1, `hsla(${sk.hue}, 80%, 75%, ${fadeAlpha})`);

        ctx.save();
        ctx.shadowColor = `hsla(${sk.hue}, 80%, 65%, ${fadeAlpha * 0.6})`;
        ctx.shadowBlur = 6;
        ctx.strokeStyle = grad;
        ctx.lineWidth = sk.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sk.x, sk.y);
        ctx.stroke();
        ctx.restore();
      }

      // === LAYER 6: Floating particles with glow ===
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const seed = i * 7919;
        const px = ((seed * 13 + t * 0.15 * (0.5 + (i % 5) * 0.1)) % w + w) % w;
        const py = ((seed * 17 + t * 0.08 * (0.3 + (i % 3) * 0.15)) % h + h) % h;
        const r = 1 + (seed % 3);
        const pulse = 0.3 + Math.sin(t * 0.02 + i) * 0.2;

        ctx.save();
        ctx.shadowColor = `rgba(168, 85, 247, ${pulse * 0.8})`;
        ctx.shadowBlur = r * 4;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${pulse})`;
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
