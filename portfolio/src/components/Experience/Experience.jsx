import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";
import ResoluteLogo from "../../assets/resoluteAI.jpg";
// import GrinLogo from "../../assets/grinTechnologies.jpg"; // add this when you have the logo

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const expRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      expRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: expRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Animate each experience item
    if (itemsRef.current.length > 0) {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }
  }, []);

  const addToItemsRef = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const experiences = [
    {
      company: "Grin Technologies",
      role: "Associate Software Engineer",
      period: "Jun 2026 - Present",
      logo: null, // no logo yet, placeholder initials will show
      
      details: [
        "Designed and implemented RESTful APIs for core business operations including Leads, Cash Receipts, Reports, Clients, Categories, and EMI workflows.",
        "Built dashboards, authentication, role-based access, API integrations, database operations, and data-driven management modules.",
        "Handled end-to-end feature delivery including debugging, UAT fixes, performance improvements, and production-ready enhancements."
      ]
    },
    {
      company: "ResoluteAI Software",
      role: "Frontend Developer",
      period: "Dec 2025 - May 2026",
      logo: ResoluteLogo,
      description:
        "Built responsive web interfaces and frontend features for web applications, collaborated with the development team to implement UI components, integrate application services, and improve overall user experience and performance.",
      details: []
    }
  ];

  return (
    <section className="exp-wrapper" id="experience">
      <div className="exp-content" ref={expRef}>
        <h2 className="exp-title">Experience</h2>

        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="exp-item" 
            ref={addToItemsRef}
          >
            <div className="exp-header">
              <div className="exp-logo-box">
                {exp.logo ? (
                  <img src={exp.logo} alt={`${exp.company} Logo`} className="exp-logo" />
                ) : (
                  <span className="exp-logo-placeholder">
                    {exp.company
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )}
              </div>
              
              <div className="exp-info">
                <div className="exp-main">
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-company">{exp.company}</p>
                </div>
                <span className="exp-date">{exp.period}</span>
              </div>
            </div>

            <div className="exp-description">
              <p>{exp.description}</p>

              {exp.details && exp.details.length > 0 && (
                <ul className="exp-details">
                  {exp.details.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}