import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

function Preloader({ isLoaded }) {
  const barRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      barRef.current,
      { width: "0%" },
      { width: "100%", duration: 0.5 }
    )
      .to(barRef.current, { x: "100%", duration: 0.5 })
      .to(barRef.current, { opacity: 0, duration: 0.2 }, "-=0.3")

      // THE REAL FIX (removes preloader instantly)
      .set(wrapperRef.current, {
        opacity: 0,
        visibility: "hidden",
        display: "none",
      });
  }, [isLoaded]);

  return (
    <div className="apple-preloader-wrapper" ref={wrapperRef}>
      <div className="apple-bar" ref={barRef}></div>
    </div>
  );
}

export default Preloader;
