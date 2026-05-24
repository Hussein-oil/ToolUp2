"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  // Separate refs for target and current so RAF reads fresh values without closures
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const active = useRef(false);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    function tick() {
      // lerp factor: 0.1 = smooth trail, not laggy
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;

      el!.style.background =
        `radial-gradient(20px circle at ${current.current.x}px ${current.current.y}px, rgba(139,0,0,2), transparent 70%)`;

      rafRef.current = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };

      if (!active.current) {
        active.current = true;
        // Snap current to target on first move so there's no slide from the corner
        current.current = { x: e.clientX, y: e.clientY };
        el!.style.opacity = "1";
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function onLeave() {
      active.current = false;
      el!.style.opacity = "0";
      cancelAnimationFrame(rafRef.current);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.5s ease",
        willChange: "background",
        zIndex: 9999,
      }}
    />
  );
}
