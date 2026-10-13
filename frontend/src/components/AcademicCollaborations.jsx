import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, ArrowRight, Landmark, Calendar } from "lucide-react";
import { useTheme } from "./ThemeContext";

const COLLABS = [
  {
    icon: Landmark,
    title: "University MOU Programmes",
    desc: "Semester residencies, credit internships & joint research chairs with our MOU partner universities.",
    meta: "MOU Partners: VIT-AP • KL University",
  },
  {
    icon: Calendar,
    title: "Event Sponsorships",
    desc: "Title & co-sponsorships for national moots, law fests, conclaves and inter-university competitions.",
    meta: "Moots • Fests • Conclaves",
  },
  {
    icon: BookOpen,
    title: "Guest Lectures & Modules",
    desc: "Practice-led modules on writs, arbitration, PMLA defence & DPDP compliance taught on campus.",
    meta: "40+ Sessions / Year",
  },
  {
    icon: Users,
    title: "Moot & Research Mentorship",
    desc: "Brief drafting labs, memorial reviews & oral-advocacy coaching for national moot contingents.",
    meta: "National Circuits",
  },
];

const AcademicCollaborations = () => {
  const { isDarkTheme } = useTheme();

  return (
    <section className={`acad-collab snap-slide ${isDarkTheme ? "dark-theme" : "light-theme"}`} id="collaborations" aria-label="Academic collaborations">
      <style>{`
        .acad-collab {
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
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: background-color 0.4s ease, color 0.4s ease;
        }
        .acad-collab.dark-theme { background: radial-gradient(circle at 50% 20%, #14161E 0%, #0A0B0E 78%); color: #ECECF0; }
        .acad-collab.light-theme { background: radial-gradient(circle at 50% 20%, #FFFFFF 0%, #F8F6F0 78%); color: #171A21; }
        .acad-container { max-width: 1180px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .acad-badge {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.28rem 0.85rem; border-radius: 9999px;
          background: rgba(197,160,89,0.08); border: 1px solid rgba(197,160,89,0.22); color: #C5A059;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 0.6rem; white-space: nowrap;
        }
        .acad-heading {
          font-family: 'Cinzel', serif; font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
          letter-spacing: 0; line-height: 1.2; margin: 0 0 0.4rem; text-align: center; text-wrap: balance;
        }
        .acad-sub {
          font-size: 0.88rem; line-height: 1.6; opacity: 0.78; margin: 0 0 1.4rem;
          text-align: center; max-width: 62ch; text-wrap: pretty;
        }
        .acad-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; width: 100%; margin-bottom: 1.4rem; }
        .acad-card {
          padding: 1.3rem 1.15rem; border-radius: var(--r-lg);
          display: flex; flex-direction: column; gap: 0.6rem; min-width: 0;
          transition: transform var(--dur-drop) var(--ease-out);
          opacity: 0; animation: acadIn 450ms var(--ease-out) forwards;
        }
        .acad-card:nth-child(1) { animation-delay: 60ms; }
        .acad-card:nth-child(2) { animation-delay: 120ms; }
        .acad-card:nth-child(3) { animation-delay: 180ms; }
        .acad-card:nth-child(4) { animation-delay: 240ms; }
        @keyframes acadIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .acad-icon {
          width: 36px; height: 36px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          background: rgba(197,160,89,0.1); color: #C5A059; border: 1px solid rgba(197,160,89,0.22);
        }
        .acad-card-title { font-size: 0.92rem; font-weight: 700; line-height: 1.3; margin: 0; }
        .acad-card-desc { font-size: 0.78rem; line-height: 1.55; opacity: 0.8; margin: 0; flex: 1; }
        .acad-card-meta { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #C5A059; }
        .acad-mou-strip {
          display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;
          width: 100%; max-width: 720px; margin: 0 auto 1.4rem; padding: 1rem 1.5rem;
          border-radius: var(--r-lg); box-sizing: border-box;
        }
        body.dark-theme .acad-mou-strip, .acad-collab.dark-theme .acad-mou-strip { background: rgba(255,255,255,0.94); border: 1px solid rgba(197,160,89,0.35); }
        .acad-collab.light-theme .acad-mou-strip { background: #fff; border: 1px solid rgba(197,160,89,0.3); box-shadow: 0 10px 26px rgba(0,0,0,0.06); }
        .acad-mou-label { font-size: 0.64rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8C661D; white-space: nowrap; }
        .acad-mou-logo { height: 40px; width: auto; max-width: 150px; object-fit: contain; display: block; }
        .acad-cta-row { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
        .acad-btn-arrow { transition: transform var(--dur-pop) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          .acad-card:hover { transform: translateY(-3px); }
          .lux-btn-gold:hover .acad-btn-arrow { transform: translateX(3px); }
        }
        @media (max-width: 992px) { .acad-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
          .acad-collab { padding: 2.5rem 1.1rem 2rem; align-items: flex-start; }
          .acad-heading { font-size: clamp(1.45rem, 6.5vw, 1.9rem); }
          .acad-sub { font-size: 0.88rem; }
          .acad-grid { grid-template-columns: 1fr; gap: 0.8rem; }
          .acad-card { padding: 1.1rem 1rem; }
          .acad-mou-strip { gap: 1rem; padding: 0.9rem 1rem; }
          .acad-mou-logo { height: 32px; max-width: 120px; }
          .acad-cta-row { width: 100%; max-width: 420px; flex-direction: column; align-items: stretch; }
          .acad-cta-row .lux-btn-gold, .acad-cta-row .lux-btn-ghost { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .acad-card { animation: none; opacity: 1; }
        }
      `}</style>

      <div className="acad-container">
        <div className="acad-badge">
          <GraduationCap size={13} style={{ flexShrink: 0 }} />
          <span>Academia & Chambers Bridge</span>
        </div>
        <h2 className="acad-heading lux-crest-text">Academic Collaborations</h2>
        <p className="acad-sub">
          MLS &amp; Co. partners with law schools, judicial academies and research centres to
          translate courtroom practice into classroom doctrine — through residencies,
          sponsorships, guest modules and moot mentorship.
        </p>

        <div className="acad-grid">
          {COLLABS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="acad-card lux-card">
                <div className="acad-icon"><Icon size={17} /></div>
                <h3 className="acad-card-title">{c.title}</h3>
                <p className="acad-card-desc">{c.desc}</p>
                <span className="acad-card-meta">{c.meta}</span>
              </div>
            );
          })}
        </div>

        <div className="acad-mou-strip" aria-label="MOU partner universities">
          <span className="acad-mou-label">MOU Partners</span>
          <img src="/vitap_logo.png" alt="VIT-AP University — MOU Partner" className="acad-mou-logo" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <img src="/kl_university_logo.png" alt="KL University — MOU Partner" className="acad-mou-logo" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>

        <div className="acad-cta-row">
          <Link to="/academic-collaborations" className="lux-btn-gold">
            <span>Explore Collaborations</span>
            <ArrowRight size={14} className="acad-btn-arrow" />
          </Link>
          <Link to="/careers" className="lux-btn-ghost">
            <span>Apply for Clerkship</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AcademicCollaborations;
