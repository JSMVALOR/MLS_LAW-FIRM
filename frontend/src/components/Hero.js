import React from 'react';
import { Scale, ArrowRight, ShieldCheck, ChevronDown, Compass, Award } from 'lucide-react';
import '../styles/Hero.css';
import { useTheme } from './ThemeContext';

const Hero = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();

  const handleScrollTo = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className={`hero snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="home">
      {/* Background Decorative Ambient Layers */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />
      
      {/* Subtle Clean SVG Logo Watermark Faintly Visible */}
      <div className="hero-watermark" aria-hidden="true">
        <img
          src="/mls_logo_clean.svg"
          alt=""
          className="hero-watermark-img"
        />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Eyebrow Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon">
              <img src="/mls_logo_clean.svg" alt="" className="hero-badge-logo" />
            </span>
            <span className="hero-badge-text">Premier Full-Service Law Firm</span>
          </div>

          {/* Primary Motto Title */}
          <h1 className="hero-title">
            <span className="hero-title-accent">MEN LEGATUM</span>
            <span className="hero-title-main"> SANCTITAS</span>
          </h1>

          {/* Motto Subtitle */}
          <p className="hero-motto">
            Driven by the Spirit of Justice, Guided by the Sanctity of Law
          </p>

          {/* Editorial Description */}
          <p className="hero-description">
            Delivering formidable advocacy, nuanced strategic advisory, and unwavering integrity across 
            high-stakes commercial litigation, corporate governance, and complex dispute resolution.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={() => handleScrollTo('contact')}
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={17} className="hero-btn-arrow" />
            </button>

            <button
              type="button"
              className="hero-btn hero-btn-secondary"
              onClick={() => handleScrollTo('practice')}
            >
              <Compass size={17} />
              <span>Explore Practice Areas</span>
            </button>
          </div>

          {/* Institutional Pillars Strip */}
          <div className="hero-pillars">
            <div className="hero-pillar-item">
              <div className="pillar-icon-wrapper">
                <ShieldCheck size={18} />
              </div>
              <div className="pillar-text">
                <div className="pillar-title">Uncompromising Advocacy</div>
                <div className="pillar-desc">Litigation & Appellate Representation</div>
              </div>
            </div>

            <div className="hero-pillar-divider" aria-hidden="true" />

            <div className="hero-pillar-item">
              <div className="pillar-icon-wrapper">
                <Scale size={18} />
              </div>
              <div className="pillar-text">
                <div className="pillar-title">Strategic Counsel</div>
                <div className="pillar-desc">Corporate, Civil & Intellectual Property</div>
              </div>
            </div>

            <div className="hero-pillar-divider" aria-hidden="true" />

            <div className="hero-pillar-item">
              <div className="pillar-icon-wrapper">
                <Award size={18} />
              </div>
              <div className="pillar-text">
                <div className="pillar-title">Institutional Integrity</div>
                <div className="pillar-desc">Tailored Solutions with Lasting Impact</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <button
          type="button"
          className="hero-scroll-cue"
          onClick={() => handleScrollTo('about')}
          aria-label="Scroll to About section"
        >
          <span className="scroll-cue-text">Scroll To Explore</span>
          <div className="scroll-cue-mouse">
            <div className="scroll-cue-wheel" />
          </div>
          <ChevronDown size={14} className="scroll-cue-chevron" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
