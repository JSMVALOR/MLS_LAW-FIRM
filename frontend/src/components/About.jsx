import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Scale, Shield, Users, Landmark } from "lucide-react";
import { useTheme } from "./ThemeContext";

const About = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();

  const handleConsultClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const snapContainer = document.querySelector('.home-snap-container');
      const el = document.getElementById('contact');
      if (snapContainer && el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className={`about snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="about">
      <style>{`
        .about {
          position: relative;
          height: calc(100vh - var(--nav-height, 80px));
          max-height: calc(100vh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 2rem;
          overflow: hidden;
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
          height: 100%;
        }
        .about-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
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
        }
        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-image-frame:hover .about-image {
          transform: scale(1.03);
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
        }
        .about-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #DDDDE2;
          line-height: 1.3;
        }
        .about-content-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .about-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
          width: fit-content;
          background: rgba(197, 160, 89, 0.08);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.22);
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
          line-height: 1.2;
          margin-bottom: 0.65rem;
          color: inherit;
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
          line-height: 1.55;
          margin-bottom: 0.5rem;
          font-weight: 500;
          opacity: 0.9;
        }
        .about-body {
          font-size: 0.82rem;
          line-height: 1.55;
          margin-bottom: 1.15rem;
          opacity: 0.75;
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
        .about-highlight-item h4 {
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }
        .about-highlight-item p {
          font-size: 0.72rem;
          line-height: 1.35;
          opacity: 0.7;
        }
        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.68rem 1.45rem;
          border-radius: 6px;
          background: #C5A059;
          border: 1px solid #C5A059;
          color: #0E1015;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.22);
        }
        .about-btn-primary:hover {
          background: #D4AF37;
          border-color: #D4AF37;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(197, 160, 89, 0.35);
        }
        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.68rem 1.3rem;
          border-radius: 6px;
          border: 1px solid rgba(197, 160, 89, 0.25);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .about-btn-secondary:hover {
          border-color: #C5A059;
          color: #C5A059;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .about-visual-col { display: none; }
        }
      `}</style>

      <div className="about-container">
        {/* Visual Column */}
        <div className="about-visual-col">
          <div className="about-image-frame">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=900"
              alt="High Court Chambers and Advocates"
              className="about-image"
            />
            <div className="about-image-overlay" />
            
            <div className="about-stat-badge">
              <span className="about-stat-number">25+</span>
              <span className="about-stat-label">
                Years of High Court & Supreme Court Heritage
              </span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="about-content-col">
          <div className="about-tag">
            <Landmark size={14} />
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

          {/* Core Institutional Highlights Grid */}
          <div className="about-highlights-grid">
            <div className="about-highlight-item">
              <div className="highlight-icon">
                <Scale size={16} />
              </div>
              <div>
                <h4>Appellate Mastery</h4>
                <p>Formidable counsel in High Courts and Supreme Court of India.</p>
              </div>
            </div>

            <div className="about-highlight-item">
              <div className="highlight-icon">
                <Shield size={16} />
              </div>
              <div>
                <h4>Strategic Integrity</h4>
                <p>Ethics-first defense and comprehensive regulatory compliance.</p>
              </div>
            </div>

            <div className="about-highlight-item">
              <div className="highlight-icon">
                <Award size={16} />
              </div>
              <div>
                <h4>Arbitration Acumen</h4>
                <p>Swift dispute resolution under domestic & SIAC/ICC frameworks.</p>
              </div>
            </div>

            <div className="about-highlight-item">
              <div className="highlight-icon">
                <Users size={16} />
              </div>
              <div>
                <h4>Bespoke Counsel</h4>
                <p>Tailored legal roadmaps for corporations and private clients.</p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="about-cta-row">
            <a href="#contact" className="about-btn-primary" onClick={handleConsultClick}>
              <span>Schedule Consultation</span>
              <ArrowRight size={14} />
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
