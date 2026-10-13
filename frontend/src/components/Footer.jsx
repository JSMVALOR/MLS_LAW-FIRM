import React from "react";
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp, ShieldAlert, Facebook } from "lucide-react";
import { useTheme } from "./ThemeContext";

const Footer = () => {
  const { isDarkTheme } = useTheme();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`site-full-footer ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <style>{`
        /* ========================================================
           MLS & CO - UPGRADED FULL FOOTER (CLEAN, NEAT & EDITORIAL)
           Used across non-home pages (Legacy, Blogs, Careers, etc.)
           ======================================================== */
        .site-full-footer {
          width: 100%;
          padding: 4.5rem 2rem 2.5rem;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          z-index: 10;
        }

        .site-full-footer.dark-theme {
          background-color: #08090C;
          color: #ECECF0;
          border-top: 1px solid rgba(197, 160, 89, 0.18);
        }

        .site-full-footer.light-theme {
          background-color: #FAF9F5;
          color: #171A21;
          border-top: 1px solid rgba(197, 160, 89, 0.22);
        }

        .footer-inner-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.25fr;
          gap: 3rem;
          align-items: start;
        }

        /* Brand Column */
        .footer-brand-pane {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .footer-logo-frame {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .footer-title-group {
          display: flex;
          flex-direction: column;
        }

        .footer-firm-heading {
          font-family: 'Cinzel', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #C5A059;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1.1;
        }

        .site-full-footer.dark-theme .footer-firm-heading {
          background: linear-gradient(135deg, #F2E3C6 0%, #C5A059 60%, #9E7B38 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .site-full-footer.light-theme .footer-firm-heading {
          color: #8C661D;
        }

        .footer-firm-subtext {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          opacity: 0.75;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .footer-motto-text {
          font-size: 0.84rem;
          line-height: 1.6;
          opacity: 0.78;
          margin: 0;
          max-width: 330px;
        }

        .footer-social-row {
          display: flex;
          gap: 0.65rem;
          margin-top: 0.25rem;
        }

        .footer-social-link {
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: inherit;
          text-decoration: none;
          transition: transform var(--dur-press) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out), background-color var(--dur-pop) var(--ease-out);
        }

        .footer-social-link:active {
          transform: scale(0.93);
        }

        /* Navigation & Directory Columns */
        .footer-section-title {
          font-family: 'Cinzel', serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C5A059;
          margin: 0 0 1.15rem;
        }

        .site-full-footer.light-theme .footer-section-title {
          color: #8C661D;
        }

        .footer-nav-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .footer-nav-entry {
          color: inherit;
          text-decoration: none;
          font-size: 0.82rem;
          opacity: 0.75;
          transition: opacity var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out), transform var(--dur-drop) var(--ease-out);
          display: inline-block;
          padding: 0.2rem 0;
        }

        /* Registry Details Column */
        .footer-contact-block {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-contact-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          font-size: 0.8rem;
          line-height: 1.45;
          opacity: 0.8;
        }

        .footer-contact-icon {
          color: #C5A059;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Bar Council Statutory Disclaimer Card */
        .footer-disclaimer-box {
          padding: 1.1rem 1.4rem;
          border-radius: 10px;
          background: rgba(197, 160, 89, 0.05);
          border: 1px solid rgba(197, 160, 89, 0.18);
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          box-sizing: border-box;
        }

        .footer-disclaimer-icon {
          color: #C5A059;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .footer-disclaimer-body {
          font-size: 0.74rem;
          line-height: 1.5;
          opacity: 0.78;
          margin: 0;
        }

        /* Bottom Copyright Ribbon */
        .footer-bottom-ribbon {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(197, 160, 89, 0.14);
          font-size: 0.76rem;
          opacity: 0.75;
        }

        .footer-back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: none;
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: inherit;
          cursor: pointer;
          padding: 0.55rem 0.95rem;
          min-height: 44px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: inherit;
          transition: transform var(--dur-press) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
        }

        .footer-back-to-top:active {
          transform: scale(0.96);
        }

        @media (hover: hover) and (pointer: fine) {
          .footer-social-link:hover {
            border-color: #C5A059;
            color: #C5A059;
            transform: translateY(-2px);
            background: rgba(197, 160, 89, 0.14);
          }
          .footer-nav-entry:hover {
            opacity: 1;
            color: #C5A059;
            transform: translateX(3px);
          }
          .footer-back-to-top:hover {
            border-color: #C5A059;
            color: #C5A059;
            transform: translateY(-2px);
          }
        }

        @media (max-width: 992px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom-ribbon {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="footer-inner-container">
        {/* Top 4-Column Directory Grid */}
        <div className="footer-top-grid">
          {/* Brand Pane */}
          <div className="footer-brand-pane">
            <div className="footer-brand-header">
              <div className="footer-logo-frame">
                <img src="/mls_logo_clean.svg" alt="MLS & Co. Crest" className="footer-logo-img" />
              </div>
              <div className="footer-title-group">
                <h3 className="footer-firm-heading">MLS & Co.</h3>
                <span className="footer-firm-subtext">ADVOCATES & SOLICITORS</span>
              </div>
            </div>

            <p className="footer-motto-text">
              <em>Men Legatum Sanctitas</em> &mdash; Driven by the spirit of justice, guided by the sanctity of law. 
              Formidable advocacy and institutional counsel across India.
            </p>

            <div className="footer-social-row">
              <a
                href="https://www.linkedin.com/company/mls-law-firm/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/mlsandcolawfirm"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Practice Disciplines */}
          <div>
            <h4 className="footer-section-title">Practice Disciplines</h4>
            <ul className="footer-nav-menu">
              <li><Link to="/practice-areas" className="footer-nav-entry">Civil & Constitutional Law</Link></li>
              <li><Link to="/practice-areas" className="footer-nav-entry">Commercial Arbitration (ICA)</Link></li>
              <li><Link to="/practice-areas" className="footer-nav-entry">White-Collar & Criminal Defense</Link></li>
              <li><Link to="/practice-areas" className="footer-nav-entry">Corporate Governance & M&A</Link></li>
              <li><Link to="/practice-areas" className="footer-nav-entry">Real Estate & Infrastructure</Link></li>
              <li><Link to="/practice-areas" className="footer-nav-entry">Taxation & Appellate Tribunals</Link></li>
              <li><Link to="/practice-areas" className="footer-nav-entry">Intellectual Property & Technology</Link></li>
            </ul>
          </div>

          {/* Institutional Knowledge */}
          <div>
            <h4 className="footer-section-title">Institutional Overview</h4>
            <ul className="footer-nav-menu">
              <li><Link to="/about" className="footer-nav-entry">About the Firm</Link></li>
              <li><Link to="/legacy" className="footer-nav-entry">Chambers Legacy & Epochs</Link></li>
              <li><Link to="/people" className="footer-nav-entry">Senior Bench & Partners</Link></li>
              <li><Link to="/team" className="footer-nav-entry">Full Chambers Registry</Link></li>
              <li><Link to="/testimonials" className="footer-nav-entry">Client Testimonials</Link></li>
              <li><Link to="/blogs" className="footer-nav-entry">Legal Insights & Articles</Link></li>
              <li><Link to="/publications" className="footer-nav-entry">Research Publications</Link></li>
              <li><Link to="/events" className="footer-nav-entry">Conferences & Symposia</Link></li>
              <li><Link to="/academic-collaborations" className="footer-nav-entry">Academic Collaborations</Link></li>
              <li><Link to="/careers" className="footer-nav-entry">Careers & Judicial Clerkships</Link></li>
              <li><Link to="/contact" className="footer-nav-entry">Chambers Consultation Intake</Link></li>
            </ul>
          </div>

          {/* Chambers Registry */}
          <div>
            <h4 className="footer-section-title">Chambers Registry</h4>
            <div className="footer-contact-block">
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>D.No: 48-18-4/2, Nagarjuna Nagar, Ring Road, Vijayawada, Andhra Pradesh, 520008</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span>+91 93905 13198 / +91 94401 75789</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <span>contact@mlslawfirm.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Council of India Statutory Disclaimer Card */}
        <div className="footer-disclaimer-box">
          <ShieldAlert size={18} className="footer-disclaimer-icon" />
          <p className="footer-disclaimer-body">
            <strong>Bar Council of India Statutory Disclaimer:</strong> As per the rules of the Bar Council of India, 
            law firms in India are not permitted to solicit work or advertise. By accessing this platform, the user 
            acknowledges that the contents provided are purely for informational purposes and do not constitute legal solicitation 
            or establish an advocate-client relationship. All formal intake submissions are protected under Section 126 of the Indian Evidence Act.
          </p>
        </div>

        {/* Bottom Ribbon */}
        <div className="footer-bottom-ribbon">
          <div>
            &copy; {new Date().getFullYear()} MLS & Co. Advocates & Solicitors. All Rights Reserved.
            <span style={{ opacity: 0.6 }}> &bull; Engineered by JSM VALOR</span>
          </div>
          <button type="button" className="footer-back-to-top" onClick={handleScrollToTop}>
            <span>Return to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
