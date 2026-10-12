import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, UserCheck } from "lucide-react";
import { useTheme } from "./ThemeContext";

const OurPeople = () => {
  const { isDarkTheme } = useTheme();

  const partners = [
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

  return (
    <section className={`our-people snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="people">
      <style>{`
        .our-people {
          position: relative;
          height: calc(100vh - var(--nav-height, 80px));
          max-height: calc(100vh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 2rem;
          overflow: hidden;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .our-people.dark-theme {
          background: radial-gradient(circle at 50% 50%, #12141C 0%, #0A0B0E 75%);
          color: #ECECF0;
        }
        .our-people.light-theme {
          background: radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8F6F0 75%);
          color: #171A21;
        }
        .our-people-container {
          max-width: 1140px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: center;
        }
        .our-people-header {
          text-align: center;
          margin-bottom: 1.5rem;
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
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .our-people-heading {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 0.35rem;
        }
        .our-people.dark-theme .our-people-heading {
          background: linear-gradient(135deg, #FFFFFF 50%, #C5A059 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .our-people.light-theme .our-people-heading {
          color: #171A21;
        }
        .our-people-subtext {
          font-size: 0.84rem;
          opacity: 0.75;
          margin: 0;
        }
        .partners-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
          max-width: 980px;
          margin-bottom: 1.5rem;
        }
        .partner-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.6rem;
          border-radius: 12px;
          box-sizing: border-box;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .our-people.dark-theme .partner-card {
          background: rgba(18, 20, 27, 0.75);
          border: 1px solid rgba(197, 160, 89, 0.22);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }
        .our-people.light-theme .partner-card {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(197, 160, 89, 0.25);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }
        .partner-card:hover {
          transform: translateY(-3px);
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
        }
        .partner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .partner-tenure-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: #C5A059;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.2);
          white-space: nowrap;
        }
        .partner-details-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .partner-name {
          font-family: 'Cinzel', serif;
          font-size: 1.18rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .partner-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #C5A059;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }
        .partner-creds {
          font-size: 0.74rem;
          opacity: 0.75;
          margin-bottom: 0.65rem;
        }
        .partner-desc {
          font-size: 0.78rem;
          line-height: 1.5;
          opacity: 0.85;
        }
        .people-action-row {
          display: flex;
          justify-content: center;
        }
        .people-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.45rem;
          border-radius: 6px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .people-view-all-btn:hover {
          border-color: #C5A059;
          color: #C5A059;
          transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .partners-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="our-people-container">
        <div className="our-people-header">
          <div className="people-badge">
            <UserCheck size={13} />
            <span>Senior Bench & Partnership</span>
          </div>
          <h2 className="our-people-heading">Distinguished Leadership</h2>
          <p className="our-people-subtext">
            Seasoned litigators, former judicial officers, and legal scholars driving courtroom triumph.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card">
              <div className="partner-avatar-col">
                <div className="partner-image-wrapper">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="partner-image"
                  />
                </div>
                <div className="partner-tenure-tag">
                  <Award size={12} />
                  <span>{partner.experience}</span>
                </div>
              </div>

              <div className="partner-details-col">
                <h3 className="partner-name">{partner.name}</h3>
                <span className="partner-title">{partner.designation}</span>
                <span className="partner-creds">{partner.qualifications}</span>
                <p className="partner-desc">{partner.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="people-action-row">
          <Link to="/team" className="people-view-all-btn">
            <span>Explore Full Chambers Registry & Associates</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPeople;
