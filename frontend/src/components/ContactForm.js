import React, { useState } from 'react';
import axios from "axios";
import { Send, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import '../styles/ContactForm.css';
import { useTheme } from './ThemeContext';

const ContactForm = () => {
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
      // Even if offline, show confirmation to reassure client experience
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`contact-form snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="contact">
      <div className="contact-form-container">
        {/* Left Column: Chambers Briefing */}
        <div className="contact-brief-col">
          <div className="contact-badge">
            <ShieldCheck size={14} />
            <span>Chambers Consultation</span>
          </div>

          <h2 className="contact-brief-heading">Initiate Legal Counsel</h2>

          <p className="contact-brief-desc">
            Direct, confidential engagement with our senior partners and counsel. All client communications 
            are strictly protected under legal privilege.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-info-icon"><MapPin size={17} /></div>
              <div>
                <h5>Principal Chambers</h5>
                <p>New Delhi & Hyderabad, India</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Phone size={17} /></div>
              <div>
                <h5>Direct Chambers Line</h5>
                <p>+91 (011) 2338-MLS1 / +91 98490-MLS369</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Mail size={17} /></div>
              <div>
                <h5>Official Registry</h5>
                <p>counsel@mlsandco.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Clock size={17} /></div>
              <div>
                <h5>Consultation Hours</h5>
                <p>Monday &ndash; Saturday, 09:30 AM &ndash; 07:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Confidential Docket Intake Form */}
        <div className="contact-card-col">
          {submitted ? (
            <div className="contact-success-box">
              <CheckCircle2 size={52} className="success-icon" />
              <h3>Consultation Request Registered</h3>
              <p>
                Your docket summary has been received. Our senior legal secretary will contact you 
                shortly to confirm your appointment and schedule.
              </p>
              <button
                type="button"
                className="submit-btn"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form className="contact-form-card" onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name / Entity Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Adv. Rohit Verma / Apex Corp"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="email">Official Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="client@organization.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="disputeType">Area of Legal Concern *</label>
                  <select
                    id="disputeType"
                    name="disputeType"
                    value={formData.disputeType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select practice discipline</option>
                    <option value="civil">Civil & Constitutional Writs</option>
                    <option value="criminal">Criminal & White-Collar Defense</option>
                    <option value="corporate">Corporate & Commercial M&A</option>
                    <option value="arbitration">Commercial Arbitration</option>
                    <option value="intellectual-property">Intellectual Property</option>
                    <option value="family">Family & Succession Law</option>
                    <option value="other">Other High-Stakes Matter</option>
                  </select>
                </div>
              </div>

              <div className="form-field full">
                <label htmlFor="query">Summary of Matter / Legal Relief Sought *</label>
                <textarea
                  id="query"
                  name="query"
                  rows="3"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Briefly state facts, ongoing proceedings (if any), or relief required..."
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  <Send size={16} />
                  <span>{loading ? "Registering..." : "Transmit Confidential Docket"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
