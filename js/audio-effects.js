/**
 * Web Audio API Sound Synthesizer for UI Feedback
 * Toggleable sound effects (Leo Parpeix interactive style)
 */
class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.init();
  }

  init() {
    const savedState = localStorage.getItem('sound_enabled');
    if (savedState !== null) {
      this.enabled = savedState === 'true';
    }
    this.updateToggleUI();
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playHover() {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Ignore audio autoplay restriction errors gracefully
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
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
      // Ignore audio restriction errors
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('sound_enabled', this.enabled);
    this.updateToggleUI();
    if (this.enabled) {
      this.playClick();
    }
  }

  updateToggleUI() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    btn.innerHTML = this.enabled 
      ? `<span>🔊</span> <span>Sound ON</span>`
      : `<span>🔇</span> <span>Sound OFF</span>`;
  }
}

window.soundManager = new SoundManager();
