import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Scale, Shield, Users, Landmark } from "lucide-react";
import { useTheme } from "./ThemeContext";

const HIGHLIGHTS = [
  { icon: Scale, title: "Appellate Mastery", desc: "Formidable counsel in High Courts and Supreme Court of India." },
  { icon: Shield, title: "Strategic Integrity", desc: "Ethics-first defense and comprehensive regulatory compliance." },
  { icon: Award, title: "Arbitration Acumen", desc: "Swift dispute resolution under domestic & SIAC/ICC frameworks." },
  { icon: Users, title: "Bespoke Counsel", desc: "Tailored legal roadmaps for corporations and private clients." },
];

const About = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();

  const handleConsultClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('contact');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`about snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="about" aria-label="About the firm">
      <style>{`
        .about {
          position: relative;
          min-height: calc(100vh - var(--nav-height, 80px));
          min-height: calc(100svh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 2rem;
          padding-left: max(2rem, var(--sal));
          padding-right: max(2rem, var(--sar));
          overflow: hidden;
          overflow: clip;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .about.dark-theme {
          background: radial-gradient(circle at 10% 50%, #111319 0%, #0A0B0E 100%);
          color: #ECECF0;
        }
        .about.light-theme {
          background: radial-gradient(circle at 10% 50%, #FFFFFF 0%, #F8F6F0 100%);
          color: #171A21;
        }
        .about-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3rem;
          align-items: center;
        }
        .about-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-width: 0;
        }
        .about-image-frame {
          position: relative;
          width: 100%;
          max-width: 410px;
          height: min(440px, 52vh);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(197, 160, 89, 0.22);
          clip-path: inset(0 0 0 0);
        }
        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 600ms var(--ease-out);
        }
        .about-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,11,15,0.72) 0%, transparent 60%);
          pointer-events: none;
        }
        .about-stat-badge {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          right: 1.25rem;
          background: rgba(14, 16, 22, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(197, 160, 89, 0.25);
          padding: 0.75rem 1.15rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .about-stat-number {
          font-family: 'Cinzel', serif;
          font-size: 1.7rem;
          font-weight: 800;
          color: #C5A059;
          line-height: 1;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }
        .about-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #DDDDE2;
          line-height: 1.4;
          min-width: 0;
        }
        .about-content-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }
        .about-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
          width: fit-content;
          max-width: 100%;
          background: rgba(197, 160, 89, 0.08);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.22);
          white-space: nowrap;
        }
        .about.light-theme .about-tag {
          background: rgba(197, 160, 89, 0.1);
          color: #8C661D;
          border-color: rgba(197, 160, 89, 0.25);
        }
        .about-heading {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.2;
          margin: 0 0 0.65rem;
          color: inherit;
          text-wrap: balance;
        }
        .about.dark-theme .about-heading {
          background: linear-gradient(135deg, #FFFFFF 40%, #C5A059 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about.light-theme .about-heading {
          color: #171A21;
        }
        .about-lead {
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0 0 0.5rem;
          font-weight: 500;
          opacity: 0.9;
          text-wrap: pretty;
        }
        .about-body {
          font-size: 0.82rem;
          line-height: 1.6;
          margin: 0 0 1.15rem;
          opacity: 0.75;
          text-wrap: pretty;
        }
        .about-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.35rem;
        }
        .about-highlight-item {
          display: flex;
          gap: 0.65rem;
          align-items: flex-start;
          min-width: 0;
          opacity: 0;
          animation: aboutStagger 450ms var(--ease-out) forwards;
        }
        .about-highlight-item:nth-child(1) { animation-delay: 60ms; }
        .about-highlight-item:nth-child(2) { animation-delay: 120ms; }
        .about-highlight-item:nth-child(3) { animation-delay: 180ms; }
        .about-highlight-item:nth-child(4) { animation-delay: 240ms; }
        @keyframes aboutStagger {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .highlight-icon {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          background: rgba(197, 160, 89, 0.1);
          color: #C5A059;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }
        .about.light-theme .highlight-icon {
          background: rgba(197, 160, 89, 0.12);
          color: #8C661D;
        }
        .about-highlight-text {
          min-width: 0;
        }
        .about-highlight-text h4 {
          font-size: 0.8rem;
          font-weight: 700;
          margin: 0 0 0.15rem;
        }
        .about-highlight-text p {
          font-size: 0.72rem;
          line-height: 1.4;
          opacity: 0.7;
          margin: 0;
        }
        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }
        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.8rem 1.45rem;
          min-height: 48px;
          border-radius: 8px;
          background: #C5A059;
          border: 1px solid #C5A059;
          color: #0E1015;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out), border-color var(--dur-pop) var(--ease-out), box-shadow 200ms var(--ease-out);
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.22);
          font-family: inherit;
          white-space: nowrap;
        }
        .about-btn-primary:active {
          transform: scale(0.97);
        }
        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.8rem 1.3rem;
          min-height: 48px;
          border-radius: 8px;
          border: 1px solid rgba(197, 160, 89, 0.25);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
          font-family: inherit;
          white-space: nowrap;
        }
        .about-btn-secondary:active {
          transform: scale(0.97);
        }
        .about-btn-arrow {
          transition: transform var(--dur-pop) var(--ease-out);
        }
        @media (hover: hover) and (pointer: fine) {
          .about-image-frame:hover .about-image { transform: scale(1.03); }
          .about-btn-primary:hover {
            background: #D4AF37;
            border-color: #D4AF37;
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(197, 160, 89, 0.35);
          }
          .about-btn-primary:hover .about-btn-arrow { transform: translateX(3px); }
          .about-btn-secondary:hover { border-color: #C5A059; color: #C5A059; transform: translateY(-2px); }
        }
        @media (max-width: 900px) {
          .about-container { grid-template-columns: 1fr; gap: 1.5rem; }
          .about-visual-col { display: none; }
        }
        @media (max-width: 768px) {
          .about { padding: 2.5rem 1.1rem 2rem; align-items: flex-start; }
          .about-heading { font-size: clamp(1.45rem, 6.5vw, 1.9rem); }
          .about-lead { font-size: 0.92rem; }
          .about-body { font-size: 0.86rem; }
          .about-highlights-grid { grid-template-columns: 1fr; gap: 0.85rem; }
          .about-cta-row { flex-direction: column; align-items: stretch; max-width: 420px; }
          .about-btn-primary, .about-btn-secondary { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-highlight-item { animation: none; opacity: 1; }
          .about-image { transition: none; }
        }
      `}</style>

      <div className="about-container">
        <div className="about-visual-col">
          <div className="about-image-frame">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=900"
              alt="High Court Chambers and Advocates"
              className="about-image"
              loading="lazy"
              decoding="async"
            />
            <div className="about-image-overlay" />
            <div className="about-stat-badge">
              <span className="about-stat-number">25+</span>
              <span className="about-stat-label">Years of High Court & Supreme Court Heritage</span>
            </div>
          </div>
        </div>

        <div className="about-content-col">
          <div className="about-tag">
            <Landmark size={14} style={{ flexShrink: 0 }} />
            <span>Chambers Heritage</span>
          </div>

          <h2 className="about-heading">
            Decades of Unyielding Advocacy & Legal Precedent
          </h2>

          <p className="about-lead">
            MLS & Co is a premier full-service law firm anchored in constitutional jurisprudence,
            high-stakes dispute resolution, and cross-border commercial strategy.
          </p>

          <p className="about-body">
            Founded on the maxim <em>Men Legatum Sanctitas</em>, we combine courtroom tenacity
            with sharp transactional insight to defend client liberties, protect corporate assets,
            and resolve complex institutional disputes across India.
          </p>

          <div className="about-highlights-grid">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="about-highlight-item">
                  <div className="highlight-icon"><Icon size={16} /></div>
                  <div className="about-highlight-text">
                    <h4>{h.title}</h4>
                    <p>{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="about-cta-row">
            <a href="#contact" className="about-btn-primary" onClick={handleConsultClick}>
              <span>Schedule Consultation</span>
              <ArrowRight size={14} className="about-btn-arrow" />
            </a>
            <Link to="/legacy" className="about-btn-secondary">
              <span>View Chambers Legacy</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
