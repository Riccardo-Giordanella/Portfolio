import "./Navbar.css";
import logo from "../assets/riccardo.png";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = ["home", "about", "services", "projects"];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open (CSS applies only < 900px)
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("menu-open");
    } else {
      document.documentElement.classList.remove("menu-open");
    }
    return () => {
      document.documentElement.classList.remove("menu-open");
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} role="navigation">
      <div className="navbar-inner">
        <a href="#home" className="navbar-logo" aria-label="Home">
          <img src={logo} alt="Riccardo Giordanella logo" />
        </a>

        {/* Desktop menu */}
        <ul className="nav-menu nav-menu--desktop">
          {navItems.map((item) => (
            <li
              key={item}
              className={menu === item ? "active" : ""}
              onClick={() => setMenu(item)}
            >
              <AnchorLink className="anchor-link" offset={60} href={`#${item}`}>
                <span className="nav-index">0{navItems.indexOf(item) + 1}</span>
                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              </AnchorLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <AnchorLink className="anchor-link nav-cta-link" offset={60} href="#contact">
          <button className="nav-connect" type="button">
            <span>Let's talk</span>
            <span className="nav-connect-dot" aria-hidden="true"></span>
          </button>
        </AnchorLink>

        {/* Mobile hamburger - shown only under mobile breakpoint */}
        <button
          className="nav-mob-open"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={isOpen}
          type="button"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Mobile drawer - rendered as body child via Portal to escape any ancestor stacking context */}
      {createPortal(
        <>
          <div
            className={`nav-mob-backdrop ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <aside className={`nav-mob-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
            <button
              className="nav-mob-close"
              onClick={toggleMenu}
              aria-label="Close menu"
              type="button"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <ul className="nav-menu nav-menu--mobile">
              {navItems.map((item, i) => (
                <li
                  key={item}
                  className={menu === item ? "active" : ""}
                  style={{ "--delay": `${i * 80}ms` }}
                  onClick={() => {
                    setMenu(item);
                    setIsOpen(false);
                  }}
                >
                  <AnchorLink className="anchor-link" offset={60} href={`#${item}`}>
                    <span className="nav-index">0{navItems.indexOf(item) + 1}</span>
                    <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  </AnchorLink>
                </li>
              ))}
            </ul>

            <AnchorLink
              className="anchor-link"
              offset={60}
              href="#contact"
              onClick={() => setIsOpen(false)}
            >
              <button className="nav-connect nav-connect--mobile" type="button">
                <span>Let's talk</span>
                <span className="nav-connect-dot" aria-hidden="true"></span>
              </button>
            </AnchorLink>
          </aside>
        </>,
        document.body
      )}
    </nav>
  );
}
