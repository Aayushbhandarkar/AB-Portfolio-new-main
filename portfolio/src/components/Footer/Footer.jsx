import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./Footer.css";

function Footer() {
  const socialLinksRef = useRef(null);
  const timeRef = useRef(null);
  const scrollTopRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show/hide scroll top button only when footer is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      
      const footerRect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Footer visible hone pe hi arrow dikhega
      if (footerRect.top < windowHeight && footerRect.bottom > 0) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.from(socialLinksRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialLinksRef.current,
          start: "top 85%",
        },
      });

      // Scroll top button animation when it appears
      if (showScrollTop) {
        gsap.fromTo(scrollTopRef.current,
          {
            scale: 0,
            opacity: 0,
            rotation: -180
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          }
        );
      }
    });

    return () => ctx.revert();
  }, [showScrollTop]);

  return (
    <footer className="footer-section" aria-label="Footer section" ref={footerRef}>
      <div className="footer-container" ref={socialLinksRef}>
        <div className="footer-divider"></div>
        
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-heading">Menu</h3>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#services" className="footer-link">Services</a></li>
              <li><a href="#projects" className="footer-link">Works</a></li>
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Socials</h3>
            <ul className="footer-links">
              <li><a href="https://www.linkedin.com/in/ayush-bhandarkar-555730286/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="footer-link">LinkedIn</a></li>
            
              <li><a href="https://github.com/Aayushbhandarkar" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="footer-link">Github</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Certificates</h3>
            <ul className="footer-links">
              <li><a href="https://www.hackerrank.com/certificates/75dfca7ab52d" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="footer-link">HackerRank REST API</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-links">
              <li>
                <a href="mailto:ayushbhandarkar7@gmail.com" 
                   className="footer-link email-link">
                  ayushbhandarkar7@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917767934036" 
                   className="footer-link">
                  +91 7767934036
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="local-time" ref={timeRef}>
            LOCAL TIME
            <br />
            {new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12: true 
            }).toUpperCase()}, IST
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - ONLY SHOWS IN FOOTER */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn" 
          onClick={scrollToTop}
          ref={scrollTopRef}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}

export default React.memo(Footer);