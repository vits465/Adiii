'use client';

import React, { useState, useRef } from 'react';

export default function SoundEqualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSynthesizedTone = (freq = 440, type: OscillatorType = 'sine', duration = 0.12) => {
    if (!isPlaying) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Autoplay fallback silently ignored
    }
  };

  const toggleSound = () => {
    initAudio();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      playSynthesizedTone(520, 'triangle', 0.18);
    }
  };

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => playSynthesizedTone(380, 'sine', 0.08)}
      className={`sound-eq-btn flex items-center gap-[3px] h-[20px] px-2 py-1 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:border-accent/40 transition-colors ${
        isPlaying ? 'playing text-accent' : 'text-fg-muted'
      }`}
      title={isPlaying ? 'Mute Audio Synthesizer' : 'Enable Audio Synthesizer'}
      data-cursor-label="AUDIO"
    >
      <span className="eq-bar w-[2px] h-[14px] bg-current rounded-[1px] transition-colors" />
      <span className="eq-bar w-[2px] h-[14px] bg-current rounded-[1px] transition-colors" />
      <span className="eq-bar w-[2px] h-[14px] bg-current rounded-[1px] transition-colors" />
      <span className="eq-bar w-[2px] h-[14px] bg-current rounded-[1px] transition-colors" />
      <span className="ml-1 text-[10px] font-code uppercase">
        {isPlaying ? 'SOUND ON' : 'SOUND OFF'}
      </span>
    </button>
  );
}
