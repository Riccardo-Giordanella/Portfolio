import { useState } from "react";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

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
      <div className="contact-title">
        <h2>Get in touch</h2>
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h3>Let's talk</h3>
          <p>
            I'm currently available to take on new projects. If you’re looking
            for a reliable developer to bring your ideas to life, I’d be happy
            to connect and explore how we might work together.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <i className="fa-regular fa-envelope"></i>{" "}
              <p>riccardogiordanella10@gmail.com</p>
            </div>
            <div className="contact-detail">
              <i className="fa-solid fa-phone"></i> <p>+39 0123456789</p>
            </div>
            <div className="contact-detail">
              <i className="fa-solid fa-location-dot"></i>{" "}
              <p>Italy, Vittoria(RG) 97019</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            id="name"
            autoComplete="name"
            required
          />
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            autoComplete="email"
            required
          />
          <label htmlFor="message">Write your message here</label>
          <textarea
            name="message"
            rows="8"
            placeholder="Enter your message"
            id="message"
            autoComplete="message"
            required
          />
          <button
            type="submit"
            className="contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Hourglass size="40" bgOpacity="0.1" speed="1.75" color="white" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
