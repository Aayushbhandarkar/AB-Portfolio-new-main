import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import gsap from "gsap";
import "./Nav.css";

function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const roleRef = useRef(null);
  const menuItemsRef = useRef([]);
  const hamburgerRef = useRef(null);
  const roleLettersRef = useRef([]);

  // Add menu items to array for animation
  const addToMenuItems = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  // Add role letters to array for animation
  const addToRoleLetters = (el) => {
    if (el && !roleLettersRef.current.includes(el)) {
      roleLettersRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 }); // Small delay after home animation

    // Nav container slide down
    tl.fromTo(navRef.current, 
      { 
        opacity: 0,
        y: -50
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    )
    // Role text typewriter effect
    .fromTo(roleLettersRef.current,
      { 
        opacity: 0,
        x: -10,
        scale: 0.8
      },
      { 
        opacity: 0.75,
        x: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "back.out(1.4)"
      },
      "-=0.4"
    )
    // Menu items staggered animation
    .fromTo(menuItemsRef.current,
      { 
        opacity: 0,
        y: -15
      },
      { 
        opacity: 0.75,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.2)"
      },
      "-=0.3"
    )
    // Hamburger fade in
    .fromTo(hamburgerRef.current,
      { 
        opacity: 0,
        scale: 0.8
      },
      { 
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      },
      "-=0.2"
    );

    // Mobile menu animation
    if (open) {
      gsap.fromTo(".mobile-minimal-menu",
        { 
          y: -100,
          opacity: 0
        },
        { 
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        }
      );
    }

  }, [open]);

  // Split role text into individual letters for animation
  const roleText = "Full-Stack   Developer";
  const roleParts = roleText.split('').map((letter, index) => {
    if (letter === '-') {
      return (
        <span key={index} className="role-hyphen">
          {letter}
        </span>
      );
    }
    return (
      <span 
        key={index} 
        ref={addToRoleLetters}
        className="role-letter"
      >
        {letter}
      </span>
    );
  });

  return (
    <>
      {/* TOP INVISIBLE NAVBAR */}
      <nav className="nav-invisible" ref={navRef}>
        <p className="nav-role" ref={roleRef}>
          {roleParts}
        </p>

        {/* Desktop Menu - UPDATED ORDER */}
        <ul className="nav-menu">
          {/* 1. Home */}
          <Link to="home" smooth={true} duration={600} offset={-50}>
            <li ref={addToMenuItems}>Home</li>
          </Link>

          {/* 2. About */}
          <Link to="about" smooth={true} duration={600} offset={-50}>
            <li ref={addToMenuItems}>About</li>
          </Link>

          {/* 3. Projects */}
          <Link to="projects" smooth={true} duration={600} offset={-50}>
            <li ref={addToMenuItems}>Projects</li>
          </Link>

          {/* 4. Services */}
          <Link to="services" smooth={true} duration={600} offset={-50}>
            <li ref={addToMenuItems}>Services</li>
          </Link>

          {/* 5. Experience */}
          <Link to="experience" smooth={true} duration={600} offset={-50}>
            <li ref={addToMenuItems}>Experience</li>
          </Link>

          {/* 6. Contact */}
          <Link to="contact" smooth={true} duration={600} offset={-50}>
            <li ref={addToMenuItems}>Contact</li>
          </Link>

          <li
            className="resumeNav"
            onClick={() => window.open("Ayush_Bhandarkar_Resume (1).pdf", "_blank")}
            ref={addToMenuItems}
          >
            Resume
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="hamburger-mini" onClick={() => setOpen(!open)} ref={hamburgerRef}>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU - UPDATED ORDER */}
      <div className={`mobile-minimal-menu ${open ? "show" : ""}`}>
        {/* Close Button - Only this added */}
        <div className="close-btn" onClick={() => setOpen(false)}>
          ×
        </div>
        
        <ul>
          {/* 1. Home */}
          <Link to="home" smooth={true} duration={600} offset={-50} onClick={() => setOpen(false)}>
            <li>Home</li>
          </Link>

          {/* 2. About */}
          <Link to="about" smooth={true} duration={600} offset={-50} onClick={() => setOpen(false)}>
            <li>About</li>
          </Link>

          {/* 3. Projects */}
          <Link to="projects" smooth={true} duration={600} offset={-50} onClick={() => setOpen(false)}>
            <li>Projects</li>
          </Link>

          {/* 4. Services */}
          <Link to="services" smooth={true} duration={600} offset={-50} onClick={() => setOpen(false)}>
            <li>Services</li>
          </Link>

          {/* 5. Experience */}
          <Link to="experience" smooth={true} duration={600} offset={-50} onClick={() => setOpen(false)}>
            <li>Experience</li>
          </Link>

          {/* 6. Contact */}
          <Link to="contact" smooth={true} duration={600} offset={-50} onClick={() => setOpen(false)}>
            <li>Contact</li>
          </Link>

          <li onClick={() => { window.open("Ayush_Bhandarkar_Resume (2).pdf", "_blank"); setOpen(false); }}>
            Resume
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
