import { useState } from "react";
import "./Contact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending");

    const formData = new FormData(event.target);
    formData.append("access_key", "d6e1f5d4-f185-4b6e-8abd-31f670ec2438");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        toast.success("✅ Messaggio inviato con successo!");
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        toast.error("❌ Errore: " + data.message);
        setResult(data.message);
      }
    } catch (error) {
      toast.error("❌ Errore di rete. Riprova.");
      console.error("Errore durante l'invio:", error);
      setResult("Invio fallito. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-header">
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-heading">
          Let's <em>build</em> something together
        </h2>
      </div>

      <div className="contact-section">
        <div className="contact-left">
          <p className="contact-intro">
            I'm currently <span className="contact-available">
              <span className="contact-available-dot" />available
            </span> to take on new projects. If you're looking for a reliable developer
            to bring your ideas to life, I'd be happy to connect.
          </p>

          <ul className="contact-details">
            <li className="contact-detail">
              <span className="contact-icon">
                <FontAwesomeIcon icon={faLinkedin} />
              </span>
              <a
                href="https://www.linkedin.com/in/riccardo-giordanella-173195197/"
                target="_blank"
                rel="noopener noreferrer"
                className="anchor-link-contact"
              >
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">My linkedin profile</span>
              </a>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </li>
            <li className="contact-detail">
              <span className="contact-icon">
                <FontAwesomeIcon icon={faGithub} />
              </span>
              <a
                href="https://github.com/Riccardo-Giordanella"
                target="_blank"
                rel="noopener noreferrer"
                className="anchor-link-contact"
              >
                <span className="contact-label">GitHub</span>
                <span className="contact-value">My github profile</span>
              </a>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </li>
            <li className="contact-detail">
              <span className="contact-icon">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <div className="contact-static">
                <span className="contact-label">Location</span>
                <span className="contact-value">Italy, Vittoria (RG) 97019</span>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="contact-right">
          <div className="form-field">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              placeholder=" "
            />
            <label htmlFor="name">Your name</label>
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              placeholder=" "
            />
            <label htmlFor="email">Your email</label>
          </div>

          <div className="form-field">
            <textarea
              name="message"
              id="message"
              rows="6"
              required
              placeholder=" "
            />
            <label htmlFor="message">Your message</label>
          </div>

          <button
            type="submit"
            className="contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>{result}</span>
                <Hourglass size="20" bgOpacity="0.1" speed="1.75" color="#0d0d12" />
              </>
            ) : (
              <>
                <span>Send message</span>
                <span className="contact-submit-arrow" aria-hidden="true">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
