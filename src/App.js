import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import emailjs from 'emailjs-com';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });
    }

    // Handle scroll events and active link highlighting
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Active Link Highlighting
      const sections = document.querySelectorAll('section');
      const navItems = document.querySelectorAll('.nav-links a');
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight; 
        if (window.pageYOffset >= sectionTop - 300) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  const techStackRef = useRef(null);
  const frontendCardRef = useRef(null);
  const backendCardRef = useRef(null);
  const toolsCardRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (techStackRef.current) {
      gsap.fromTo(techStackRef.current.querySelector('h2'), 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 80%", 
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(frontendCardRef.current, 
        { opacity: 0, x: -100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 70%", 
            end: "top 40%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(backendCardRef.current, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 60%", 
            end: "top 30%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(toolsCardRef.current, 
        { opacity: 0, x: 100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 50%", 
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Floating animation for hero section
    gsap.to(".floating-shape", {
      y: "20px",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Page transition animation
    const pageTransition = () => {
      const tl = gsap.timeline();
      tl.to(".page-transition", {
        scaleY: 1,
        transformOrigin: "top",
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to(".page-transition", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.1
      });
    };

    // Add transition on section change
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        pageTransition();
        setTimeout(() => {
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        }, 500);
      });
    });

    // Parallax effect for About Me section
    if (aboutSectionRef.current) {
      gsap.to(aboutSectionRef.current.querySelector('.about-text'), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(aboutSectionRef.current.querySelector('.about-image'), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);
    emailjs.send(
      'service_j1007nu',
      'template_o9xi7zm',
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      'zJEI6kK2WLvstwFCM'
    )
      .then(() => {
        setSending(false);
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setSending(false);
        setSuccess('Failed to send message. Please try again later.');
      });
  };

  return (
    <div>
      {/* Page Transition Overlay */}
      <div className="page-transition"></div>

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <svg className="floating-shape" viewBox="0 0 100 100" width="50" height="50">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--neon-blue)" strokeWidth="2">
            <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
        <svg className="floating-shape" viewBox="0 0 100 100" width="30" height="30">
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="var(--neon-mint)" strokeWidth="2">
            <animate attributeName="rotate" values="0;360" dur="10s" repeatCount="indefinite" />
          </rect>
        </svg>
        <svg className="floating-shape" viewBox="0 0 100 100" width="40" height="40">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="var(--neon-purple)" strokeWidth="2">
            <animate attributeName="points" values="50,10 90,90 10,90;50,90 90,10 10,10;50,10 90,90 10,90" dur="5s" repeatCount="indefinite" />
          </polygon>
        </svg>
      </div>

      {/* Header */}
      <header>
          <div className="container">
              <nav className="main-nav">
                  <div className="logo-container">
                      <div className="logo" id="main-logo">
                          <span className="logo-text">Portfo</span>
                          <span className="logo-highlight">lio</span>
                      </div>
                      <div className="logo-glow"></div>
                  </div>
                  
                  <ul className="nav-links">
                      <li className="nav-item">
                          <a href="#hero" className="nav-link active">
                              <i className="fas fa-home"></i>
                              <span>Home</span>
                          </a>
                      </li>
                      <li className="nav-item">
                          <a href="#about" className="nav-link">
                              <i className="fas fa-user"></i>
                              <span>About</span>
                          </a>
                      </li>
                      <li className="nav-item">
                          <a href="#education" className="nav-link">
                              <i className="fas fa-graduation-cap"></i>
                              <span>Education</span>
                          </a>
                      </li>
                      <li className="nav-item">
                          <a href="#projects" className="nav-link">
                              <i className="fas fa-code"></i>
                              <span>Projects</span>
                          </a>
                      </li>
                      <li className="nav-item">
                          <a href="#tech-stack" className="nav-link">
                              <i className="fas fa-layer-group"></i>
                              <span>Skills</span>
                          </a>
                      </li>
                      <li className="nav-item">
                          <a href="#contact" className="nav-link">
                              <i className="fas fa-envelope"></i>
                              <span>Contact</span>
                          </a>
                      </li>
                  </ul>

                  <div className="nav-actions">
                      <button onClick={toggleTheme} className="theme-toggle">
                          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                      </button>
                      <a href="satyam resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-file-alt"></i>
                          <span>Resume</span>
                      </a>
                  </div>

                  <div className="menu-toggle">
                      <div className="hamburger">
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                  </div>
              </nav>
          </div>
      </header>

      {/* Hero Section with Animated Background */}
      <section id="hero">
        <div className="hero-pattern">
          <div className="animated-bg">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="var(--neon-blue)" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.4,-0.3C88.8,15.7,85,31.3,77.1,45.8C69.2,60.3,57.2,73.6,42.8,79.6C28.4,85.6,11.7,84.3,-3.9,89.2C-19.5,94.1,-38.9,105.2,-54.4,99.8C-69.9,94.4,-81.4,72.5,-85.8,49.8C-90.2,27.1,-87.5,3.6,-83.6,-18.4C-79.7,-40.4,-74.6,-60.9,-63.1,-67.9C-51.6,-74.9,-33.7,-68.4,-19.8,-61.8C-5.9,-55.2,4,-48.5,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Hello, I'm <span>SATYAM AGRAHARI</span></h1>
              <h3>Full Stack Developer & UI Enthusiast</h3>
              <p>I build scalable web apps from front to back using modern frameworks.</p>
              <div className="hero-btns">
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Hire Me</a>
              </div>
            </div>
            <div className="hero-svg">
              <svg viewBox="0 0 800 600" className="dev-flow-svg">
                {/* Development Flow Path */}
                <path d="M100,300 C200,100 400,500 700,300" 
                      className="flow-path" 
                      fill="none" 
                      stroke="var(--neon-blue)" 
                      strokeWidth="2" />

                {/* Code Stage */}
                <g className="stage" transform="translate(100,300)">
                  <rect x="-40" y="-40" width="80" height="80" className="stage-box" />
                  <text x="0" y="5" className="stage-text">Code</text>
                  <g className="code-lines">
                    <line x1="-20" y1="-15" x2="20" y2="-15" className="code-line" />
                    <line x1="-20" y1="0" x2="20" y2="0" className="code-line" />
                    <line x1="-20" y1="15" x2="20" y2="15" className="code-line" />
                  </g>
                </g>

                {/* Build Stage */}
                <g className="stage" transform="translate(300,200)">
                  <rect x="-40" y="-40" width="80" height="80" className="stage-box" />
                  <text x="0" y="5" className="stage-text">Build</text>
                  <g className="build-icon">
                    <path d="M-20,-20 L20,-20 L20,20 L-20,20 Z" className="build-path" />
                    <path d="M-10,-10 L10,-10 L10,10 L-10,10 Z" className="build-path" />
                  </g>
                </g>

                {/* Test Stage */}
                <g className="stage" transform="translate(500,400)">
                  <rect x="-40" y="-40" width="80" height="80" className="stage-box" />
                  <text x="0" y="5" className="stage-text">Test</text>
                  <g className="test-icon">
                    <circle cx="0" cy="-10" r="10" className="test-circle" />
                    <line x1="-15" y1="10" x2="15" y2="10" className="test-line" />
                  </g>
                </g>

                {/* Deploy Stage */}
                <g className="stage" transform="translate(700,300)">
                  <rect x="-40" y="-40" width="80" height="80" className="stage-box" />
                  <text x="0" y="5" className="stage-text">Deploy</text>
                  <g className="deploy-icon">
                    <path d="M-20,-20 L20,-20 L0,20 Z" className="deploy-path" />
                    <line x1="-10" y1="0" x2="10" y2="0" className="deploy-line" />
                  </g>
                </g>

                {/* Data Flow Particles */}
                <g className="data-flow">
                  <circle className="data-particle" r="4">
                    <animateMotion
                      path="M100,300 C200,100 400,500 700,300"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle className="data-particle" r="4">
                    <animateMotion
                      path="M100,300 C200,100 400,500 700,300"
                      dur="3s"
                      begin="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle className="data-particle" r="4">
                    <animateMotion
                      path="M100,300 C200,100 400,500 700,300"
                      dur="3s"
                      begin="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutSectionRef}>
          <div className="container">
              <h2>About <span className="heading-highlight">Me</span></h2>
              <div className="about-content">
                  <div className="about-text">
                      <p>Hi! I'm a passionate and detail-focused Full Stack Developer with strong skills in Java, JavaScript, React, Node.js, and MongoDB. I love building modern, responsive websites and web apps that look great and work smoothly.</p>
                      <p>I've worked on projects like Study Notion, Travel Planner, and tools powered by AI. These experiences have helped me grow as a developer who can build both beautiful frontends and powerful backends.</p>
                     
                      <h4>What Sets Me Apart:</h4>
                      <div className="features-grid">
                          <div className="feature-card">
                              <div className="feature-icon">🎯</div>
                              <h5 className="feature-title">Pixel-Perfect UI Design:</h5>
                              <p className="feature-description">Inspired by modern design systems and motion graphics, I implement clean, dynamic layouts.</p>
                          </div>
                          <div className="feature-card">
                              <div className="feature-icon">🧱</div>
                              <h5 className="feature-title">Scalable & Modular Code:</h5>
                              <p className="feature-description">I write clean, maintainable code for long-term scalability and team collaboration.</p>
                          </div>
                          <div className="feature-card">
                              <div className="feature-icon">🤝</div>
                              <h5 className="feature-title">Team-First Mindset:</h5>
                              <p className="feature-description">Whether it's pair programming or collaborative product design, I thrive in team environments and open-source communities.</p>
                          </div>
                          <div className="feature-card">
                              <div className="feature-icon">🚀</div>
                              <h5 className="feature-title">Growth-Oriented:</h5>
                              <p className="feature-description">Constantly learning new tech, exploring AI integrations, and improving systems for future-readiness.</p>
                          </div>
                      </div>
                  </div>
                  <div className="about-image">
                      <img src="Screenshot 2024-08-03 171429.png" alt="Profile" className="profile-img" />
                  </div>
              </div>
          </div>
      </section>

      {/* Education & Learning Section */}
      <section id="education">
        <div className="container">
          <h2>Education & <span className="heading-highlight">Learning</span></h2>
          <div className="education-grid">
            {/* Bachelor's Degree Card */}
            <div className="education-card">
              <h3 className="education-title">BSc in Computer Science</h3>
              <p className="education-institute">Mumbai University <img src="images (4).jpeg" alt="Mumbai University Logo" style={{height: '24px', marginLeft: '8px', verticalAlign: 'middle'}}/>  | 2022-2025</p>
              <ul className="education-details">
                <li><b>GPA:</b> 8.7/10</li>
                <li><b>Relevant Courses:</b> Web Development, Algorithms, Database Systems</li>
                <li><b>Capstone Project:</b> AI-Powered traval Suggestion Webapplication </li>
              </ul>
            </div>

            {/* Bootcamp Card */}
            <div className="education-card">
              <h3 className="education-title">Full Stack Web Development Bootcamp</h3>
              <p className="education-institute">Platform Name | 2023</p>
              <ul className="education-details">
                <li><b>500+</b> hours of intensive training</li>
                <li>Built <b>10+</b> full-stack applications</li>
              </ul>
            </div>

            {/* Certifications Card */}
            <div className="education-card">
              <h3 className="education-title">Certifications</h3>
              <ul className="education-details">
                <li>AWS Certified Cloud Practitioner</li>
                <li>Google IT Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Tools Section */}
      <section id="tech-stack" ref={techStackRef}>
          <div className="container">
              <h2 className="text-center mb-8">My <span>Tech Stack</span></h2>
              <div className="tech-stack-container">
                  <div className="tech-stack-frame">
                      <div className="tech-category">
                          <h3>Frontend</h3>
                          <ul className="horizontal-skills">
                              <li>
                                  <i className="fab fa-html5 tech-skill-icon icon-html" title="HTML5"></i>
                                  <span className="tech-name">HTML5</span>
                              </li>
                              <li>
                                  <i className="fab fa-css3-alt tech-skill-icon icon-css" title="CSS3"></i>
                                  <span className="tech-name">CSS3</span>
                              </li>
                              <li>
                                  <i className="fab fa-js tech-skill-icon icon-js" title="JavaScript"></i>
                                  <span className="tech-name">JavaScript</span>
                              </li>
                              <li>
                                  <i className="fab fa-react tech-skill-icon icon-react" title="React.js"></i>
                                  <span className="tech-name">React</span>
                              </li>
                              <li>
                                  <i className="fab fa-react tech-skill-icon icon-react" title="React Native"></i>
                                  <span className="tech-name">React Native</span>
                              </li>
                              <li>
                                  <i className="fab fa-js tech-skill-icon icon-typescript" title="TypeScript"></i>
                                  <span className="tech-name">TypeScript</span>
                              </li>
                              <li>
                                  <i className="fas fa-code tech-skill-icon icon-redux" title="Redux"></i>
                                  <span className="tech-name">Redux</span>
                              </li>
                              <li>
                                  <i className="fas fa-mobile-alt tech-skill-icon icon-mobile" title="Responsive Design"></i>
                                  <span className="tech-name">Responsive</span>
                              </li>
                          </ul>
                      </div>

                      <div className="tech-category">
                          <h3>Backend</h3>
                          <ul className="horizontal-skills">
                              <li>
                                  <i className="fab fa-node-js tech-skill-icon icon-node" title="Node.js"></i>
                                  <span className="tech-name">Node.js</span>
                              </li>
                              <li>
                                  <i className="fas fa-server tech-skill-icon icon-server" title="Express.js"></i>
                                  <span className="tech-name">Express</span>
                              </li>
                              <li>
                                  <i className="fas fa-database tech-skill-icon icon-db" title="MongoDB"></i>
                                  <span className="tech-name">MongoDB</span>
                              </li>
                              <li>
                                  <i className="fas fa-database tech-skill-icon icon-sql" title="SQL"></i>
                                  <span className="tech-name">SQL</span>
                              </li>
                              <li>
                                  <i className="fas fa-code tech-skill-icon icon-graphql" title="GraphQL"></i>
                                  <span className="tech-name">GraphQL</span>
                              </li>
                              <li>
                                  <i className="fab fa-python tech-skill-icon icon-python" title="Python"></i>
                                  <span className="tech-name">Python</span>
                              </li>
                              <li>
                                  <i className="fas fa-code tech-skill-icon icon-code" title="REST APIs"></i>
                                  <span className="tech-name">REST API</span>
                              </li>
                          </ul>
                      </div>

                      <div className="tech-category">
                          <h3>DevOps & Tools</h3>
                          <ul className="horizontal-skills">
                              <li>
                                  <i className="fab fa-git-alt tech-skill-icon icon-git" title="Git"></i>
                                  <span className="tech-name">Git</span>
                              </li>
                              <li>
                                  <i className="fab fa-github tech-skill-icon icon-github" title="GitHub"></i>
                                  <span className="tech-name">GitHub</span>
                              </li>
                              <li>
                                  <i className="fab fa-docker tech-skill-icon icon-docker" title="Docker"></i>
                                  <span className="tech-name">Docker</span>
                              </li>
                              <li>
                                  <i className="fab fa-aws tech-skill-icon icon-aws" title="AWS"></i>
                                  <span className="tech-name">AWS</span>
                              </li>
                              <li>
                                  <i className="fas fa-shield-alt tech-skill-icon icon-shield" title="Authentication"></i>
                                  <span className="tech-name">Auth</span>
                              </li>
                              <li>
                                  <i className="fas fa-code-branch tech-skill-icon icon-branch" title="VS Code"></i>
                                  <span className="tech-name">VS Code</span>
                              </li>
                              <li>
                                  <i className="fas fa-palette tech-skill-icon icon-palette" title="Figma"></i>
                                  <span className="tech-name">Figma</span>
                              </li>
                              <li>
                                  <i className="fas fa-rocket tech-skill-icon icon-rocket" title="Deployment"></i>
                                  <span className="tech-name">Deployment</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
          <div className="container">
              <h2>My <span className="heading-highlight">Projects</span></h2>
              <div className="projects-grid">
                  {/* Project Card 1 */}
                  <div className="project-card">
                      <img src="Screenshot 2025-04-17 174402.png" alt="Study Notion" className="project-img" />
                      <div className="project-info">
                          <h3>Study Notion</h3>
                          <p>An ed-tech platform built with the MERN stack, offering course creation, video hosting, payments, and interactive learning experiences for students and instructors.</p>
                          <div className="project-tags">
                              <span className="project-tag">React</span>
                              <span className="project-tag">Node.js</span>
                              <span className="project-tag">MongoDB</span>
                          </div>
                          <div className="project-links">
                              <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Live Demo</a>
                              <a href="https://github.com/agraharisatyam/Study-Notion-webApp" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub</a>
                          </div>
                      </div>
                  </div>

                  {/* Project Card 2 */}
                  <div className="project-card">
                      <img src="Screenshot 2024-10-10 214407.png" alt="Travel Planner" className="project-img" />
                      <div className="project-info">
                          <h3>PlanIt AI - Travel Planner</h3>
                          <p>An AI-powered travel planner that generates personalized trip plans using Google Maps API, Firebase, and Gemini AI based on user preferences, budget, and trip length.</p>
                          <div className="project-tags">
                              <span className="project-tag">React</span>
                              <span className="project-tag">Firebase</span>
                              <span className="project-tag">Gemini API</span>
                          </div>
                          <div className="project-links">
                              <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Live Demo</a>
                              <a href="https://github.com/agraharisatyam/TravelMate-AI-r" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub</a>
                          </div>
                      </div>
                  </div>

                  {/* Project Card 3 */}
                  <div className="project-card">
                      <img src="apps.40595.9007199266248466.31ea8f1c-9480-428b-b6a7-7351975bcbf2.jpeg" alt="Digital Diary" className="project-img" />
                      <div className="project-info">
                          <h3>Digital Diary</h3>
                          <p>A personal productivity app built with React Native, allowing users to record daily entries via voice or text, generate AI summaries, and track monthly reflections.</p>
                          <div className="project-tags">
                              <span className="project-tag">React Native</span>
                              <span className="project-tag">Expo</span>
                              <span className="project-tag">Gemini AI</span>
                          </div>
                          <div className="project-links">
                              <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Live Demo</a>
                              <a href="https://github.com/agraharisatyam/Parthly" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
          <div className="container">
              <h2>Get in <span>Touch</span></h2>
              <div className="contact-container">
                  <div className="contact-info">
                      <div className="contact-method">
                          <i className="fas fa-envelope contact-icon"></i>
                          <div>
                              <h4>Email Me</h4>
                              <p>contact@yourdomain.com</p>
                          </div>
                      </div>
                      <div className="contact-method">
                          <i className="fas fa-phone-alt contact-icon"></i>
                          <div>
                              <h4>Call Me</h4>
                              <p>+1 (123) 456-7890</p>
                          </div>
                      </div>
                      <div className="contact-method">
                          <i className="fas fa-map-marker-alt contact-icon"></i>
                          <div>
                              <h4>My Location</h4>
                              <p>New York, USA</p>
                          </div>
                      </div>
                  </div>
                  <div className="contact-form">
                      <form onSubmit={handleFormSubmit}>
                          <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <input type="text" id="name" name="name" className="form-control" placeholder="Your Name" value={form.name} onChange={handleFormChange} required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input type="email" id="email" name="email" className="form-control" placeholder="Your Email" value={form.email} onChange={handleFormChange} required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="subject">Subject</label>
                              <input type="text" id="subject" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleFormChange} required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="message">Message</label>
                              <textarea id="message" name="message" className="form-control" placeholder="Your Message" rows="5" value={form.message} onChange={handleFormChange} required></textarea>
                          </div>
                          <button type="submit" className="submit-btn" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
                          {success && <div style={{marginTop: '1rem', color: success.includes('success') ? 'green' : 'red'}}>{success}</div>}
                      </form>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer>
          <div className="container">
              <div className="social-links">
                  <a href="https://github.com/agraharisatyam" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/agrahari-satyam-50508425a/" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              </div>
              <p className="copyright">&copy; 2025 Satyam Agrahari. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}

export default App;
