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
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';

function App() {
  const [showWhiteNav, setShowWhiteNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setShowWhiteNav(true);
      } else {
        setShowWhiteNav(false);
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

      {/* ABOUT */}
      <div id="about">
        <About />
      </div>

      {/* EXPERIENCE */}
      <div id="experience">
        <Experience />
      </div>

      {/* PROJECTS */}
      <div id="projects">
        <Project />
      </div>

      {/* SERVICES */}
      <div id="services">
        <Services />
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
