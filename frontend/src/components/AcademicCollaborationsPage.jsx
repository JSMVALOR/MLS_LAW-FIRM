import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Landmark, Calendar, BookOpen, Users, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useTheme } from "./ThemeContext";

const PARTNERS = [
  { name: "VIT-AP University", type: "MOU Partner", focus: "Semester residencies, credit internships & joint research programmes.", logo: "/vitap_logo.png" },
  { name: "KL University", type: "MOU Partner", focus: "Chamber attachments, guest modules & moot mentorship.", logo: "/kl_university_logo.png" },
];

const TRACKS = [
  { icon: Landmark, title: "Semester Residency", points: ["8–16 week chamber attachment", "Live writ & arbitration files (redacted)", "Weekly mentor review with counsel"] },
  { icon: Calendar, title: "Event Sponsorships", points: ["Title & co-sponsorships for moots and law fests", "Cash prizes, internships & chambers trophies", "Branded conclaves with partner universities"] },
  { icon: BookOpen, title: "Guest Modules", points: ["Writs, PMLA, DPDP, RERA", "Case-file simulations", "On-campus + chambers hybrid"] },
  { icon: Users, title: "Moot Mentorship", points: ["Memorial structuring labs", "Two oral-advocacy sparring rounds", "Bench-memo feedback reports"] },
];

