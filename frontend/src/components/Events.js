import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight, History, Sparkles, Users } from "lucide-react";
import { useTheme } from "./ThemeContext";

const UPCOMING = [
  {
    id: "u1",
    title: "National Symposium on Writ Remedies & Judicial Review",
    date: "March 14, 2027",
    time: "10:00 AM – 4:30 PM IST",
    venue: "Chambers Hall, Vijayawada + Live Stream",
    desc: "Article 226 strategy, tender blacklisting defences and live writ-drafting lab led by senior appellate counsel.",
    seats: "120 seats • CLE credit applied",
  },
  {
    id: "u2",
    title: "Commercial Arbitration Masterclass: S.9 & S.34 Practice",
    date: "May 02, 2027",
    time: "11:00 AM – 5:00 PM IST",
    venue: "Hyderabad Chambers + Virtual",
    desc: "Interim relief drafting, arbitrator appointment strategy and award-challenge workshops with case files.",
    seats: "80 seats • Practitioners track",
  },
  {
    id: "u3",
    title: "DPDP Compliance Roundtable for General Counsel",
    date: "June 20, 2027",
    time: "2:00 PM – 5:30 PM IST",
    venue: "Bengaluru + Virtual",
    desc: "Notice architectures, DPO duties and cross-border transfer playbooks under the DPDP Act 2023.",
    seats: "Invite-only • 60 delegates",
  },
];

const PAST = [
  { id: "p1", title: "Constitutional Litigation Workshop: Articles 32 & 226", date: "November 2025", venue: "Vijayawada", attendees: "140+ delegates", takeaway: "Writ maintainability matrix & 12 model pleadings released." },
  { id: "p2", title: "PMLA & White-Collar Defence Closed-Door Briefing", date: "August 2025", venue: "Hyderabad", attendees: "65 general counsel", takeaway: "ED summons-response SOP & privilege protocol adopted." },
  { id: "p3", title: "Infrastructure Arbitration Conclave (ICA Practice)", date: "April 2025", venue: "New Delhi", attendees: "200+ practitioners", takeaway: "EPC risk-allocation compendium published." },
  { id: "p4", title: "RERA & Title Diligence Bootcamp", date: "January 2025", venue: "Bengaluru", attendees: "110 developers & counsel", takeaway: "30-year title-search checklist v3 released." },
  { id: "p5", title: "IP & Tech Law Symposium: Trademarks to DPDP", date: "October 2024", venue: "Hyderabad", attendees: "160 scholars & startups", takeaway: "Startup IP audit toolkit & takedown playbook." },
  { id: "p6", title: "Labour Codes & POSH Compliance Intensive", date: "June 2024", venue: "Vijayawada", attendees: "95 HR & legal heads", takeaway: "IC constitution templates & audit calendar." },
];

