import "./Navbar.css";
import logo from "../assets/riccardo.png";
import { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import setupNavbarScroll from "../assets/navbarScroll.js";

export default function Navbar() {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["home", "about", "projects", "contact"];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setupNavbarScroll();
  }, []);

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />

      {/* Icona hamburger (mostrata solo se menu chiuso in mobile) */}
      {!isOpen && (
        <i
          className="fa-solid fa-bars nav-mob-open"
          style={{ color: "#ffffff" }}
          onClick={toggleMenu}
        />
      )}

      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
        {/* Icona chiudi (mostrata solo se menu aperto) */}
        {isOpen && (
          <i
            className="fa-solid fa-xmark nav-mob-close"
            style={{ color: "#ffffff" }}
            onClick={toggleMenu}
          />
        )}

        {navItems.map((item) => (
          <li
            key={item}
            className={menu === item ? "active" : ""}
            onClick={() => {
              setMenu(item);
              setIsOpen(false); // Chiude il menu dopo il click
            }}
          >
            <AnchorLink className="anchor-link" offset={50} href={`#${item}`}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </AnchorLink>
          </li>
        ))}
      </ul>

      <AnchorLink className="anchor-link" offset={50} href="#contact">
        <div className="nav-connect">Connect with me</div>
      </AnchorLink>
    </nav>
  );
}
