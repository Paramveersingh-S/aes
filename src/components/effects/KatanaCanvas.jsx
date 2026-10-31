import React, { useEffect, useRef } from 'react';

const PALETTE = ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#1d4ed8'];

const KatanaCanvas = () => {
  const canvasRef = useRef(null);

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

    // Twinkling Night Sky Stars
    const starCount = Math.min(110, Math.floor(width / 14));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      speedY: -(Math.random() * 0.15 + 0.03),
      speedX: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.75 + 0.2,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
    }));

    // Cursor Starlight Trail
    const trail = [];
    const maxTrail = 18;

    // Click Starbursts & Ripples
    const ripples = [];
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
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 65,
        life: 1.0
      });

      for (let i = 0; i < 14; i++) {
        const sparkAngle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.8 + 1.2;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(sparkAngle) * speed,
          vy: Math.sin(sparkAngle) * speed,
          size: Math.random() * 2.2 + 0.8,
          life: 1.0,
          color: PALETTE[i % PALETTE.length]
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Twinkling Night Stars
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        s.x += s.speedX;
        s.y += s.speedY;

        if (s.y < -5) {
          s.y = height + 5;
          s.x = Math.random() * width;
        }
        if (s.x < -5) s.x = width + 5;
        if (s.x > width + 5) s.x = -5;

        const currentAlpha = s.alpha * (0.65 + 0.35 * Math.sin(s.twinklePhase));

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#60a5fa';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render Starlight Cursor Trail
      if (trail.length > 1) {
        ctx.save();
        for (let i = 1; i < trail.length; i++) {
          const prev = trail[i - 1];
          const curr = trail[i];
          const ratio = i / trail.length;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = ratio * 2.8;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#3b82f6';
          ctx.globalAlpha = ratio * curr.life * 0.7;
          ctx.stroke();
        }
        ctx.restore();
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.06;
        if (trail[i].life <= 0) trail.splice(i, 1);
      }

      // 3. Render Click Starlight Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.14;
        r.life -= 0.055;

        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = r.life * 0.7;
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#3b82f6';
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Render Click Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.06;
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
