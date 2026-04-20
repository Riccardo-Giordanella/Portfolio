import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import MyWork from "./Components/MyWork";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import FadeInSection from "./Components/FadeInSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: "#1c1c26",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "14px",
          fontFamily: "'Outfit', sans-serif",
        }}
        style={{ zIndex: 9999 }}
      />

      <Navbar />
      <Hero />
      <main role="main">
        <FadeInSection>
          <About />
        </FadeInSection>
        <FadeInSection>
          <Services />
        </FadeInSection>
        <FadeInSection>
          <MyWork />
        </FadeInSection>
        <FadeInSection>
          <Contact />
        </FadeInSection>
      </main>
      <FadeInSection>
        <Footer />
      </FadeInSection>
    </>
  );
}
