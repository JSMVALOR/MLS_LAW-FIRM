import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, UserCheck } from "lucide-react";
import "../styles/Ourpeople.css";
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
      <div className="our-people-container">
        {/* Header */}
        <div className="our-people-header">
          <div className="people-badge">
            <UserCheck size={14} />
            <span>Senior Bench & Partnership</span>
          </div>
          <h2 className="our-people-heading">Distinguished Leadership</h2>
          <p className="our-people-subtext">
            Seasoned litigators, former judicial officers, and legal scholars driving courtroom triumph.
          </p>
        </div>

        {/* Partners Showcase Grid - Fits neatly in 1 slide */}
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
                  <div className="partner-image-glow" />
                </div>
                <div className="partner-tenure-tag">
                  <Award size={12} />
                  <span>{partner.experience}</span>
                </div>
              </div>

              <div className="partner-info-col">
                <div className="partner-role-badge">{partner.designation}</div>
                <h3 className="partner-name">{partner.name}</h3>
                <p className="partner-credentials">{partner.qualifications}</p>
                <div className="partner-divider" />
                <p className="partner-focus-label">Primary Practice Concentration:</p>
                <p className="partner-specialty">{partner.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Full Team */}
        <div className="our-people-footer">
          <Link to="/team" className="view-team-btn">
            <span>Explore Full Team & Counsel Bench</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPeople;
