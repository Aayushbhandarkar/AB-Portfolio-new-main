import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./Card.css"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Card({ title, image, index = 0 }) {
  const cardRef = useRef(null);
  const hoverCardRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation with scroll trigger
      gsap.fromTo(cardRef.current,
        {
          y: 100,
          opacity: 0,
          rotationX: -15,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            once: true
          }
        }
      );

      // Title animation with subtle glow effect
      gsap.fromTo(titleRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5 + index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous subtle floating animation
      gsap.to(cardRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });

      // Hover card slide-up animation preparation
      gsap.set(hoverCardRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9
      });

      // Image animation for hover card
      gsap.set(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        rotation: 5
      });

    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // Hover animations using GSAP for smoother effects
  const handleMouseEnter = () => {
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      y: -15,
      scale: 1.02,
      boxShadow: "0 15px 40px rgba(87, 195, 219, 0.4)",
      duration: 0.4,
      ease: "power2.out"
    })
    .to(hoverCardRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out"
    }, 0)
    .to(imageRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.5)"
    }, 0.2)
    .to(titleRef.current, {
      y: -10,
      opacity: 0.7,
      duration: 0.3,
      ease: "power2.out"
    }, 0);
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "2px 2px 10px black, 2px 2px 20px black",
      duration: 0.5,
      ease: "power2.out"
    })
    .to(hoverCardRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in"
    }, 0)
    .to(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      rotation: 5,
      duration: 0.3
    }, 0)
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, 0);
  };

  return (
    <div 
      className='card' 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <h1 ref={titleRef}>{title}</h1>
        <div className="hovercard" ref={hoverCardRef}>
            <img src={image} alt={title} ref={imageRef} />
        </div>
    </div>
  )
}

export default Card