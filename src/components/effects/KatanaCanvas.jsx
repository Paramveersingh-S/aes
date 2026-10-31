import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const STYLE_PALETTES = {
  hinokami: ['#ff2a54', '#f59e0b', '#fb7185', '#fde047'],
  water: ['#00f0ff', '#3b82f6', '#38bdf8', '#e0f2fe'],
  thunder: ['#facc15', '#38bdf8', '#f59e0b', '#fef08a'],
  moon: ['#c084fc', '#ff2a54', '#e879f9', '#f3e8ff']
};

const KatanaCanvas = () => {
  const canvasRef = useRef(null);
  const { breathingStyle } = useTheme();
  const paletteRef = useRef(STYLE_PALETTES[breathingStyle] || STYLE_PALETTES.hinokami);

  useEffect(() => {
    paletteRef.current = STYLE_PALETTES[breathingStyle] || STYLE_PALETTES.hinokami;
  }, [breathingStyle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating Embers / Wisteria Petals
    const particleCount = Math.min(55, Math.floor(width / 26));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.6 + 0.8,
      speedY: -(Math.random() * 0.65 + 0.2),
      speedX: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.65 + 0.15,
      colorIdx: Math.floor(Math.random() * 4),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.008
    }));

    // Cursor Katana Trail
    const trail = [];
    const maxTrail = 18;

    // Click Slash Arcs & Sparks
    const slashes = [];
    const sparks = [];

    const handleMouseMove = (e) => {
      trail.push({
        x: e.clientX,
        y: e.clientY,
        life: 1.0
      });
      if (trail.length > maxTrail) {
        trail.shift();
      }
    };

    const handleMouseDown = (e) => {
      const palette = paletteRef.current;
      const angle = (Math.random() - 0.5) * 1.2 - Math.PI / 4;
      slashes.push({
        x: e.clientX,
        y: e.clientY,
        angle,
        length: 110 + Math.random() * 50,
        life: 1.0,
        color: palette[0]
      });

      for (let i = 0; i < 14; i++) {
        const sparkAngle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 1.5;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(sparkAngle) * speed,
          vy: Math.sin(sparkAngle) * speed,
          size: Math.random() * 2.5 + 1,
          life: 1.0,
          color: palette[i % palette.length]
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const palette = paletteRef.current;

      // 1. Render Floating Breathing Embers
      for (const p of particles) {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.25;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = palette[p.colorIdx % palette.length];
        ctx.shadowBlur = 10;
        ctx.shadowColor = palette[0];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render Katana Cursor Blade Trail
      if (trail.length > 1) {
        ctx.save();
        for (let i = 1; i < trail.length; i++) {
          const prev = trail[i - 1];
          const curr = trail[i];
          const ratio = i / trail.length;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = palette[0];
          ctx.lineWidth = ratio * 3.2;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 12;
          ctx.shadowColor = palette[0];
          ctx.globalAlpha = ratio * curr.life * 0.75;
          ctx.stroke();
        }
        ctx.restore();
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.06;
        if (trail[i].life <= 0) trail.splice(i, 1);
      }

      // 3. Render Click Katana Slashes
      for (let i = slashes.length - 1; i >= 0; i--) {
        const s = slashes[i];
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.globalAlpha = s.life;
        ctx.shadowBlur = 18;
        ctx.shadowColor = s.color;

        const grad = ctx.createLinearGradient(-s.length / 2, 0, s.length / 2, 0);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, '#ffffff');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.life * 3.5;
        ctx.beginPath();
        ctx.moveTo(-s.length / 2, 0);
        ctx.lineTo(s.length / 2, 0);
        ctx.stroke();
        ctx.restore();

        s.life -= 0.085;
        if (s.life <= 0) slashes.splice(i, 1);
      }

      // 4. Render Click Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.08;
        sp.life -= 0.04;

        if (sp.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = sp.life;
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = sp.color;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};

export default KatanaCanvas;
