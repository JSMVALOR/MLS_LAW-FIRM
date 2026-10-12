import React from "react";
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import "../styles/Footer.css";
import { useTheme } from "./ThemeContext";

const Footer = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();

  const handleScrollToTop = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      const home = document.getElementById('home');
      if (home) home.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`footer snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <img src="/mls_logo_clean.svg" alt="MLS & Co Logo" className="footer-logo-img" />
              <div>
                <h3 className="footer-firm-title">MLS & Co</h3>
                <span className="footer-firm-badge">ADVOCATES & ADVISORS</span>
              </div>
            </div>

            <p className="footer-tagline">
              Men Legatum Sanctitas &mdash; Driven by the spirit of justice, guided by the sanctity of law. 
              Delivering authoritative legal stewardship across India and beyond.
            </p>

            <div className="footer-social-strip">
              <a href="https://www.linkedin.com/company/mls-law-firm/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/mlsandcolawfirm" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Practice & Navigation</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => handleNavClick('about')}>About The Firm</button></li>
              <li><button type="button" onClick={() => handleNavClick('practice')}>Core Practice Areas</button></li>
              <li><button type="button" onClick={() => handleNavClick('people')}>Senior Partnership</button></li>
              <li><button type="button" onClick={() => handleNavClick('awards')}>Client Testimonials</button></li>
              <li><button type="button" onClick={() => handleNavClick('contact')}>Chambers Intake</button></li>
            </ul>
          </div>

          {/* Institutional Legacy Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Institutional Hub</h4>
            <ul className="footer-links-list">
              <li><Link to="/legacy">Firm Legacy & Milestones</Link></li>
              <li><Link to="/team">All Counsel & Senior Bench</Link></li>
              <li><Link to="/careers">Chambers Fellowship & Careers</Link></li>
              <li><Link to="/blogs">Legal Insights & Articles</Link></li>
              <li><Link to="/publications">Scholarly Publications</Link></li>
            </ul>
          </div>

          {/* Registry & Chambers Info */}
          <div className="footer-chambers-col">
            <h4 className="footer-col-heading">Principal Chambers</h4>
            <div className="footer-chambers-details">
              <p><MapPin size={14} /> New Delhi &bull; Hyderabad &bull; Mumbai</p>
              <p><Phone size={14} /> +91 (011) 2338-MLS1</p>
              <p><Mail size={14} /> counsel@mlsandco.com</p>
            </div>
            <button type="button" className="footer-top-btn" onClick={handleScrollToTop}>
              <ArrowUp size={14} />
              <span>Back To Top</span>
            </button>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Strip */}
        <div className="footer-disclaimer-strip">
          <p className="disclaimer-text">
            <strong>Bar Council of India Disclaimer:</strong> As per the rules of the Bar Council of India, law firms 
            are not permitted to solicit work or advertise. This platform is solely for informational purposes regarding MLS & Co.
          </p>
          <div className="footer-copyright-row">
            <span>&copy; {new Date().getFullYear()} MLS & Co Law Firm. All Rights Reserved.</span>
            <span className="footer-motto-pill">Men Legatum Sanctitas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
