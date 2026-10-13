import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Send, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useTheme } from './ThemeContext';

const DISPUTE_DOMAINS = [
  "Civil & Constitutional Writs",
  "Commercial Arbitration & ADR",
  "Corporate Governance & M&A",
  "White-Collar & Criminal Defense",
  "Real Estate & Infrastructure",
  "Taxation & Revenue Law",
  "Intellectual Property & Tech",
  "Labour & Employment",
];

const ContactForm = () => {
  const { isDarkTheme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    disputeType: '',
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
    };

    const request = axios.post('http://localhost:5000/form', postData);

    try {
      await toast.promise(request, {
        loading: 'Transmitting to Chambers Registry…',
        success: 'Intake received — Chambers Registry will respond shortly.',
        error: 'Transmission failed — please call Chambers directly.',
      });
      setSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', disputeType: '', query: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`contact-form snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="contact" aria-label="Consult chambers">
      <style>{`
        .contact-form {
          position: relative;
          min-height: calc(100vh - var(--nav-height, 80px));
          min-height: calc(100svh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 2rem 1rem;
          padding-left: max(2rem, var(--sal));
          padding-right: max(2rem, var(--sar));
          overflow: hidden;
          overflow: clip;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .contact-form.dark-theme {
          background: radial-gradient(circle at 85% 50%, #14161E 0%, #0A0B0E 75%);
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
          justify-content: center;
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
          margin-bottom: 0.4rem;
          white-space: nowrap;
        }
        .contact-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 2.4vw, 2.1rem);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.2;
          margin: 0 0 0.2rem;
          text-wrap: balance;
        }
        .contact-subtitle {
          font-size: 0.8rem;
          line-height: 1.6;
          opacity: 0.75;
          margin: 0;
        }
        .contact-split-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 2rem;
          align-items: start;
        }
        .contact-info-card {
          padding: 1.4rem 1.6rem;
          border-radius: var(--r-lg);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-sizing: border-box;
        }
        .contact-form-panel {
          padding: 1.4rem 1.85rem;
          border-radius: var(--r-lg);
          box-sizing: border-box;
          min-width: 0;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          min-width: 0;
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
        .info-text {
          min-width: 0;
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
          line-height: 1.5;
          opacity: 0.85;
          overflow-wrap: anywhere;
        }
        .confidentiality-chip {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.55rem 0.75rem;
          border-radius: 6px;
          background: rgba(197, 160, 89, 0.06);
          border: 1px solid rgba(197, 160, 89, 0.18);
          font-size: 0.72rem;
          line-height: 1.4;
          opacity: 0.85;
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
          gap: 0.25rem;
          margin-bottom: 0.75rem;
          min-width: 0;
        }
        .form-field.tight {
          margin: 0;
        }
        .form-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.75;
        }
        .form-input, .form-select, .form-textarea {
          padding: 0.6rem 0.8rem;
          min-height: 44px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid rgba(197, 160, 89, 0.24);
          color: inherit;
          outline: none;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
          transition: border-color var(--dur-pop) var(--ease-out), box-shadow var(--dur-pop) var(--ease-out);
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
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15);
        }
        .form-select option {
          color: #171A21;
        }
        .form-textarea {
          resize: vertical;
          min-height: 96px;
          line-height: 1.55;
        }
        .form-submit-btn {
          width: 100%;
        }
        .form-submit-btn:disabled {
          opacity: 0.65;
          cursor: wait;
          transform: none;
        }
        .submitted-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 1rem;
          border-radius: 8px;
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid rgba(197, 160, 89, 0.35);
          color: #C5A059;
          font-size: 0.84rem;
          line-height: 1.55;
          font-weight: 600;
        }
        .home-mini-footer {
          width: 100%;
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(197, 160, 89, 0.16);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.72rem;
          box-sizing: border-box;
          opacity: 0.85;
        }
        .mini-footer-left {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          min-width: 0;
          flex-wrap: wrap;
        }
        .mini-footer-brand {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: #C5A059;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .mini-footer-divider {
          opacity: 0.35;
        }
        .mini-footer-jurisdiction {
          opacity: 0.65;
          white-space: nowrap;
        }
        .mini-footer-nav {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          flex-wrap: wrap;
        }
        .mini-footer-link {
          color: inherit;
          text-decoration: none;
          opacity: 0.75;
          font-weight: 500;
          transition: color var(--dur-pop) var(--ease-out), opacity var(--dur-pop) var(--ease-out);
          background: none;
          border: none;
          padding: 0.3rem 0;
          font-size: 0.72rem;
          font-family: inherit;
          cursor: pointer;
          min-height: 32px;
          display: inline-flex;
          align-items: center;
        }
        .mini-footer-right {
          font-size: 0.68rem;
          letter-spacing: 0.03em;
          opacity: 0.65;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          white-space: nowrap;
        }
        @media (hover: hover) and (pointer: fine) {
          .mini-footer-link:hover {
            color: #C5A059;
            opacity: 1;
          }
        }
        @media (max-width: 900px) {
          .contact-split-grid { grid-template-columns: 1fr; gap: 1rem; }
          .contact-info-card { display: none; }
          .mini-footer-jurisdiction { display: none; }
          .mini-footer-nav { gap: 0.65rem; }
        }
        @media (max-width: 768px) {
          .contact-form { padding: 2.5rem 1.1rem 1rem; align-items: flex-start; }
          .contact-title { font-size: clamp(1.45rem, 6.5vw, 1.9rem); }
          .contact-subtitle { font-size: 0.86rem; }
          .contact-form-panel { padding: 1.2rem 1.1rem; }
          .form-row-grid { grid-template-columns: 1fr; }
          .home-mini-footer { flex-direction: column; gap: 0.7rem; align-items: flex-start; }
          .mini-footer-nav { gap: 0.6rem 1rem; }
          .mini-footer-right { flex-wrap: wrap; }
        }
      `}</style>

      <div className="contact-form-container">
        <div className="contact-header">
          <div className="contact-badge">
            <ShieldCheck size={13} style={{ flexShrink: 0 }} />
            <span>Confidential Intake</span>
          </div>
          <h2 className="contact-title lux-crest-text">Consult Chambers & Advocates</h2>
          <p className="contact-subtitle">
            Direct intake for High Court, Supreme Court, or Corporate Counsel representation.
          </p>
        </div>

        <div className="contact-split-grid">
          <div className="contact-info-card lux-card">
            <div className="info-item">
              <div className="info-icon"><MapPin size={16} /></div>
              <div className="info-text">
                <div className="info-title">Chambers Registry</div>
                <div className="info-val">D.No: 48-18-4/2, Nagarjuna Nagar, Ring Road, Vijayawada, Andhra Pradesh, 520008</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Phone size={16} /></div>
              <div className="info-text">
                <div className="info-title">Chambers Direct Lines</div>
                <div className="info-val">+91 93905 13198 / +91 94401 75789</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Mail size={16} /></div>
              <div className="info-text">
                <div className="info-title">Electronic Registry</div>
                <div className="info-val">contact@mlslawfirm.com</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Clock size={16} /></div>
              <div className="info-text">
                <div className="info-title">Registry Hours</div>
                <div className="info-val">Mon &ndash; Sat: 09:30 AM &ndash; 08:30 PM</div>
              </div>
            </div>

            <div className="confidentiality-chip">
              <ShieldCheck size={15} color="#C5A059" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Protected under statutory Advocate-Client Privilege (Section 126, Evidence Act).</span>
            </div>
          </div>

          <div className="contact-form-panel lux-card">
            {submitted ? (
              <div className="submitted-notice" role="status">
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>Your confidential intake petition has been received by Chambers Registry. A designated associate will connect with you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="form-row-grid">
                  <div className="form-field tight">
                    <label className="form-label" htmlFor="cf-name">Full Name</label>
                    <input
                      id="cf-name"
                      type="text"
                      name="fullName"
                      className="form-input"
                      placeholder="e.g. Adv. R. Verma / John Doe"
                      required
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field tight">
                    <label className="form-label" htmlFor="cf-email">Email Address</label>
                    <input
                      id="cf-email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="e.g. counsel@enterprise.com"
                      required
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-field tight">
                    <label className="form-label" htmlFor="cf-phone">Direct Phone</label>
                    <input
                      id="cf-phone"
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field tight">
                    <label className="form-label" htmlFor="cf-domain">Dispute / Practice Domain</label>
                    <select
                      id="cf-domain"
                      name="disputeType"
                      className="form-select"
                      required
                      value={formData.disputeType}
                      onChange={handleChange}
                    >
                      <option value="">Select Domain...</option>
                      {DISPUTE_DOMAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cf-query">Brief Summary of Legal Query</label>
                  <textarea
                    id="cf-query"
                    name="query"
                    className="form-textarea"
                    placeholder="Provide a confidential synopsis of your court matter, tribunal notice, or corporate contract..."
                    required
                    enterKeyHint="send"
                    value={formData.query}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="form-submit-btn lux-btn-gold" disabled={loading}>
                  <Send size={14} />
                  <span>{loading ? "Transmitting to Registry..." : "Transmit Intake Request"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="home-mini-footer">
          <div className="mini-footer-left">
            <span className="mini-footer-brand">MLS & Co.</span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="mini-footer-divider">&bull;</span>
            <span className="mini-footer-jurisdiction">High Courts & Supreme Court of India</span>
          </div>

          <div className="mini-footer-nav">
            <Link to="/legacy" className="mini-footer-link">Legacy</Link>
            <Link to="/practice-areas" className="mini-footer-link">Practices</Link>
            <Link to="/people" className="mini-footer-link">Our People</Link>
            <Link to="/blogs" className="mini-footer-link">Insights</Link>
            <Link to="/careers" className="mini-footer-link">Careers</Link>
          </div>

          <div className="mini-footer-right">
            <span>BCI Disclaimer Compliant</span>
            <span className="mini-footer-divider">&bull;</span>
            <span>Engineered by JSM VALOR</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
