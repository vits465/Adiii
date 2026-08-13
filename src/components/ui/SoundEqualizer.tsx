'use client';

import React, { useState, useEffect } from 'react';

export default function SoundEqualizer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        setAudioCtx(ctx);
        return ctx;
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  };

  const playClickSound = () => {
    if (!isPlaying) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio autoplay restriction fallback
    }
  };

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
    playClickSound();
  };

  return (
    <button
      onClick={toggleSound}
      className={`sound-eq-btn flex items-center gap-[3px] h-[20px] px-1 bg-transparent border-none cursor-pointer ${
        isPlaying ? 'playing' : ''
      }`}
      title={isPlaying ? 'Mute Sound' : 'Enable Sound'}
    >
      <span className="eq-bar w-[2px] h-[16px] bg-current rounded-[1px] transition-colors" />
      <span className="eq-bar w-[2px] h-[16px] bg-current rounded-[1px] transition-colors" />
      <span className="eq-bar w-[2px] h-[16px] bg-current rounded-[1px] transition-colors" />
      <span className="eq-bar w-[2px] h-[16px] bg-current rounded-[1px] transition-colors" />
    </button>
  );
}
