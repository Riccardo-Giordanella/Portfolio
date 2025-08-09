import { useEffect, useRef } from "react";
import profile_pic from "../assets/riccardo_2.jpg";
import "./Hero.css";
import Typed from "typed.js";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function Hero() {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Front-end", "Back-end"],
      typeSpeed: 90,
      typeBackSpeed: 10,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <header id="home" className="hero">
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
        <div className="hero-resume">View my resume</div>
      </div>
    </header>
  );
}
