import "./Contact.css";

export default function Contact() {
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
        <form className="contact-right">
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" id="name" autoComplete="name" />
          <label htmlFor="email">Your Email</label>
          <input type="email" placeholder="Enter your email" name="email" id="email" autoComplete="email" />
          <label htmlFor="message">Write your message here</label>
          <textarea name="message" rows="8" placeholder="Enter your message" id="message" autoComplete="message" />
          <button type="submit" className="contact-submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
