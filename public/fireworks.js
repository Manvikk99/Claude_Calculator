// Lightweight canvas fireworks. Exposes window.Fireworks.celebrate().
(function (root) {
  let canvas, ctx, particles = [], running = false, width = 0, height = 0;

  // --- Sound: play the imported celebration clip. ---
  const crackerSound = new Audio("sounds/faaah.mp3");
  crackerSound.preload = "auto";

  function playCracker() {
    crackerSound.currentTime = 0;
    crackerSound.play().catch(() => {}); // ignore autoplay-block errors
  }

  function init() {
    canvas = document.getElementById("fireworks");
    if (!canvas) return false;
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
    return true;
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  const COLORS = ["#ff9f43", "#1dd1a1", "#ff6b6b", "#54a0ff", "#feca57", "#ff9ff3"];

  // Spawn a burst of particles from a point.
  function burst(x, y) {
    const count = 36 + Math.floor((x % 1) * 0); // deterministic-ish count
    const color = COLORS[Math.floor((x + y) % COLORS.length)];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 2 + (i % 5);
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: COLORS[i % COLORS.length] || color,
      });
    }
  }

  function tick() {
    if (!running) return;
    // fade trail
    ctx.fillStyle = "rgba(30, 30, 47, 0.18)";
    ctx.fillRect(0, 0, width, height);

    let alive = false;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;        // gravity
      p.vx *= 0.99;
      p.life -= 0.018;

      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (alive) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      particles = [];
      ctx.clearRect(0, 0, width, height);
    }
  }

  function celebrate() {
    if (!canvas && !init()) return;
    playCracker();
    // a few bursts at varied spots near the top
    const spots = [
      [width * 0.3, height * 0.35],
      [width * 0.5, height * 0.25],
      [width * 0.7, height * 0.4],
    ];
    spots.forEach(([x, y]) => burst(x, y));
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  root.Fireworks = { celebrate };
})(window);
