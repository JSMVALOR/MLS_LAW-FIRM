import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Send, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useTheme } from './ThemeContext';

const ContactForm = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    disputeType: '',
    flexibleHours: '',
    query: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      query: formData.query,
      dispute: formData.disputeType,
      freetime: formData.flexibleHours
    };

    try {
      await axios.post('http://localhost:5000/form', postData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        disputeType: '',
        flexibleHours: '',
        query: ''
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`contact-form snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="contact">
      <style>{`
        .contact-form {
          position: relative;
          height: calc(100vh - var(--nav-height, 80px)) !important;
          max-height: calc(100vh - var(--nav-height, 80px)) !important;
          min-height: calc(100vh - var(--nav-height, 80px)) !important;
          scroll-snap-align: start !important;
          scroll-snap-stop: always !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 2rem 0.85rem;
          overflow: hidden;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .contact-form.dark-theme {
          background: radial-gradient(circle at 85% 50%, #13151D 0%, #0A0B0E 75%);
          color: #ECECF0;
        }
        .contact-form.light-theme {
          background: radial-gradient(circle at 85% 50%, #FFFFFF 0%, #F9F8F5 75%);
          color: #171A21;
        }
        .contact-form-container {
          max-width: 1220px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          box-sizing: border-box;
        }
        .contact-header {
          margin-bottom: 0.75rem;
          text-align: center;
        }
        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.24rem 0.8rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: #C5A059;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }
        .contact-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 2.4vw, 2.1rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 0.2rem;
        }
        .contact-form.dark-theme .contact-title {
          background: linear-gradient(135deg, #FFFFFF 50%, #C5A059 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-form.light-theme .contact-title {
          color: #171A21;
        }
        .contact-subtitle {
          font-size: 0.8rem;
          opacity: 0.75;
          margin: 0;
        }
        .contact-split-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 2rem;
          align-items: center;
          max-height: 480px;
        }
        /* Left: Info Card */
        .contact-info-card {
          padding: 1.4rem 1.6rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-sizing: border-box;
        }
        .contact-form.dark-theme .contact-info-card {
          background: rgba(18, 20, 27, 0.7);
          border: 1px solid rgba(197, 160, 89, 0.2);
        }
        .contact-form.light-theme .contact-info-card {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(197, 160, 89, 0.22);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
        }
        .info-icon {
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
        .info-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #C5A059;
          margin-bottom: 2px;
        }
        .info-val {
          font-size: 0.8rem;
          line-height: 1.4;
          opacity: 0.85;
        }
        .confidentiality-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.75rem;
          border-radius: 6px;
          background: rgba(197, 160, 89, 0.06);
          border: 1px solid rgba(197, 160, 89, 0.18);
          font-size: 0.72rem;
          line-height: 1.35;
          opacity: 0.85;
        }
        /* Right: Interactive Form */
        .contact-form-panel {
          padding: 1.4rem 1.85rem;
          border-radius: 12px;
          box-sizing: border-box;
        }
        .contact-form.dark-theme .contact-form-panel {
          background: rgba(18, 20, 27, 0.8);
          border: 1px solid rgba(197, 160, 89, 0.22);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }
        .contact-form.light-theme .contact-form-panel {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(197, 160, 89, 0.25);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }
        .form-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
          margin-bottom: 0.75rem;
        }
        .form-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          opacity: 0.75;
        }
        .form-input, .form-select, .form-textarea {
          padding: 0.52rem 0.8rem;
          border-radius: 6px;
          font-size: 0.82rem;
          background: transparent;
          border: 1px solid rgba(197, 160, 89, 0.24);
          color: inherit;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .contact-form.dark-theme .form-input,
        .contact-form.dark-theme .form-select,
        .contact-form.dark-theme .form-textarea {
          background: rgba(12, 14, 18, 0.6);
        }
        .contact-form.light-theme .form-input,
        .contact-form.light-theme .form-select,
        .contact-form.light-theme .form-textarea {
          background: #FFFFFF;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #C5A059;
        }
        .form-textarea {
          resize: none;
          height: 64px;
        }
        .form-submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.65rem;
          border-radius: 6px;
          background: #C5A059;
          color: #0E1015;
          border: none;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.22);
        }
        .form-submit-btn:hover {
          background: #D4AF37;
          transform: translateY(-1px);
        }
        .submitted-notice {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 1rem;
          border-radius: 8px;
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid rgba(197, 160, 89, 0.35);
          color: #C5A059;
          font-size: 0.84rem;
          font-weight: 600;
        }

        /* ========================================================
           HOME MINI TINY FOOTER (FRAMING THE BOTTOM OF CONTACT SLIDE)
           ======================================================== */
        .home-mini-footer {
          width: 100%;
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(197, 160, 89, 0.16);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          box-sizing: border-box;
          opacity: 0.85;
        }
        .mini-footer-left {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .mini-footer-brand {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: #C5A059;
          letter-spacing: 0.05em;
        }
        .mini-footer-divider {
          opacity: 0.35;
        }
        .mini-footer-jurisdiction {
          opacity: 0.65;
          display: inline-block;
        }
        .mini-footer-nav {
          display: flex;
          align-items: center;
          gap: 1.15rem;
        }
        .mini-footer-link {
          color: inherit;
          text-decoration: none;
          opacity: 0.75;
          font-weight: 500;
          transition: color 0.2s, opacity 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-size: 0.72rem;
          font-family: inherit;
        }
        .mini-footer-link:hover {
          color: #C5A059;
          opacity: 1;
        }
        .mini-footer-right {
          font-size: 0.68rem;
          letter-spacing: 0.03em;
          opacity: 0.65;
        }

        @media (max-width: 900px) {
          .contact-split-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .contact-info-card { display: none; }
          .mini-footer-jurisdiction { display: none; }
          .mini-footer-nav { gap: 0.65rem; }
        }
      `}</style>

      <div className="contact-form-container">
        <div className="contact-header">
          <div className="contact-badge">
            <ShieldCheck size={13} />
            <span>Confidential Intake</span>
          </div>
          <h2 className="contact-title">Consult Chambers & Advocates</h2>
          <p className="contact-subtitle">
            Direct intake for High Court, Supreme Court, or Corporate Counsel representation.
          </p>
        </div>

        <div className="contact-split-grid">
          {/* Left: Chambers Registry */}
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon">
                <MapPin size={16} />
              </div>
              <div>
                <div className="info-title">Chambers Registry</div>
                <div className="info-val">
                  D.No: 48-18-4/2, Nagarjuna Nagar, Ring Road, Vijayawada, Andhra Pradesh, 520008
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Phone size={16} />
              </div>
              <div>
                <div className="info-title">Chambers Direct Lines</div>
                <div className="info-val">+91 93905 13198 / +91 94401 75789</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={16} />
              </div>
              <div>
                <div className="info-title">Electronic Registry</div>
                <div className="info-val">contact@mlslawfirm.com</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Clock size={16} />
              </div>
              <div>
                <div className="info-title">Registry Hours</div>
                <div className="info-val">Mon &ndash; Sat: 09:30 AM &ndash; 08:30 PM</div>
              </div>
            </div>

            <div className="confidentiality-chip">
              <ShieldCheck size={15} color="#C5A059" style={{ flexShrink: 0 }} />
              <span>Protected under statutory Advocate-Client Privilege (Section 126, Evidence Act).</span>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="submitted-notice">
                <CheckCircle2 size={20} />
                <span>Your confidential intake petition has been received by Chambers Registry. A designated associate will connect with you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row-grid">
                  <div className="form-field" style={{ margin: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-input"
                      placeholder="e.g. Adv. R. Verma / John Doe"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field" style={{ margin: 0 }}>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="e.g. counsel@enterprise.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-field" style={{ margin: 0 }}>
                    <label className="form-label">Direct Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field" style={{ margin: 0 }}>
                    <label className="form-label">Dispute / Practice Domain</label>
                    <select
                      name="disputeType"
                      className="form-select"
                      required
                      value={formData.disputeType}
                      onChange={handleChange}
                    >
                      <option value="">Select Domain...</option>
                      <option value="Civil & Constitutional">Civil & Constitutional Writs</option>
                      <option value="Commercial Arbitration">Commercial Arbitration & ADR</option>
                      <option value="Corporate & M&A">Corporate Governance & M&A</option>
                      <option value="Criminal Defense">White-Collar & Criminal Defense</option>
                      <option value="Real Estate">Real Estate & Infrastructure</option>
                      <option value="Taxation">Taxation & Revenue Law</option>
                      <option value="IP & Tech">Intellectual Property & Tech</option>
                      <option value="Labour">Labour & Employment</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Brief Summary of Legal Query</label>
                  <textarea
                    name="query"
                    className="form-textarea"
                    placeholder="Provide a confidential synopsis of your court matter, tribunal notice, or corporate contract..."
                    required
                    value={formData.query}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={loading}
                >
                  <Send size={14} />
                  <span>{loading ? "Transmitting to Registry..." : "Transmit Intake Request"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Small Tiny Home Footer */}
        <div className="home-mini-footer">
          <div className="mini-footer-left">
            <span className="mini-footer-brand">MLS & Co.</span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="mini-footer-divider">&bull;</span>
            <span className="mini-footer-jurisdiction">High Courts & Supreme Court of India</span>
          </div>

          <div className="mini-footer-nav">
            <Link to="/legacy" className="mini-footer-link">Legacy</Link>
            <button
              type="button"
              className="mini-footer-link"
              onClick={() => onNavigate && onNavigate('practice')}
            >
              Practices
            </button>
            <Link to="/team" className="mini-footer-link">Our People</Link>
            <Link to="/blogs" className="mini-footer-link">Insights</Link>
            <Link to="/careers" className="mini-footer-link">Careers</Link>
          </div>

          <div className="mini-footer-right">
            <span>BCI Disclaimer Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
