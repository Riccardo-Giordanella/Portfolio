import { useEffect, useRef } from "react";
import profile_pic from "../assets/riccardo_2.jpg";
import "./Hero.css";
import Typed from "typed.js";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function Hero() {
  const el = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Front-end", "Back-end", "Full-stack"],
      typeSpeed: 90,
      backSpeed: 40,
      backDelay: 1400,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  useEffect(() => {
    // Skip particle canvas on mobile - saves CPU and avoids mobile viewport resize loops
    if (window.innerWidth < 900) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    const numParticles = 70;
    const colors = ["#ff3d7f", "#ffb84d", "#00e5c7"];

    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(255, 61, 127, ${(1 - dist / 130) * 0.08})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w()) p.dx *= -1;
        if (p.y < 0 || p.y > h()) p.dy *= -1;
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <header id="home" className="hero" role="banner">
      <canvas ref={canvasRef} id="bgCanvas" aria-hidden="true" />

      {/* Floating decorative labels */}
      <div className="hero-float hero-float--1" aria-hidden="true">
        <span className="hero-float-dot" /> available for new projects
      </div>
      <div className="hero-float hero-float--2" aria-hidden="true">
        ~/ based in Italy
      </div>
      <div className="hero-float hero-float--3" aria-hidden="true">
        ★ 2+ years of experience
      </div>

      <div className="hero-inner">
        <div className="hero-avatar-wrap">
          <div className="hero-avatar-glow" aria-hidden="true" />
          <img src={profile_pic} alt="Riccardo Giordanella" className="hero-avatar" />
          <div className="hero-avatar-badge" aria-hidden="true">
            <span>👋</span>
          </div>
        </div>

        <h1 className="hero-title">
          <span className="word word--1">I'm</span>{" "}
          <span className="word word--2 hero-name">Riccardo,</span>
          <br />
          <span className="word word--3">a</span>{" "}
          <span className="word word--4 hero-role">
            <span ref={el} />
          </span>
          <br />
          <span className="word word--5">developer</span>{" "}
          <span className="word word--6 hero-brushed">crafting the web</span>
        </h1>

        <p className="hero-sub">
          Building delightful, functional web experiences where <em>design</em> and <em>code</em> meet.
        </p>

        <div className="hero-action">
          <AnchorLink className="anchor-link" offset={60} href="#contact">
            <button className="btn-primary">
              <span className="btn-label">Connect with me</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </AnchorLink>

          <a
            href="https://www.linkedin.com/in/riccardo-giordanella-173195197/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-ghost">
              <span>View my resume</span>
              <span className="btn-arrow-up" aria-hidden="true">↗</span>
            </button>
          </a>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <span>scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </header>
  );
}
