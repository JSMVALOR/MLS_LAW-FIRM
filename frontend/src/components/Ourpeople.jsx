import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, UserCheck } from "lucide-react";
import { useTheme } from "./ThemeContext";

const PARTNERS = [
  {
    name: "Dr. Sattaru Rajani",
    designation: "Managing Partner",
    qualifications: "B.A.L., LL.M., Ph.D. in Constitutional Law",
    experience: "24+ Years Standing",
    specialty: "High Court & Supreme Court Appellate Practice, Constitutional Writs & Corporate Advisory",
    image: "/swaroop.png"
  },
  {
    name: "Dr. Mojjada Ramakrishna",
    designation: "Senior Partner & Judicial Counsel",
    qualifications: "Former District & Sessions Judge (Retd.)",
    experience: "32+ Years Judicial & Legal Career",
    specialty: "Commercial Arbitration, Complex Civil Trials, Criminal Jurisprudence & Regulatory Strategy",
    image: "/swaroop.png"
  }
];

const OurPeople = () => {
  const { isDarkTheme } = useTheme();

  return (
    <section className={`our-people snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="people" aria-label="Senior partnership">
      <style>{`
        .our-people {
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
        .our-people.dark-theme {
          background: radial-gradient(circle at 50% 25%, #14161E 0%, #0A0B0E 75%);
          color: #ECECF0;
        }
        .our-people.light-theme {
          background: radial-gradient(circle at 50% 25%, #FFFFFF 0%, #F8F6F0 75%);
          color: #171A21;
        }
        .our-people-container {
          max-width: 1140px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .people-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.85rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: #C5A059;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
          white-space: nowrap;
        }
        .our-people-heading {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.2;
          margin: 0 0 0.35rem;
          text-align: center;
          text-wrap: balance;
        }
        .our-people-subtext {
          font-size: 0.84rem;
          line-height: 1.6;
          opacity: 0.75;
          margin: 0 0 1.5rem;
          text-align: center;
          max-width: 56ch;
        }
        .partners-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          width: 100%;
          max-width: 980px;
          margin-bottom: 1.5rem;
        }
        .partner-card {
          display: flex;
          gap: 1.4rem;
          padding: 1.6rem;
          border-radius: var(--r-lg);
          box-sizing: border-box;
          transition: transform var(--dur-drop) var(--ease-out), box-shadow 250ms var(--ease-out);
          min-width: 0;
          opacity: 0;
          animation: partnerIn 500ms var(--ease-out) forwards;
        }
        .partner-card:nth-child(1) { animation-delay: 80ms; }
        .partner-card:nth-child(2) { animation-delay: 160ms; }
        @keyframes partnerIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .partner-avatar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          flex-shrink: 0;
        }
        .partner-image-wrapper {
          width: 110px;
          height: 125px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(197, 160, 89, 0.35);
          background: rgba(197, 160, 89, 0.06);
          flex-shrink: 0;
        }
        .partner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .partner-tenure-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #C5A059;
          padding: 0.25rem 0.55rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.22);
          white-space: nowrap;
        }
        .partner-details-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }
        .partner-name {
          font-family: 'Cinzel', serif;
          font-size: 1.18rem;
          font-weight: 700;
          letter-spacing: 0;
          margin: 0 0 0.25rem;
          line-height: 1.3;
        }
        .partner-title {
          font-size: 0.76rem;
          font-weight: 700;
          color: #C5A059;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }
        .partner-creds {
          font-size: 0.74rem;
          line-height: 1.5;
          opacity: 0.75;
          margin-bottom: 0.65rem;
          overflow-wrap: anywhere;
        }
        .partner-desc {
          font-size: 0.78rem;
          line-height: 1.55;
          opacity: 0.85;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .people-action-row {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .people-view-all-btn {
          max-width: 100%;
        }
        .people-view-all-btn span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        @media (hover: hover) and (pointer: fine) {
          .partner-card:hover {
            transform: translateY(-3px);
          }
          body.dark-theme .partner-card:hover {
            box-shadow: 0 28px 64px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(242, 227, 198, 0.09);
          }
        }
        @media (max-width: 860px) {
          .partners-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
        @media (max-width: 768px) {
          .our-people { padding: 2.5rem 1.1rem 2rem; align-items: flex-start; }
          .our-people-heading { font-size: clamp(1.45rem, 6.5vw, 1.9rem); }
          .our-people-subtext { font-size: 0.88rem; max-width: 38ch; }
          .partners-grid { gap: 0.85rem; margin-bottom: 1.1rem; }
          .partner-card { gap: 1rem; padding: 1.1rem 1rem; align-items: flex-start; }
          .partner-image-wrapper { width: 84px; height: 96px; }
          .partner-tenure-tag { font-size: 0.6rem; }
          .partner-name { font-size: 1.02rem; }
          .partner-title { font-size: 0.7rem; }
          .people-view-all-btn { width: 100%; max-width: 420px; }
        }
        @media (max-width: 380px) {
          .partner-card { gap: 0.85rem; padding: 1rem 0.9rem; }
          .partner-image-wrapper { width: 72px; height: 84px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-card { animation: none; opacity: 1; }
        }
      `}</style>

      <div className="our-people-container">
        <div className="people-badge">
          <UserCheck size={13} style={{ flexShrink: 0 }} />
          <span>Senior Bench & Partnership</span>
        </div>
        <h2 className="our-people-heading lux-crest-text">Distinguished Leadership</h2>
        <p className="our-people-subtext">
          Seasoned litigators, former judicial officers, and legal scholars driving courtroom triumph.
        </p>

        <div className="partners-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="partner-card lux-card">
              <div className="partner-avatar-col">
                <div className="partner-image-wrapper">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="partner-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <div className="partner-tenure-tag">
                  <Award size={12} style={{ flexShrink: 0 }} />
                  <span>{partner.experience}</span>
                </div>
              </div>

              <div className="partner-details-col">
                <h3 className="partner-name">{partner.name}</h3>
                <span className="partner-title">{partner.designation}</span>
                <span className="partner-creds">{partner.qualifications}</span>
                <p className="partner-desc" title={partner.specialty}>{partner.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="people-action-row">
          <Link to="/team" className="people-view-all-btn lux-btn-ghost">
            <span>Explore Full Chambers Registry</span>
            <ArrowRight size={14} style={{ flexShrink: 0 }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPeople;
