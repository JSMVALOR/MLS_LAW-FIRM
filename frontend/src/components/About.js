import React from 'react';
import { ArrowRight, Award, Compass, Shield, Users } from 'lucide-react';
import '../styles/About.css';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const About = () => {
  const { isDarkTheme } = useTheme();

  return (
    <section id="about" className={`about snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="about-container">
        {/* Left Column: Visual Showcase */}
        <div className="about-visual-col">
          <div className="about-image-frame">
            <img
              src="/FirmImage.jpg"
              alt="MLS & Co Law Chambers"
              className="about-image"
            />
            <div className="about-image-overlay" />
            <div className="about-stat-badge">
              <span className="about-stat-number">25+</span>
              <span className="about-stat-label">Years of Combined Advocacy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Values */}
        <div className="about-content-col">
          <div className="about-tag">
            <Shield size={14} />
            <span>Institutional Profile</span>
          </div>

          <h2 className="about-heading">
            Architects of Justice, Stewards of the Law
          </h2>

          <div className="accent-line-horizontal" />

          <p className="about-lead">
            <strong>MLS & Co</strong> is a premier full-service law firm headquartered in India, 
            distinguished by strategic foresight, formidable court craft, and ethical leadership.
          </p>

          <p className="about-body">
            We partner with enterprises, statutory corporations, financial institutions, and private clients 
            to navigate complex cross-border transactions and resolve critical disputes before the Supreme Court, 
            High Courts, and specialized arbitral tribunals.
          </p>

          <div className="about-highlights-grid">
            <div className="about-highlight-item">
              <div className="highlight-icon"><Award size={18} /></div>
              <div>
                <h4>Excellence & Precision</h4>
                <p>Meticulous legal research and assertive oral advocacy.</p>
              </div>
            </div>
            <div className="about-highlight-item">
              <div className="highlight-icon"><Users size={18} /></div>
              <div>
                <h4>Multidisciplinary Bench</h4>
                <p>Cross-practice mastery from corporate advisory to criminal defense.</p>
              </div>
            </div>
          </div>

          <div className="about-cta-row">
            <Link to="/legacy" className="about-btn-primary">
              <span>Explore Our Legacy</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/team" className="about-btn-secondary">
              <Compass size={16} />
              <span>Meet The Leadership</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
