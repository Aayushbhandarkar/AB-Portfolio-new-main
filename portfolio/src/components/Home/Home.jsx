import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Home.css";

function Home() {
  const homeWrapperRef = useRef(null);
  const mainNameRef = useRef(null);
  const thinArrowRef = useRef(null);
  const newDescRef = useRef(null);
  const newContactBtnRef = useRef(null);
  const availableRef = useRef(null);
  const robotRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRobotClick = () => {
    const messages = [
      "Full Stack Developer • Creative Problem Solver",
      "Available for opportunities worldwide",
      "Let's create something extraordinary",
      "Precision meets innovation",
      "Crafting digital excellence"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    
    // Jump animation
    if (robotRef.current) {
      gsap.to(robotRef.current, {
        y: -25,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
    
    setTimeout(() => {
      setShowMessage(false);
    }, 2500);
  };

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set([mainNameRef.current, thinArrowRef.current, newDescRef.current, newContactBtnRef.current, availableRef.current, robotRef.current], {
      opacity: 0,
      y: 0,
      x: 0
    });

    tl.fromTo(mainNameRef.current, 
      { opacity: 0, y: 100, scale: 1.1 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "expo.out" }
    )
    .fromTo(thinArrowRef.current,
      { opacity: 0, scale: 0, rotation: -45 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1.2, 0.5)" },
      "-=0.8"
    )
    .fromTo(newDescRef.current,
      { opacity: 0, y: 40 },
      { opacity: 0.85, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(newContactBtnRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(availableRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(robotRef.current,
      { opacity: 0, scale: 0.8, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "expo.out" },
      "-=0.5"
    );

    const btn = newContactBtnRef.current;
    if (btn) {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { y: -2, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    }

    gsap.to(thinArrowRef.current, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Continuous robot floating animation
    gsap.to(robotRef.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <div className="home-wrapper" ref={homeWrapperRef}>
      <h1 className="main-name" ref={mainNameRef}>
        AYUSH <br /> BHANDARKAR
      </h1>

      <div className="thin-arrow" ref={thinArrowRef}>↘</div>

      <div className="left-box">
        <p className="desc new-desc" ref={newDescRef}>
          Open to job opportunities worldwide.
          <br />
         I design clean and easy-to-use web applications.
        </p>

        <button
          className="contact-btn new-contact-btn"
          onClick={scrollToContact}
          ref={newContactBtnRef}
        >
          CONTACT ↗
        </button>
      </div>

      {/* Minimalist Robot */}
      <div className="robot-minimal" ref={robotRef} onClick={handleRobotClick}>
        <div className="robot-container">
          {/* Head */}
          <div className="robot-head-minimal">
            <div className="robot-visor">
              <div className="visor-line"></div>
            </div>
            <div className="robot-eyes">
              <div className="eye-left"></div>
              <div className="eye-right"></div>
            </div>
          </div>
          
          {/* Neck */}
          <div className="robot-neck"></div>
          
          {/* Body */}
          <div className="robot-body-minimal">
            <div className="body-core"></div>
            <div className="energy-core"></div>
          </div>
          
          {/* Arms */}
          <div className="robot-arms-minimal">
            <div className="arm-left">
              <div className="arm-segment"></div>
            </div>
            <div className="arm-right">
              <div className="arm-segment"></div>
            </div>
          </div>
          
          {/* Legs */}
          <div className="robot-legs-minimal">
            <div className="leg-left"></div>
            <div className="leg-right"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>
      </div>

      {/* Message Bubble */}
      {showMessage && (
        <div className="bubble-message">
          <div className="bubble-content">{message}</div>
          <div className="bubble-arrow"></div>
        </div>
      )}

      <div className="available" ref={availableRef}>
        <p className="small-availability">AVAILABLE FOR WORK</p>
        <p className="big-availability">OCT'25</p>
      </div>
    </div>
  );
}

export default Home;