const AcademicCollaborationsPage = () => {
  const { isDarkTheme } = useTheme();
  return (
    <div className={`acad-page ${isDarkTheme ? "dark" : "light"}`}>
      <style>{`
        .acad-page { min-height: 100vh; width: 100%; padding: 110px 0 80px; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
        .acad-page.dark { background: #0C0D11; color: #ECECF0; }
        .acad-page.light { background: #FAF9F5; color: #171A21; }
        .acad-wrap { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .acad-eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #C5A059; background: rgba(197,160,89,0.08); border: 1px solid rgba(197,160,89,0.24); padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1rem; }
        .acad-h1 { font-family: 'Cinzel', serif; font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.15; margin: 0 0 0.8rem; }
        .acad-page.dark .acad-h1 { background: linear-gradient(135deg, #fff 40%, #C5A059 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .acad-lead { font-size: 1.02rem; line-height: 1.7; opacity: 0.82; max-width: 70ch; margin: 0 0 2.5rem; }
        .acad-sec-title { font-family: 'Cinzel', serif; font-size: 1.5rem; margin: 0 0 0.4rem; }
        .acad-sec-sub { font-size: 0.88rem; opacity: 0.72; margin: 0 0 1.4rem; }
        .acad-tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 3rem; }
        .acad-track { padding: 1.5rem; border-radius: 12px; }
        .acad-page.dark .acad-track { background: #12141B; border: 1px solid rgba(197,160,89,0.2); }
        .acad-page.light .acad-track { background: #fff; border: 1px solid rgba(197,160,89,0.25); box-shadow: 0 10px 26px rgba(0,0,0,0.05); }
        .acad-track-head { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.9rem; }
        .acad-track-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(197,160,89,0.1); color: #C5A059; border: 1px solid rgba(197,160,89,0.22); flex-shrink: 0; }
        .acad-track-title { font-size: 1rem; font-weight: 700; margin: 0; }
        .acad-point { display: flex; gap: 0.55rem; align-items: flex-start; font-size: 0.84rem; line-height: 1.5; opacity: 0.88; margin-bottom: 0.5rem; }
        .acad-partners { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 3rem; }
        .acad-partner { padding: 1.5rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start; }
        .acad-page.dark .acad-partner { background: rgba(18,20,27,0.7); border: 1px solid rgba(197,160,89,0.18); }
        .acad-page.light .acad-partner { background: #fff; border: 1px solid rgba(197,160,89,0.22); }
        .acad-partner-type { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #C5A059; margin-bottom: 0.35rem; display: block; }
        .acad-partner-logo { height: 48px; width: auto; max-width: 200px; object-fit: contain; display: block; background: #fff; padding: 0.4rem 0.7rem; border-radius: 8px; border: 1px solid rgba(197,160,89,0.25); }
        .acad-partner-name { font-size: 0.92rem; font-weight: 700; margin: 0 0 0.3rem; line-height: 1.35; }
        .acad-partner-focus { font-size: 0.78rem; opacity: 0.75; margin: 0; line-height: 1.5; }
        .acad-cta { padding: 2rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .acad-page.dark .acad-cta { background: linear-gradient(135deg, #12141B, #0E1015); border: 1px solid rgba(197,160,89,0.28); }
        .acad-page.light .acad-cta { background: #fff; border: 1px solid rgba(197,160,89,0.3); }
        .acad-cta h3 { font-family: 'Cinzel', serif; font-size: 1.4rem; margin: 0 0 0.4rem; }
        .acad-cta p { font-size: 0.86rem; opacity: 0.75; margin: 0; max-width: 52ch; line-height: 1.6; }
        .acad-btn { font-family: inherit; }
        @media (max-width: 900px) { .acad-tracks { grid-template-columns: 1fr; } .acad-partners { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) {
          .acad-page { padding: 92px 0 60px; }
          .acad-wrap { padding: 0 1.1rem; }
          .acad-partners { grid-template-columns: 1fr; }
          .acad-cta { padding: 1.5rem; }
          .acad-btn { width: 100%; justify-content: center; }
        }
      `}</style>
      <div className="acad-wrap">
        <span className="acad-eyebrow"><GraduationCap size={13} /> Independent Programme Page</span>
        <h1 className="acad-h1">Academic Collaborations</h1>
        <p className="acad-lead">
          A standing bridge between chambers practice and legal scholarship. Through formal MOUs
          with VIT-AP University and KL University, MLS &amp; Co. delivers residencies,
          clerkships, guest modules and moot mentorship — each track supervised by practising counsel.
        </p>

        <h2 className="acad-sec-title">Collaboration Tracks</h2>
        <p className="acad-sec-sub">Four structured tracks. Every cohort is capped for mentor bandwidth.</p>
        <div className="acad-tracks">
          {TRACKS.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="acad-track">
                <div className="acad-track-head">
                  <div className="acad-track-icon"><Icon size={17} /></div>
                  <h3 className="acad-track-title">{t.title}</h3>
                </div>
                {t.points.map((p, j) => (
                  <div key={j} className="acad-point"><CheckCircle2 size={15} color="#C5A059" style={{ flexShrink: 0, marginTop: 2 }} /><span>{p}</span></div>
                ))}
              </div>
            );
          })}
        </div>

        <h2 className="acad-sec-title">MOU Partner Universities</h2>
        <p className="acad-sec-sub">Formal memoranda of understanding signed with two leading universities.</p>
        <div className="acad-partners">
          {PARTNERS.map((p, i) => (
            <div key={i} className="acad-partner">
              <span className="acad-partner-type">{p.type}</span>
              <img src={p.logo} alt={`${p.name} — MOU Partner`} className="acad-partner-logo" loading="lazy" decoding="async" />
              <h3 className="acad-partner-name">{p.name}</h3>
              <p className="acad-partner-focus">{p.focus}</p>
            </div>
          ))}
        </div>

        <div className="acad-cta">
          <div>
            <h3>Propose an institutional collaboration</h3>
            <p>Share your institution profile, cohort size and preferred term. Chambers Academic Desk responds within 5 working days.</p>
          </div>
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
            <Link to="/careers" className="acad-btn lux-btn-gold"><span>Apply via Careers</span><ArrowRight size={14} /></Link>
            <a className="acad-btn lux-btn-ghost" href="mailto:contact@mlslawfirm.com"><Mail size={14} /><span>Academic Desk</span></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCollaborationsPage;
