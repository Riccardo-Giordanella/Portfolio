import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import MyWork from "./Components/MyWork";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import FadeInSection from "./Components/FadeInSection";

export default function App() {
  return (
    <>
      <Navbar />
      <FadeInSection><Hero /></FadeInSection>
      <FadeInSection><About /></FadeInSection>
      <FadeInSection><Services /></FadeInSection>
      <FadeInSection><MyWork /></FadeInSection>
      <FadeInSection><Contact /></FadeInSection>
      <FadeInSection><Footer /></FadeInSection>
    </>
  );
}