const Events = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const [tab, setTab] = useState("upcoming");
  const list = useMemo(() => (tab === "upcoming" ? UPCOMING : PAST), [tab]);

  return (
    <div className={`events-page ${isDarkTheme ? "dark" : "light"}`}>
      <style>{`
        .events-page { min-height: 100vh; width: 100%; padding: 110px 0 80px; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
        .events-page.dark { background: #0C0D11; color: #ECECF0; }
        .events-page.light { background: #FAF9F5; color: #171A21; }
        .events-wrap { max-width: 1180px; margin: 0 auto; padding: 0 2rem; }
        .ev-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #C5A059; background: rgba(197,160,89,0.08); border: 1px solid rgba(197,160,89,0.24); padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1rem; }
        .ev-h1 { font-family: 'Cinzel', serif; font-size: clamp(2rem, 4.5vw, 3.1rem); line-height: 1.15; margin: 0 0 0.6rem; }
        .events-page.dark .ev-h1 { background: linear-gradient(135deg, #fff 40%, #C5A059 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .ev-lead { font-size: 1rem; line-height: 1.65; opacity: 0.8; max-width: 68ch; margin: 0 0 1.8rem; }
        .ev-tabs { display: flex; gap: 0.6rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .ev-tab { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 44px; padding: 0.6rem 1.2rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer; border: 1px solid rgba(197,160,89,0.3); background: transparent; color: inherit; font-family: inherit; transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out); }
        .ev-tab:active { transform: scale(0.96); }
        .ev-tab.active { background: linear-gradient(135deg, #E8CF9A 0%, #C5A059 55%, #9E7B38 100%); border-color: rgba(242,227,198,0.45); color: #0E1015; }
        .ev-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .ev-card { padding: 1.5rem; border-radius: 12px; display: flex; flex-direction: column; gap: 0.7rem; }
        .events-page.dark .ev-card { background: #12141B; border: 1px solid rgba(197,160,89,0.2); }
        .events-page.light .ev-card { background: #fff; border: 1px solid rgba(197,160,89,0.25); box-shadow: 0 10px 26px rgba(0,0,0,0.05); }
        .ev-card-top { display: flex; align-items: center; gap: 0.6rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #C5A059; }
        .ev-card-title { font-family: 'Cinzel', serif; font-size: 1.12rem; line-height: 1.35; margin: 0; font-weight: 700; }
        .ev-card-desc { font-size: 0.84rem; line-height: 1.6; opacity: 0.82; margin: 0; flex: 1; }
        .ev-meta { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.78rem; opacity: 0.85; }
        .ev-meta-row { display: flex; align-items: center; gap: 0.5rem; }
        .ev-foot { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; padding-top: 0.8rem; border-top: 1px solid rgba(197,160,89,0.16); font-size: 0.76rem; }
        .ev-seats { opacity: 0.75; }
        .ev-btn { display: inline-flex; align-items: center; gap: 0.4rem; background: none; border: none; color: #C5A059; font-weight: 700; font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer; padding: 0.5rem 0; min-height: 44px; font-family: inherit; transition: opacity var(--dur-pop) var(--ease-out); }
        .ev-cta { margin-top: 2.5rem; padding: 2rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .events-page.dark .ev-cta { background: linear-gradient(135deg, #12141B, #0E1015); border: 1px solid rgba(197,160,89,0.28); }
        .events-page.light .ev-cta { background: #fff; border: 1px solid rgba(197,160,89,0.3); }
        .ev-cta h3 { font-family: 'Cinzel', serif; font-size: 1.35rem; margin: 0 0 0.4rem; }
        .ev-cta p { font-size: 0.86rem; opacity: 0.75; margin: 0; max-width: 52ch; line-height: 1.6; }
        .ev-cta-btn { font-family: inherit; }
        .ev-back { margin-top: 1.5rem; display: flex; justify-content: flex-start; }
        .ev-back-btn { font-family: inherit; }
        @media (max-width: 860px) { .ev-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px) {
          .events-page { padding: 92px 0 60px; }
          .events-wrap { padding: 0 1.1rem; }
          .ev-card { padding: 1.2rem 1.1rem; }
          .ev-cta { padding: 1.5rem; }
          .ev-cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="events-wrap">
        <span className="ev-badge"><Sparkles size={13} /> Conferences & Symposia</span>
        <h1 className="ev-h1 lux-crest-text">Events & Chambers Convenings</h1>
        <p className="ev-lead">
          Practice-led symposia, closed-door general-counsel briefings and open academic workshops.
          Browse upcoming convenings or review the archive of past events below.
        </p>

        <div className="ev-tabs" role="tablist" aria-label="Events archive">
          <button type="button" role="tab" aria-selected={tab === "upcoming"} className={`ev-tab ${tab === "upcoming" ? "active" : ""}`} onClick={() => setTab("upcoming")}>
            <Calendar size={14} /> Upcoming ({UPCOMING.length})
          </button>
          <button type="button" role="tab" aria-selected={tab === "past" ? "true" : "false"} className={`ev-tab ${tab === "past" ? "active" : ""}`} onClick={() => setTab("past")}>
            <History size={14} /> Past Events ({PAST.length})
          </button>
        </div>

        <div className="ev-grid">
          {list.map((e) => (
            <div key={e.id} className="ev-card">
              <div className="ev-card-top"><Calendar size={13} /><span>{e.date}</span></div>
              <h3 className="ev-card-title">{e.title}</h3>
              <p className="ev-card-desc">{e.desc || e.takeaway}</p>
              <div className="ev-meta">
                {e.time && <span className="ev-meta-row"><Clock size={13} color="#C5A059" />{e.time}</span>}
                <span className="ev-meta-row"><MapPin size={13} color="#C5A059" />{e.venue}</span>
                {e.attendees && <span className="ev-meta-row"><Users size={13} color="#C5A059" />{e.attendees}</span>}
              </div>
              <div className="ev-foot">
                <span className="ev-seats">{e.seats || e.takeaway}</span>
                {tab === "upcoming" && (
                  <button type="button" className="ev-btn" onClick={() => navigate("/contact")}>
                    <span>Reserve seat</span><ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ev-cta">
          <div>
            <h3>Host a joint convening with chambers</h3>
            <p>Universities, bar associations and in-house teams can co-host roundtables with MLS &amp; Co. counsel.</p>
          </div>
          <button type="button" className="ev-cta-btn lux-btn-gold" onClick={() => navigate("/contact")}>
            <span>Propose an event</span><ArrowRight size={14} />
          </button>
        </div>

        <div className="ev-back">
          <button type="button" className="ev-back-btn lux-btn-ghost" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
