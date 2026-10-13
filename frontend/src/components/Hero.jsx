import React from 'react';
import { ArrowRight, ShieldCheck, Compass, Scale, Award } from 'lucide-react';
import { useTheme } from './ThemeContext';

const PILLARS = [
  { icon: ShieldCheck, title: "Uncompromising Advocacy", desc: "Litigation & Appellate Representation" },
  { icon: Scale, title: "Judicial Acumen", desc: "Constitutional & Statutory Depth" },
  { icon: Award, title: "Corporate Stewardship", desc: "Institutional Advisory & ADR" },
];

const Hero = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();

  const handleScrollTo = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={`hero snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="home" aria-label="Firm introduction">
      <style>{`
        .hero {
          position: relative;
          min-height: calc(100vh - var(--nav-height, 80px));
          min-height: calc(100svh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem 1.5rem;
          padding-left: max(1.5rem, var(--sal));
          padding-right: max(1.5rem, var(--sar));
          overflow: hidden;
          overflow: clip;
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
          -webkit-user-select: none;
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
        }
        .hero-content {
          text-align: center;
          max-width: 880px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: heroReveal 600ms var(--ease-out) backwards;
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Stagger the entrance 30–80ms per beat */
        .hero-badge { animation: heroReveal 500ms var(--ease-out) 40ms backwards; }
        .hero-title { animation: heroReveal 550ms var(--ease-out) 90ms backwards; }
        .hero-motto { animation: heroReveal 500ms var(--ease-out) 140ms backwards; }
        .hero-description { animation: heroReveal 500ms var(--ease-out) 190ms backwards; }
        .hero-actions { animation: heroReveal 500ms var(--ease-out) 240ms backwards; }
        .hero-pillars { animation: heroReveal 550ms var(--ease-out) 300ms backwards; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.32rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
          white-space: nowrap;
        }
        .hero.dark-theme .hero-badge {
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: #C5A059;
        }
        .hero.light-theme .hero-badge {
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: #8C661D;
        }
        .hero-badge-logo {
          width: 14px;
          height: 14px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4.2vw, 3.4rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.1;
          margin: 0 0 0.65rem;
          text-align: center;
          text-transform: uppercase;
          text-wrap: balance;
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
          letter-spacing: 0.02em;
          line-height: 1.5;
          margin: 0 0 0.65rem;
          max-width: 760px;
          font-style: italic;
          opacity: 0.9;
          text-wrap: balance;
        }
        .hero-description {
          font-size: clamp(0.82rem, 1.1vw, 0.92rem);
          line-height: 1.6;
          max-width: 660px;
          margin: 0 0 1.35rem;
          font-weight: 400;
          opacity: 0.8;
          text-wrap: pretty;
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
          padding: 0.85rem 1.65rem;
          min-height: 48px;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out), box-shadow 200ms var(--ease-out);
          font-family: inherit;
          white-space: nowrap;
        }
        .hero-btn:active {
          transform: scale(0.97);
        }
        .hero-btn-primary {
          background: #C5A059;
          border: 1px solid #C5A059;
          color: #0C0D11;
          box-shadow: 0 4px 16px rgba(197, 160, 89, 0.25);
        }
        .hero-btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: inherit;
        }
        .hero-btn-arrow {
          transition: transform var(--dur-pop) var(--ease-out);
        }
        .hero-pillars {
          display: flex;
          align-items: stretch;
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
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .hero.light-theme .hero-pillars {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(197, 160, 89, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .hero-pillar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
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
          min-width: 0;
        }
        .pillar-title {
          font-size: 0.8rem;
          font-weight: 700;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pillar-desc {
          font-size: 0.7rem;
          line-height: 1.3;
          margin-top: 1px;
          opacity: 0.7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-pillar-divider {
          width: 1px;
          align-self: stretch;
          flex-shrink: 0;
          margin: 0.25rem 0.65rem;
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
          padding: 0.6rem;
          min-width: 44px;
          min-height: 44px;
          margin-top: 0.75rem;
          color: inherit;
          opacity: 0.7;
          transition: opacity var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
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
          animation: mouseWheel 1.5s var(--ease-in-out) infinite;
        }
        @keyframes mouseWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        /* Hover gated — press feedback (:active) covers touch */
        @media (hover: hover) and (pointer: fine) {
          .hero-btn-primary:hover {
            background: #D4AF37;
            border-color: #D4AF37;
            transform: translateY(-2px);
            box-shadow: 0 6px 22px rgba(197, 160, 89, 0.35);
          }
          .hero-btn-secondary:hover {
            background: rgba(197, 160, 89, 0.12);
            border-color: #C5A059;
            color: #C5A059;
            transform: translateY(-2px);
          }
          .hero-btn:hover .hero-btn-arrow {
            transform: translateX(4px);
          }
          .hero-scroll-cue:hover {
            opacity: 1;
            color: #C5A059;
          }
        }
        @media (max-width: 860px) {
          .hero { padding: 2.5rem 1.1rem 2rem; justify-content: flex-start; }
          .hero-container { justify-content: flex-start; }
          .hero-title { font-size: clamp(1.75rem, 8.5vw, 2.5rem); letter-spacing: 0.01em; }
          .hero-motto { font-size: clamp(0.95rem, 4.2vw, 1.1rem); padding: 0 0.25rem; }
          .hero-description { font-size: 0.94rem; padding: 0 0.25rem; }
          .hero-actions { flex-direction: column; align-items: stretch; gap: 0.7rem; max-width: 420px; margin-left: auto; margin-right: auto; }
          .hero-btn { width: 100%; padding: 0.95rem 1.25rem; font-size: 0.82rem; }
          .hero-pillars {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.55rem;
            max-width: 420px;
            padding: 0.9rem 1rem;
            margin: 0 auto;
            width: 100%;
          }
          .hero-pillar-divider { display: none; }
          .hero-pillar-item { padding: 0.35rem 0.25rem; gap: 0.65rem; }
          .pillar-title, .pillar-desc { white-space: normal; }
          /* Perf: shrink glows, drop the second layer on small GPUs */
          .hero-glow-1 { width: 280px; height: 280px; filter: blur(60px); }
          .hero-glow-2 { display: none; }
          .hero-watermark { width: min(300px, 80vw); height: min(300px, 80vw); }
          .hero-scroll-cue { display: none; }
          .hero-content, .hero-badge, .hero-title, .hero-motto, .hero-description, .hero-actions, .hero-pillars {
            animation-duration: 400ms;
          }
        }
        @media (max-width: 380px) {
          .hero { padding: 2rem 0.9rem 1.75rem; }
          .hero-badge { font-size: 0.64rem; padding: 0.3rem 0.75rem; }
          .hero-description { font-size: 0.88rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-content, .hero-badge, .hero-title, .hero-motto, .hero-description, .hero-actions, .hero-pillars {
            animation: none;
          }
          .scroll-cue-wheel { animation: none; }
        }
      `}</style>

      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />

      <div className="hero-watermark" aria-hidden="true">
        <img src="/mls_logo_clean.svg" alt="" className="hero-watermark-img" loading="lazy" decoding="async" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <img src="/mls_logo_clean.svg" alt="" className="hero-badge-logo" />
            <span>Premier Full-Service Law Firm</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-accent">MEN LEGATUM</span>
            <span className="hero-title-main"> SANCTITAS</span>
          </h1>

          <p className="hero-motto">
            Driven by the Spirit of Justice, Guided by the Sanctity of Law
          </p>

          <p className="hero-description">
            Delivering formidable advocacy, nuanced strategic advisory, and unwavering integrity across
            high-stakes commercial litigation, corporate governance, and complex dispute resolution.
          </p>

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

          <div className="hero-pillars">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <React.Fragment key={p.title}>
                  {i > 0 && <div className="hero-pillar-divider" aria-hidden="true" />}
                  <div className="hero-pillar-item">
                    <div className="pillar-icon-wrapper"><Icon size={16} /></div>
                    <div className="pillar-text">
                      <div className="pillar-title">{p.title}</div>
                      <div className="pillar-desc">{p.desc}</div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

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
