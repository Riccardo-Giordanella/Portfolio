import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <section className="footer-top">
        <div className="footer-top-left">
          <p>
            I'm a Front/back end developer from Italy, with 2 years of
            experience
          </p>
        </div>
        <div className="footer-top-right">
          <div className="footer-email-input">
            <i className="fa-solid fa-user"></i>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="footer-subscribe">Subscribe</div>
        </div>
      </section>
      <hr />
      <section className="footer-bottom">
        <p className="footer-bottom-left">
          © 2025 Riccardo Giordanella. All rights reserved.
        </p>
        <div className="footer-bottom-right">
          <p>Term of services</p>
          <p>Privacy policy</p>
          <p>Connect with me</p>
        </div>
      </section>
    </footer>
  );
}
