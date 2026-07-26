"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Only run on desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render on mobile or initial load before first move
  if (position.x === -100 && position.y === -100) return null;

  return (
    <>
      {/* Outer Glow */}
      <div
        className={`fixed top-0 left-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out`}
        style={{ left: position.x, top: position.y }}
      />
      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out`}
        style={{ left: position.x, top: position.y }}
      >
        <div 
          className={`bg-white rounded-full transition-all duration-300 ${
            isPointer ? "w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/40" : "w-2 h-2"
          }`}
        />
      </div>
    </>
  );
}
