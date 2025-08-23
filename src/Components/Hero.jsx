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
      strings: ["Front-end", "Back-end"],
      typeSpeed: 90,
      typeBackSpeed: 10,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }

      requestAnimationFrame(drawParticles);
    }

    drawParticles();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <header id="home" className="hero" role="banner">
      <canvas ref={canvasRef} id="bgCanvas"></canvas>
      <img src={profile_pic} alt="Profile" className="profile-pic" />
      <h1>
        <span>I'm Riccardo Giordanella,</span>
        <br /> a <span ref={el}></span>
        <br /> developer based in Italy
      </h1>
      <p>
        I'm a passionate developer with a knack for creating stunning web
        applications.
      </p>
      <div className="hero-action">
        <AnchorLink className="anchor-link" offset={50} href="#contact">
          <div className="hero-connect">Connect with me</div>
        </AnchorLink>
        <a
          href="https://www.linkedin.com/in/riccardo-giordanella-173195197/"
          target="_blank"
        >
          <div className="hero-resume">View my resume</div>
        </a>
      </div>
    </header>
  );
}
