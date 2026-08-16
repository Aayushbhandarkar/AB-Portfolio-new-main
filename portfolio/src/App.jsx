import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import OtherPagesNav from './components/Nav/OtherPagesNav';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Project from './components/Projects/Project';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';  // ✅ NEW

function App() {
  const [showWhiteNav, setShowWhiteNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setShowWhiteNav(true);    // HOME — White nav
      } else {
        setShowWhiteNav(false);   // Other pages — Circle nav
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 return (
  <>
    {/* NAV DEPENDS ON SCROLL */}
    {showWhiteNav ? <Nav /> : <OtherPagesNav />}

    {/* HOME */}
    <div id="home">
      <Home />
    </div>

    {/* ABOUT NOW COMES 2ND */}
    <div id="about">
      <About />
    </div>

    {/* PROJECT NOW COMES 3RD */}
    <div id="projects">
      <Project />
    </div>

    {/* SERVICES NOW COMES AFTER PROJECT */}
    <div id="services">
      <Services />
    </div>

    {/* EXPERIENCE */}
    <div id="experience">
      <Experience />
    </div>

    {/* CONTACT */}
    <div id="contact">
      <Contact />
    </div>

    <Footer />

    {/* ALWAYS VISIBLE VOICE BTN */}
    <VoiceAssistant />
  </>
);

}

export default App;