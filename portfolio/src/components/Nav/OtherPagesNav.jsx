import React, { useState, useEffect, useRef } from 'react';
import "./OtherPagesNav.css";
import { Link } from "react-scroll";

function OtherPagesNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Scroll prevention
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  // Menu items animation
  useEffect(() => {
    if (isMenuOpen && menuItemsRef.current) {
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          item.style.animation = `slideInRight 0.6s ease ${index * 0.1}s both`;
        }
      });
    } else {
      menuItemsRef.current.forEach((item) => {
        if (item) {
          item.style.animation = '';
        }
      });
    }
  }, [isMenuOpen]);

  const setMenuItemRef = (element, index) => {
    menuItemsRef.current[index] = element;
  };

  return (
    <>
      <nav className="otherPagesNav">
        {/* SIMPLE HAMBURGER - 2 LINES */}
        <div className="otherPages-mobile-menu-btn" onClick={toggleMenu}>
          <div className={`simple-hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Cream Background */}
      <div className={`otherPages-mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <div className="otherPages-mobile-menu-content" onClick={(e) => e.stopPropagation()} ref={menuRef}>
          
          {/* Animated Background Elements */}
          <div className="menu-bg-elements">
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            <div className="bg-blob blob-3"></div>
          </div>

          {/* Close Button - ANIMATED */}
          <div className="otherPages-close-btn" onClick={closeMenu}>
            <div className="close-icon">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Navigation Links - UPDATED ORDER: Home → About → Projects → Services → Experience → Contact */}
          <div className="nav-links-container">
            <ul className="otherPages-mobile-menu-list">
              {/* 1. Home */}
              <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
                <li ref={(el) => setMenuItemRef(el, 0)}>
                  <span className="menu-text">Home</span>
                </li>
              </Link>

              {/* 2. About */}
              <Link to="about" smooth={true} duration={500} onClick={closeMenu}>
                <li ref={(el) => setMenuItemRef(el, 1)}>
                  <span className="menu-text">About</span>
                </li>
              </Link>

              {/* 3. Projects */}
              <Link to="projects" smooth={true} duration={500} onClick={closeMenu}>
                <li ref={(el) => setMenuItemRef(el, 2)}>
                  <span className="menu-text">Works</span>
                </li>
              </Link>

              {/* 4. Services */}
              <Link to="services" smooth={true} duration={500} onClick={closeMenu}>
                <li ref={(el) => setMenuItemRef(el, 3)}>
                  <span className="menu-text">Services</span>
                </li>
              </Link>

              {/* 5. Experience */}
              <Link to="experience" smooth={true} duration={500} onClick={closeMenu}>
                <li ref={(el) => setMenuItemRef(el, 4)}>
                  <span className="menu-text">Experience</span>
                </li>
              </Link>

              {/* 6. Contact */}
              <Link to="contact" smooth={true} duration={500} onClick={closeMenu}>
                <li ref={(el) => setMenuItemRef(el, 5)}>
                  <span className="menu-text">Contact</span>
                </li>
              </Link>
            </ul>
          </div>

          {/* Contact Info with Fade In */}
          <div className="otherPages-contact-info" ref={(el) => setMenuItemRef(el, 6)}>
            <div className="contact-email">
              <h4>EMAIL ADDRESS</h4>
              <p>ayushbhandarkar7@gmail.com</p>
            </div>
            
            <div className="social-links">
              <h4>CONNECT</h4>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/ayush-bhandarkar-555730286/" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/Aayushbhandarkar" target="_blank" rel="noopener noreferrer">
                  <span>Github</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default OtherPagesNav;