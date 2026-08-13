/**
 * Interactive Particle Wave Canvas Background
 * Leo Parpeix inspired fluid movement
 */
class CanvasBackground {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, radius: 180 };
    this.cols = 0;
    this.rows = 0;
    this.spacing = 45;
    
    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.cols = Math.ceil(this.width / this.spacing) + 1;
    this.rows = Math.ceil(this.height / this.spacing) + 1;

    this.particles = [];
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const originX = i * this.spacing;
        const originY = j * this.spacing;
        this.particles.push({
          x: originX,
          y: originY,
          originX: originX,
          originY: originY,
          vx: 0,
          vy: 0,
          size: (Math.sin(i * 0.3 + j * 0.3) + 1.2) * 1.2
        });
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background subtle gradient radial spot at mouse
    if (this.mouse.x > 0) {
      const gradient = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 350
      );
      gradient.addColorStop(0, 'rgba(8, 61, 42, 0.25)');
      gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
      gradient.addColorStop(1, 'rgba(5, 8, 6, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    const time = Date.now() * 0.0015;

    // Update & draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Calculate wave displacement
      const waveX = Math.sin(time + p.originY * 0.01) * 6;
      const waveY = Math.cos(time + p.originX * 0.01) * 6;

      // Mouse repulsion
      const dx = this.mouse.x - (p.originX + waveX);
      const dy = this.mouse.y - (p.originY + waveY);
      const dist = Math.sqrt(dx * dx + dy * dy);

      let forceX = 0;
      let forceY = 0;

      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 35;
        const angle = Math.atan2(dy, dx);
        forceX = -Math.cos(angle) * force;
        forceY = -Math.sin(angle) * force;
      }

      // Smooth interpolation to target position
      const targetX = p.originX + waveX + forceX;
      const targetY = p.originY + waveY + forceY;

      p.x += (targetX - p.x) * 0.1;
      p.y += (targetY - p.y) * 0.1;

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = dist < this.mouse.radius ? 'rgba(52, 211, 153, 0.7)' : 'rgba(52, 211, 153, 0.22)';
      this.ctx.fill();
    }

    // Connect nearest points subtly
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < this.particles.length; i += 2) {
      const p1 = this.particles[i];
      const dx = this.mouse.x - p1.x;
      const dy = this.mouse.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 140) {
        for (let j = i + 1; j < this.particles.length; j += 7) {
          const p2 = this.particles[j];
          const pDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (pDist < 60) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - pDist / 60)})`;
            this.ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CanvasBackground();
});
