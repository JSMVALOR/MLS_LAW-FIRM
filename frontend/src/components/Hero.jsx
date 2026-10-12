import React from 'react';
import { ArrowRight, ShieldCheck, Compass, Scale, Award } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Hero = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();

  const handleScrollTo = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const snapContainer = document.querySelector('.home-snap-container');
      const element = document.getElementById(sectionId);
      if (snapContainer && element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className={`hero snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="home">
      <style>{`
        .hero {
          position: relative;
          height: calc(100vh - var(--nav-height, 80px));
          max-height: calc(100vh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem 1.5rem;
          overflow: hidden;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .hero.dark-theme {
          background: radial-gradient(circle at 50% 20%, #13151D 0%, #0C0D11 70%, #07080B 100%);
          color: #ECECF0;
        }
        .hero.light-theme {
          background: radial-gradient(circle at 50% 15%, #FFFFFF 0%, #F9F8F5 55%, #F0EEE7 100%);
          color: #16181F;
        }
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at 50% 40%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 40%, black 30%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }
        .hero.dark-theme .hero-bg-grid {
          background-image: 
            linear-gradient(to right, rgba(197, 160, 89, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.04) 1px, transparent 1px);
        }
        .hero.light-theme .hero-bg-grid {
          background-image: 
            linear-gradient(to right, rgba(197, 160, 89, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.05) 1px, transparent 1px);
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }
        .hero-glow-1 {
          width: 440px;
          height: 440px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, transparent 70%);
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero-glow-2 {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%);
          bottom: 5%;
          right: 15%;
        }
        .hero-watermark {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: min(480px, 70vw);
          height: min(480px, 70vw);
        }
        .hero-watermark-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.04;
          filter: drop-shadow(0 0 20px rgba(197, 160, 89, 0.12));
        }
        .hero-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .hero-content {
          text-align: center;
          max-width: 880px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.32rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }
        .hero.dark-theme .hero-badge {
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: #C5A059;
          backdrop-filter: blur(12px);
        }
        .hero.light-theme .hero-badge {
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: #8C661D;
          backdrop-filter: blur(8px);
        }
        .hero-badge-logo {
          width: 14px;
          height: 14px;
          object-fit: contain;
          display: block;
        }
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4.2vw, 3.4rem);
          font-weight: 800;
          letter-spacing: 0.05em;
          line-height: 1.1;
          margin-bottom: 0.65rem;
          text-align: center;
          text-transform: uppercase;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, #F2E3C6 0%, #C5A059 55%, #9E7B38 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .hero.light-theme .hero-title-accent {
          background: linear-gradient(135deg, #A47B2E 0%, #87621B 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-title-main {
          color: inherit;
          display: inline-block;
        }
        .hero-motto {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.92rem, 1.6vw, 1.15rem);
          font-weight: 500;
          letter-spacing: 0.03em;
          line-height: 1.4;
          margin-bottom: 0.65rem;
          max-width: 760px;
          font-style: italic;
          opacity: 0.9;
        }
        .hero-description {
          font-size: clamp(0.82rem, 1.1vw, 0.92rem);
          line-height: 1.55;
          max-width: 660px;
          margin-bottom: 1.35rem;
          font-weight: 400;
          opacity: 0.8;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          margin-bottom: 1.35rem;
          width: 100%;
        }
        .hero-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.72rem 1.65rem;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s ease;
          font-family: inherit;
        }
        .hero-btn-primary {
          background: #C5A059;
          border: 1px solid #C5A059;
          color: #0C0D11;
          box-shadow: 0 4px 16px rgba(197, 160, 89, 0.25);
        }
        .hero-btn-primary:hover {
          background: #D4AF37;
          border-color: #D4AF37;
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(197, 160, 89, 0.35);
        }
        .hero-btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: inherit;
        }
        .hero-btn-secondary:hover {
          background: rgba(197, 160, 89, 0.12);
          border-color: #C5A059;
          color: #C5A059;
          transform: translateY(-2px);
        }
        .hero-btn-arrow {
          transition: transform 0.25s ease;
        }
        .hero-btn:hover .hero-btn-arrow {
          transform: translateX(4px);
        }
        .hero-pillars {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 860px;
          padding: 0.75rem 1.35rem;
          border-radius: 10px;
          box-sizing: border-box;
        }
        .hero.dark-theme .hero-pillars {
          background: rgba(17, 19, 25, 0.7);
          border: 1px solid rgba(197, 160, 89, 0.15);
          backdrop-filter: blur(16px);
        }
        .hero.light-theme .hero-pillars {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(197, 160, 89, 0.2);
          backdrop-filter: blur(16px);
        }
        .hero-pillar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          padding: 0 0.4rem;
        }
        .pillar-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(197, 160, 89, 0.1);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }
        .pillar-text {
          text-align: left;
        }
        .pillar-title {
          font-size: 0.8rem;
          font-weight: 700;
          line-height: 1.25;
        }
        .pillar-desc {
          font-size: 0.7rem;
          line-height: 1.3;
          margin-top: 1px;
          opacity: 0.7;
        }
        .hero-pillar-divider {
          width: 1px;
          height: 30px;
          flex-shrink: 0;
          margin: 0 0.65rem;
          background: linear-gradient(to bottom, transparent, rgba(197, 160, 89, 0.22), transparent);
        }
        .hero-scroll-cue {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem;
          margin-top: 0.75rem;
          color: inherit;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .hero-scroll-cue:hover {
          opacity: 1;
          color: #C5A059;
        }
        .scroll-cue-mouse {
          width: 16px;
          height: 24px;
          border-radius: 8px;
          border: 1.5px solid rgba(197, 160, 89, 0.4);
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 3px;
        }
        .scroll-cue-wheel {
          width: 2px;
          height: 4px;
          border-radius: 1px;
          background-color: #C5A059;
          animation: mouseWheel 1.5s infinite;
        }
        @keyframes mouseWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @media (max-width: 860px) {
          .hero-pillars { display: none; }
        }
      `}</style>

      {/* Background Decorative Ambient Layers */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />
      
      {/* Subtle Clean SVG Logo Watermark */}
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
              <ArrowRight size={15} className="hero-btn-arrow" />
            </button>

            <button
              type="button"
              className="hero-btn hero-btn-secondary"
              onClick={() => handleScrollTo('practice')}
            >
              <Compass size={15} />
              <span>Explore Practice Areas</span>
            </button>
          </div>

          {/* Institutional Pillars Strip */}
          <div className="hero-pillars">
            <div className="hero-pillar-item">
              <div className="pillar-icon-wrapper">
                <ShieldCheck size={16} />
              </div>
              <div className="pillar-text">
                <div className="pillar-title">Uncompromising Advocacy</div>
                <div className="pillar-desc">Litigation & Appellate Representation</div>
              </div>
            </div>

            <div className="hero-pillar-divider" aria-hidden="true" />

            <div className="hero-pillar-item">
              <div className="pillar-icon-wrapper">
                <Scale size={16} />
              </div>
              <div className="pillar-text">
                <div className="pillar-title">Judicial Acumen</div>
                <div className="pillar-desc">Constitutional & Statutory Depth</div>
              </div>
            </div>

            <div className="hero-pillar-divider" aria-hidden="true" />

            <div className="hero-pillar-item">
              <div className="pillar-icon-wrapper">
                <Award size={16} />
              </div>
              <div className="pillar-text">
                <div className="pillar-title">Corporate Stewardship</div>
                <div className="pillar-desc">Institutional Advisory & ADR</div>
              </div>
            </div>
          </div>

          {/* Micro Scroll Indicator */}
          <button
            type="button"
            className="hero-scroll-cue"
            onClick={() => handleScrollTo('about')}
            aria-label="Scroll to About Firm section"
          >
            <div className="scroll-cue-mouse">
              <div className="scroll-cue-wheel" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
