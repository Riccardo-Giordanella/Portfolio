import "./Services.css";
import SERVICES_DATA from "../assets/services_data";
import { useRef } from "react";

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -6;
    const ry = ((x - cx) / cx) * 6;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  return (
    <article
      ref={cardRef}
      className="services-format"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="services-card-shine" aria-hidden="true" />
      <div className="services-number" aria-hidden="true">
        0{index + 1}
      </div>
      <h3 className="services-format-title">{service.title}</h3>
      <p>{service.description}</p>
      <div className="services-arrow" aria-hidden="true">
        →
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services-title">
        <span className="section-eyebrow">What I do</span>
        <h2 className="section-heading">
          My <em>services</em>
        </h2>
      </div>
      <div className="services-container">
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
