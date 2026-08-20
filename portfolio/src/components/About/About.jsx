import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import ProfileImage from "../../assets/bannerpn.png";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const skillsSubHeadingRef = useRef(null);
  const linesRef = useRef([]);
  const titlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const skillsSubHeading = skillsSubHeadingRef.current;
      const devTitles = titlesRef.current;
      const lines = linesRef.current;
      const profileImage = imageRef.current;

      // Skills sub-heading animation
      if (skillsSubHeading) {
        gsap.from(skillsSubHeading, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsSubHeading,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }

      // Developer titles animation
      devTitles.forEach((title, index) => {
        if (title) {
          gsap.from(title, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Lines animation
      lines.forEach((line) => {
        if (line) {
          gsap.from(line, {
            scaleX: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Image animation
      if (profileImage) {
        gsap.from(profileImage, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileImage,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const skillsData = [
  {
    category: "Languages & Data",
    items: [
      "Java",
      "JavaScript",
      "C++",
      "PHP",
      "SQL",
      "MySQL",
      "MongoDB",
      "Git",
      "GitHub"
    ]
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "React.js",
      "Node.js",
      "Express.js",
      "Laravel",
      "Spring Boot",
      "Tailwind CSS",
      "Bootstrap",
      "GSAP",
      "Redux Toolkit",
      "React Router",
      "Mongoose",
      "Socket.io"
    ]
  },
  {
    category: "Tools & Concepts",
    items: [
      "Postman",
      "DSA",
      "OOP",
      "DBMS",
      "OS",
      "REST APIs",
      "Linux",
      "Docker",
      "Firebase",
      "WordPress",
      "IPv4",
      "IPv6",
      "DNS",
      "HTTP/HTTPS"
    ]
  }
];

  const developerTitles = ["DEVELOPER", "DESIGNER", "CREATOR /"];

  return (
    <div className="about-wrapper" ref={aboutRef} id="about">
      {/* STATIC "ABOUT ME" TITLE - NO ANIMATION */}
      <div className="about-big-title-wrapper">
        <h1 className="about-big-title">
          ABOUT ME
        </h1>
      </div>

      {/* MAIN GRID: LEFT BIG TITLES, RIGHT SKILLS */}
      <div className="about-main-grid">
        {/* LEFT SIDE - BIG DEVELOPER TITLES */}
        <div className="about-titles-left">
          <div className="developer-titles">
            {developerTitles.map((title, index) => (
              <h2 
                key={index}
                className={`developer-title ${title.includes('/') ? 'developer-title-slash' : ''}`}
                ref={el => titlesRef.current[index] = el}
              >
                {title}
              </h2>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - SKILLS SECTION */}
        <div className="skills-content-right">
          {/* SKILLS SUB-HEADING - BOLD AND CENTERED */}
          <h3 className="skills-sub-heading" ref={skillsSubHeadingRef}>
            SKILLS
          </h3>

          {/* SKILLS GRID - 3 COLUMNS */}
          <div className="skills-grid">
            {skillsData.map((skillGroup, index) => (
              <div key={index} className="skill-group">
                <h3 className="skill-category">{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-item-clean">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="line" ref={el => linesRef.current[0] = el}></div>

      {/* ABOUT DESCRIPTION WITH IMAGE - SIDE BY SIDE */}
      <div className="about-description-with-image">
        {/* LEFT CONTENT - DESCRIPTION */}
        <div className="description-content">
          <p className="description-text">
            I'm a software engineer driven by a passion for turning ideas into clean, intuitive digital experiences.
          </p>
          
          <div className="group-section">
            <p className="group-label">GROUP 201</p>
            <p className="group-description">
              My journey has been shaped by building real-world products, understanding systems at a deeper level, and creating experiences that feel effortless, fast, and intuitive. I love working across the stack—architecting clean, scalable backends, crafting thoughtful user interfaces, and transforming ideas into reliable, production-ready solutions.
            </p>
            <p className="group-description">
              Beyond code, I think in collaborative environments where ideas grow through discussions, creativity, and iteration. I believe in clarity, consistency, and building solutions that genuinely solve problems. Every project I work on reflects my focus on clean architecture, thoughtful design, and engineering that feels effortless to the user.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - PROFILE IMAGE */}
        <div className="description-image-right">
          <div className="profile-image-container">
            <img 
              ref={imageRef}
              src={ProfileImage} 
              alt="Ayush Bhandarkar" 
              className="profile-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
