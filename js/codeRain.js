/* ═══════════════════════════════════════════════════
   CODE RAIN — Matrix-style canvas animation
   Used on boot screen AND hero background
═══════════════════════════════════════════════════ */

class CodeRain {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.opts = {
      fontSize:   options.fontSize   || 13,
      color:      options.color      || '#00d4ff',
      bgAlpha:    options.bgAlpha    || 0.05,
      speed:      options.speed      || 1,
      density:    options.density    || 0.75,
    };

    // Mix of code chars, symbols, and numbers for authentic feel
    this.chars = (
      'アイウエオカキクケコサシスセソタチツテトナニヌネノ' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' +
      '{}[]<>/\\|=+-*&%$#@!?;:.,_~`^' +
      'const let var function return if else for while class import export'
    ).split('');

    this.drops = [];
    this.animId = null;

    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.cols = Math.floor(this.canvas.width / this.opts.fontSize);
    this.init();
  }

  init() {
    this.drops = [];
    for (let i = 0; i < this.cols; i++) {
      // Stagger initial positions so it doesn't look like a flood
      this.drops[i] = Math.random() > this.opts.density
        ? Math.floor(Math.random() * -80)
        : Math.floor(Math.random() * this.canvas.height / this.opts.fontSize);
    }
  }

  draw() {
    const { ctx, canvas, opts, chars, drops } = this;
    const h = canvas.height;
    const rows = Math.floor(h / opts.fontSize);

    // Fade trail
    ctx.fillStyle = `rgba(7, 11, 18, ${opts.bgAlpha})`;
    ctx.fillRect(0, 0, canvas.width, h);

    ctx.font = `${opts.fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x    = i * opts.fontSize;
      const y    = drops[i] * opts.fontSize;

      // Head of column — brighter white
      if (drops[i] > 0 && drops[i] < rows + 1) {
        const progress = drops[i] / rows;
        const opacity  = Math.max(0.1, 1 - progress * 0.7);

        // Head glow (white)
        ctx.fillStyle = `rgba(220, 240, 255, ${opacity})`;
        ctx.shadowColor = opts.color;
        ctx.shadowBlur  = 8;
        ctx.fillText(char, x, y);
        ctx.shadowBlur  = 0;

        // Body of column — cyan dim
        if (drops[i] > 2) {
          ctx.fillStyle = `rgba(0, 212, 255, ${opacity * 0.6})`;
          const bodyChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(bodyChar, x, y - opts.fontSize);
        }
      }

      // Reset column
      if (drops[i] * opts.fontSize > h && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += opts.speed;
    }
  }

  start() {
    const loop = () => {
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
    return this;
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  setOpacity(val) {
    if (this.canvas) {
      this.canvas.style.opacity = val;
    }
  }
}

// Export to global scope
window.CodeRain = CodeRain;
