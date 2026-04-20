import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-big-word" aria-hidden="true">
        Riccardo
      </div>

      <div className="footer-top">
        <div className="footer-top-left">
          <p className="footer-tagline">
            Front/back end developer from <em>Italy</em> with 2+ years of experience.
          </p>
          <p className="footer-subtagline">
            Available for freelance work and full-time opportunities.
          </p>
        </div>

        <form className="footer-top-right" onSubmit={handleSubscribe}>
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="footer-email-input">
            <FontAwesomeIcon icon={faUser} />
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="footer-subscribe">
            Subscribe
          </button>
        </form>
      </div>

      <hr />

      <div className="footer-bottom">
        <p className="footer-bottom-left">
          © 2025 Riccardo Giordanella. Crafted with care.
        </p>
        <div className="footer-bottom-right">
          <button type="button" className="footer-link">Terms of service</button>
          <AnchorLink href="#contact" className="footer-link">
            Connect with me
          </AnchorLink>
        </div>
      </div>
    </footer>
  );
}
