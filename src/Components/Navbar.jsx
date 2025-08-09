import "./Navbar.css";
import logo from "../assets/riccardo.png";
import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function Navbar() {
  const [menu, setMenu] = useState("home");

  const navItems = ["home", "about", "projects", "contact"];

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="nav-menu">
        {navItems.map((item) => (
          <AnchorLink className="anchor-link" offset={50} href={`#${item}`}>
            <li
              key={item}
              className={menu === item ? "active" : ""}
              onClick={() => setMenu(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          </AnchorLink>
        ))}
      </ul>
      <AnchorLink className="anchor-link" offset={50} href="#contact"><div className="nav-connect">Connect with me</div></AnchorLink>
    </nav>
  );
}
