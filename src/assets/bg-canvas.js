window.onload = function () {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  // Imposta dimensioni canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particelle
  const particles = [];
  const numParticles = 100;

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      // Rimbalzo ai bordi
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
};
