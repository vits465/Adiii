'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animateFollower = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
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
      <div
        id="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      />
      <div
        id="cursor-follower"
        style={{
          transform: `translate(${followerPos.x}px, ${followerPos.y}px) translate(-50%, -50%) ${
            isHovered ? 'scale(1.6)' : 'scale(1)'
          }`,
        }}
      />
      <div
        id="cursor-drag-badge"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${
            isDrag ? 1 : 0
          })`,
        }}
      >
        DRAG
      </div>
    </>
  );
}
