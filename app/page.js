'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const HERO_TAGLINE = 'Elegance, Intelligently Designed';
const PARTICLES = new Array(9).fill(null).map((_, index) => ({
  left: `${(index + 1) * 10}%`,
  delay: `${index * 2}s`
}));

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [insights, setInsights] = useState([]);
  const [stats, setStats] = useState([]);
  const [displayStats, setDisplayStats] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [taglineText, setTaglineText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formState, setFormState] = useState('idle');
  const [formFeedback, setFormFeedback] = useState('');

  const navRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const fadeObserverRef = useRef(null);
  const countersAnimatedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      let frame = 0;
      interval = setInterval(() => {
        setTaglineText(HERO_TAGLINE.slice(0, frame + 1));
        frame += 1;
        if (frame === HERO_TAGLINE.length) {
          clearInterval(interval);
        }
      }, 50);
    }, 2500);

    return () => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    async function loadContent() {
      try {
        const [servicesRes, portfolioRes, processRes, testimonialsRes, insightsRes, statsRes] = await Promise.all([
          fetch('/api/content/services'),
          fetch('/api/content/portfolio'),
          fetch('/api/content/process'),
          fetch('/api/content/testimonials'),
          fetch('/api/content/insights'),
          fetch('/api/content/stats')
        ]);

        if ([servicesRes, portfolioRes, processRes, testimonialsRes, insightsRes, statsRes].some((res) => !res.ok)) {
          throw new Error('Failed to load Déluxara experience.');
        }

        const [servicesData, portfolioData, processData, testimonialsData, insightsData, statsData] = await Promise.all([
          servicesRes.json(),
          portfolioRes.json(),
          processRes.json(),
          testimonialsRes.json(),
          insightsRes.json(),
          statsRes.json()
        ]);

        setServices(servicesData.services);
        setPortfolio(portfolioData.portfolio);
        setProcessSteps(processData.process);
        setTestimonials(testimonialsData.testimonials);
        setInsights(insightsData.insights);
        setStats(statsData.stats);
        setDisplayStats(statsData.stats.map(() => 0));
      } catch (error) {
        console.error(error);
      }
    }

    loadContent();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;

    if (!cursor || !cursorGlow) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursorGlow.style.left = `${event.clientX - 20}px`;
      cursorGlow.style.top = `${event.clientY - 20}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;

    if (!cursor || !cursorGlow) {
      return undefined;
    }

    const targets = document.querySelectorAll('a, button, .service-card, input, textarea');

    const handleEnter = () => {
      cursor.classList.add('hover');
      cursorGlow.classList.add('hover');
    };

    const handleLeave = () => {
      cursor.classList.remove('hover');
      cursorGlow.classList.remove('hover');
    };

    targets.forEach((target) => {
      target.addEventListener('mouseenter', handleEnter);
      target.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', handleEnter);
        target.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [services, portfolio, processSteps, testimonials, insights]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.98)';
        nav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.4)';
      } else {
        nav.style.background = 'rgba(28, 28, 28, 0.95)';
        nav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const particles = hero.querySelectorAll('.particle');

    const handleParallax = () => {
      const scrolled = window.scrollY;
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  useEffect(() => {
    if (fadeObserverRef.current) {
      fadeObserverRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    fadeObserverRef.current = observer;

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [services, portfolio, processSteps, testimonials, insights]);

  useEffect(() => {
    if (!stats.length || countersAnimatedRef.current) {
      return undefined;
    }

    const section = statsRef.current;
    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimatedRef.current) {
          countersAnimatedRef.current = true;
          animateCounters();
        }
      });
    });

    observer.observe(section);

    return () => observer.disconnect();
  }, [stats]);

  useEffect(() => {
    if (!testimonials.length) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const animateCounters = () => {
    const duration = 2000;
    const start = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayStats(
        stats.map((stat) => Math.round(stat.value * progress))
      );
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleSmoothScroll = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCardMagnetism = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetCardMagnetism = (event) => {
    const card = event.currentTarget;
    card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return formData.name && formData.email && formData.company && formData.message;
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid || formState === 'loading') {
      return;
    }

    setFormState('loading');
    setFormFeedback('Crafting Message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to deliver your message.');
      }

      setFormState('success');
      setFormFeedback('Message Delivered ✨');
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => {
        setFormState('idle');
        setFormFeedback('');
      }, 2500);
    } catch (error) {
      setFormState('error');
      setFormFeedback('Something went wrong. Please try again.');
      setTimeout(() => {
        setFormState('idle');
        setFormFeedback('');
      }, 3000);
    }
  };

  return (
    <main>
      <div className={`loading-screen ${isLoading ? '' : 'hidden'}`} aria-hidden={!isLoading}>
        <div className="loading-logo">DÉLUXARA</div>
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>
        <div className="loading-text">CRAFTING EXCELLENCE</div>
      </div>

      <div ref={cursorRef} className="cursor" aria-hidden />
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden />

      <nav ref={navRef}>
        <div className="nav-container">
          <a href="#home" className="logo" onClick={(event) => handleSmoothScroll(event, '#home')}>
            DÉLUXARA
          </a>
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={(event) => handleSmoothScroll(event, '#home')}>
                Experience
              </a>
            </li>
            <li>
              <a href="#services" onClick={(event) => handleSmoothScroll(event, '#services')}>
                Atelier
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={(event) => handleSmoothScroll(event, '#portfolio')}>
                Portfolio
              </a>
            </li>
            <li>
              <a href="#about" onClick={(event) => handleSmoothScroll(event, '#about')}>
                Philosophy
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(event) => handleSmoothScroll(event, '#contact')}>
                Consultation
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-subtitle">Digital Luxury Atelier</div>
          <h1 className="hero-title">DÉLUXARA</h1>
          <p className="hero-tagline">{taglineText}</p>
          <a href="#contact" className="cta-button" onClick={(event) => handleSmoothScroll(event, '#contact')}>
            Enter The Experience
          </a>
        </div>
        {PARTICLES.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{ left: particle.left, animationDelay: particle.delay }}
          />
        ))}
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title fade-in">The Atelier</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card fade-in"
                onMouseMove={handleCardMagnetism}
                onMouseLeave={resetCardMagnetism}
              >
                <div className="service-icon" aria-hidden>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2 className="section-title fade-in">Curated Excellence</h2>
          <p className="section-subtitle fade-in">A selection of our most distinguished digital creations</p>

          <div className="portfolio-grid">
            {portfolio.map((item) => (
              <article key={item.id} className="portfolio-item fade-in">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">
                    <div className="luxury-icon" aria-hidden>
                      {item.icon}
                    </div>
                    <div className="portfolio-overlay">
                      <h4>{item.name}</h4>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="portfolio-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="portfolio-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="process">
        <div className="container">
          <h2 className="section-title fade-in">The Déluxara Method</h2>
          <p className="section-subtitle fade-in">Our signature approach to digital luxury</p>

          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={step.id} className="process-step fade-in">
                <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="step-details">
                    {step.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2 className="section-title fade-in">Voices of Excellence</h2>

          <div className="testimonials-carousel">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.id}
                className={`testimonial-card fade-in ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <p>“{testimonial.quote}”</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                    <div className="author-avatar" aria-hidden>
                      {testimonial.initials}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="testimonial-navigation">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Show testimonial from ${testimonial.name}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in">
              <h2>The Philosophy</h2>
              <p>
                <em>"True luxury isn’t decoration — it’s intention."</em>
              </p>
              <p>
                At Déluxara, we believe that intelligence and beauty are not opposites—they are partners in creating
                something extraordinary. Our digital atelier combines the precision of Swiss craftsmanship with the
                vision of contemporary art.
              </p>
              <p>
                We don’t create brands that shout. We create brands that whisper with such elegance that the world stops
                to listen. Every curve, every transition, every moment of interaction is designed with the understanding
                that luxury begins where logic meets beauty.
              </p>
              <p>
                <em>"Design is intelligence made visible."</em>
              </p>

              <div className="philosophy-stats" ref={statsRef}>
                {stats.map((stat, index) => (
                  <div key={stat.id} className="stat-item">
                    <div className="stat-number">
                      {displayStats[index] ?? 0}
                      {stat.suffix}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual fade-in">
              <div className="luxury-pattern" />
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="insights">
        <div className="container">
          <h2 className="section-title fade-in">Digital Luxury Insights</h2>
          <p className="section-subtitle fade-in">Thoughts on the intersection of technology and elegance</p>

          <div className="insights-grid">
            {insights.map((insight) => (
              <article key={insight.id} className="insight-card fade-in">
                <div className="insight-meta">
                  <span className="insight-date">{insight.date}</span>
                  <span className="insight-category">{insight.category}</span>
                </div>
                <h3>{insight.title}</h3>
                <p>{insight.excerpt}</p>
                <a className="insight-link" href={insight.link} target="_blank" rel="noreferrer">
                  Read More →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content fade-in">
            <h2>Private Consultation</h2>
            <p>
              Ready to experience the intersection of intelligence and elegance? Let&apos;s craft your digital presence with
              the precision it deserves.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                required
                value={formData.company}
                onChange={handleInputChange}
              />
              <textarea
                name="message"
                placeholder="Tell us about your vision and goals..."
                required
                value={formData.message}
                onChange={handleInputChange}
              />
              <button className="submit-btn" type="submit" disabled={formState === 'loading'}>
                {formState === 'idle' && 'Request Consultation'}
                {formState === 'loading' && 'Crafting Message...'}
                {formState === 'success' && 'Message Delivered ✨'}
                {formState === 'error' && 'Try Again'}
              </button>
            </form>
            {formFeedback && <p aria-live="polite">{formFeedback}</p>}
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">DÉLUXARA</div>
            <p>&copy; {new Date().getFullYear()} Déluxara Digital Atelier. Where Intelligence Meets Elegance.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
