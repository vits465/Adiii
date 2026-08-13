'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'drag' | 'view'>('default');
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect hover target attributes or tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor]');
      const dragContainer = target.closest('.cursor-grab, [data-cursor="drag"]');

      if (dragContainer) {
        setCursorState('drag');
        setLabel('DRAG');
      } else if (interactive) {
        const customLabel = interactive.getAttribute('data-cursor-label');
        setCursorState(customLabel ? 'view' : 'hover');
        setLabel(customLabel || 'VIEW');
      } else {
        setCursorState('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animateFollower = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    animationFrameId = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  return (
    <>
      {/* Center Dot */}
      <div
        id="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          opacity: cursorState === 'default' ? 1 : 0,
        }}
      />

      {/* Outer Follower Ring */}
      <div
        id="cursor-follower"
        className={cursorState !== 'default' ? 'border-accent bg-accent/10' : ''}
        style={{
          transform: `translate(${followerPos.x}px, ${followerPos.y}px) translate(-50%, -50%) scale(${
            cursorState === 'hover' ? 1.6 : cursorState === 'view' ? 2 : cursorState === 'drag' ? 1.8 : 1
          })`,
        }}
      />

      {/* Contextual Badge / Label */}
      <div
        id="cursor-label"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${
            cursorState === 'drag' || cursorState === 'view' ? 1 : 0
          })`,
        }}
      >
        {label}
      </div>
    </>
  );
}
