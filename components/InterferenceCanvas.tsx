"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

const GW = 176;
const GH = 121;
const LAMBDA = 0.095; // wavelength as a fraction of width
const clampX = (v: number) => Math.min(0.97, Math.max(0.03, v));
const clampY = (v: number) => Math.min(0.95, Math.max(0.05, v));

/** Two coherent wave sources. Drag (mouse/touch) or use arrow keys to move the second one. */
export default function InterferenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current!;
    const read = readRef.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = prefersReducedMotion();
    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;
    off.width = GW;
    off.height = GH;
    const img = octx.createImageData(GW, GH);
    const s1 = { x: 0.36, y: 0.5 };
    const s2 = { x: 0.64, y: 0.5 };
    let t = 0;
    let visible = true;
    let dragging = false;
    let raf = 0;

    const size = () => {
      const r = cv.getBoundingClientRect();
      const d = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(r.width * d);
      cv.height = Math.round(r.height * d);
    };

    const frame = () => {
      const k = (2 * Math.PI) / LAMBDA;
      const data = img.data;
      let p = 0;
      for (let j = 0; j < GH; j++) {
        const y = j / GW;
        for (let i = 0; i < GW; i++) {
          const x = i / GW;
          const d1 = Math.hypot(x - s1.x, y - (s1.y * GH) / GW);
          const d2 = Math.hypot(x - s2.x, y - (s2.y * GH) / GW);
          const a = Math.sin(k * d1 - t) / (1 + d1 * 3) + Math.sin(k * d2 - t) / (1 + d2 * 3);
          const v = Math.max(0, a) / 1.6;
          const w = v * v;
          data[p++] = 10 + w * 245;
          data[p++] = 11 + w * 144;
          data[p++] = 13 + w * 56;
          data[p++] = 255;
        }
      }
      octx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, 0, 0, cv.width, cv.height);
      const W = cv.width;
      const H = cv.height;
      const R = Math.max(6, W * 0.012);
      ([
        [s1, "#ebe7df", false],
        [s2, "#ff9b45", true],
      ] as const).forEach(([s, c, ring]) => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, R, 0, 7);
        ctx.fillStyle = c;
        ctx.fill();
        if (ring) {
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, R * 2.1, 0, 7);
          ctx.strokeStyle = "rgba(255,155,69,.7)";
          ctx.lineWidth = Math.max(1.5, W * 0.002);
          ctx.stroke();
        }
      });
      const sep = Math.hypot(s2.x - s1.x, ((s2.y - s1.y) * GH) / GW) / LAMBDA;
      read.textContent = `d = ${sep.toFixed(1)} λ`;
    };

    const loop = () => {
      if (visible) {
        t += 0.09;
        frame();
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    const redrawIfStill = () => {
      if (reduce || !visible) frame();
    };

    const setFromEvent = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      s2.x = clampX((e.clientX - r.left) / r.width);
      s2.y = clampY((e.clientY - r.top) / r.height);
      redrawIfStill();
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      cv.setPointerCapture(e.pointerId);
      setFromEvent(e);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) setFromEvent(e);
    };
    const onUp = () => {
      dragging = false;
    };
    const onKey = (e: KeyboardEvent) => {
      const st = 0.02;
      const m = ({ ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] } as Record<
        string,
        [number, number]
      >)[e.key];
      if (!m) return;
      e.preventDefault();
      s2.x = clampX(s2.x + m[0]);
      s2.y = clampY(s2.y + m[1]);
      redrawIfStill();
    };
    const onResize = () => {
      size();
      frame();
    };

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    cv.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    // Pause the animation while the canvas is off screen.
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(cv);

    size();
    frame();
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
      cv.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="fig-frame">
      <canvas
        id="wave"
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label="Two-source interference pattern. Drag, or use arrow keys, to move the second source."
      />
      <div className="fig-read" ref={readRef} aria-live="polite">
        d = 2.9 λ
      </div>
    </div>
  );
}
