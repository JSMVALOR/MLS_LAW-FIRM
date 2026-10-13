import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Team.css";
import { useTheme } from "./ThemeContext";
import { Briefcase, Scale } from "lucide-react";

const Team = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamData = {
    leadership: [
      {
        name: "Dr. Sattaru Rajani",
        designation: "Managing Director",
        description: "Leading the firm with over 20 years of legal expertise and strategic vision.",
        image: "/praksh.png",
        icon: <Briefcase size={20} />
      },
      {
        name: "Dr. Mojjada Ramakrishna",
        designation: "District and Sessions Judge (Retd.)",
        description: "Bringing decades of judicial wisdom and impartial insight to our practice.",
        image: "/praksh.png",
        icon: <Scale size={20} />
      }
    ],
    seniorPartners: [
      {
        name: "Adv. Muzammil Mushtaq",
        designation: "Founder Partner",
        description: "Specializing in Constitutional and Civil litigation with a focus on human rights.",
        image: "/praksh.png"
      },
      {
        name: "Adv. Lone Shabir",
        designation: "Managing Partner",
        description: "Expert in Corporate Law and Dispute Resolution strategies.",
        image: "/praksh.png"
      }
    ],
    associates: [
      {
        name: "M.S.S. Swayam Prakash Babu",
        designation: "Principal associate",
        description: "Focused on Intellectual Property and Media Law.",
        image: "/praksh.png"
      },
      {
        name: "Akhil chowdary",
        designation: "Associate",
        description: "Specialist in Criminal Defense and Family Law matters.",
        image: "/praksh.png"
      },
      {
        name: "Yaswini",
        designation: "Associate",
        description: "Handling Real Estate and Commercial contracts.",
        image: "/praksh.png"
      }
    ]
  };

  const TeamSection = ({ title, members, className }) => (
    <div className={`team-section ${className}`}>
      <h2 className="section-title">{title}</h2>
      <div className="members-grid">
        {members.map((member, index) => (
          <div key={index} className="team-card">
            <div className="card-inner">
              <div className="image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                {member.icon && <div className="member-icon">{member.icon}</div>}
              </div>
              <div className="info-wrapper">
                <h3>{member.name}</h3>
                <p className="designation">{member.designation}</p>
                <p className="description">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`team-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="team-header">
        <h1>Our Professional Team</h1>
        <p>A collective of legal minds dedicated to excellence and justice.</p>
      </div>

      <div className="team-content">
        <TeamSection title="Board of Directors" members={teamData.leadership} className="leadership-section" />
        <TeamSection title="Our Employees" members={teamData.associates} className="associates-section" />
      </div>

      <div className="back-button-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Team;
