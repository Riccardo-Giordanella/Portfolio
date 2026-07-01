import { lazy, Suspense, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import MyWork from "./Components/MyWork";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import FadeInSection from "./Components/FadeInSection";
import BootIntro from "./Components/CodeEditor/BootIntro";
import useHashRoute from "./hooks/useHashRoute";
import { prefersReducedMotion } from "./hooks/useTypewriter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Components/CodeEditor/CodeEditor.css";
import "./App.css";

// Full-page "IDE mode" is heavy and opt-in, so load it only when opened.
const CodeEditor = lazy(() => import("./Components/CodeEditor/CodeEditor"));

export default function App() {
  const editor = useHashRoute("#editor");

  // Cinematic boot intro plays once per session on first load, and is skipped
  // for users who prefer reduced motion.
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("introSeen") && !prefersReducedMotion();
    } catch {
      return true;
    }
  });

  const enterSite = () => {
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  };

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

      {!editor.active && !showIntro && (
        <button
          className="ide-launch"
          onClick={editor.open}
          aria-label="View portfolio source in editor mode"
        >
          <span className="ide-launch-glyph">&lt;/&gt;</span>
          <span>dev mode</span>
        </button>
      )}

      {editor.active && (
        <Suspense fallback={null}>
          <CodeEditor onClose={editor.close} />
        </Suspense>
      )}

      {showIntro && <BootIntro onEnter={enterSite} />}
    </>
  );
}
