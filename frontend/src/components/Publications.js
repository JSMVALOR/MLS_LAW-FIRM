import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, ArrowRight, Download, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeContext";

const PUBS = [
  { id: "b1", title: "Writ Maintainability Matrix: Article 226 in Commercial Disputes", journal: "MLS Chambers Review, Vol. XIV", year: "2026", pages: "42 pp.", desc: "Maintainability tests, alternative-remedy bars and 12 model writ pleadings for tender and blacklisting disputes." },
  { id: "b2", title: "Section 34 & 48 Arbitration Compendium: Setting Aside & Enforcement", journal: "Arbitration Bulletin", year: "2025", pages: "68 pp.", desc: "Ground-wise award-challenge checklists, limitation maps and pro-enforcement case digest." },
  { id: "b3", title: "PMLA Defence Protocol: Summons to Trial", journal: "Economic Offences Desk", year: "2025", pages: "54 pp.", desc: "ED summons response SOP, privilege safeguards and bail jurisprudence tracker." },
  { id: "b4", title: "DPDP Compliance Playbook for Data Fiduciaries", journal: "Tech Law Series", year: "2025", pages: "61 pp.", desc: "Notice templates, consent architectures and DPO duty matrices under the DPDP Act 2023." },
  { id: "b5", title: "RERA & Title Diligence Handbook v3", journal: "Real Estate Practice", year: "2024", pages: "77 pp.", desc: "30-year title-search methodology, RERA complaint drafting and promoter compliance calendar." },
  { id: "b6", title: "IBC Section 53 Waterfall: Creditor Priority Digest", journal: "Corporate Law Review", year: "2024", pages: "49 pp.", desc: "Rainbow Papers lineage, statutory-dues conflicts and liquidation priority flowcharts." },
];

const Publications = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PUBS;
    return PUBS.filter((p) => (p.title + p.journal + p.desc).toLowerCase().includes(s));
  }, [q]);

  return (
    <div className={`pubs-page ${isDarkTheme ? "dark" : "light"}`}>
      <style>{`
        .pubs-page { min-height: 100vh; width: 100%; padding: 110px 0 80px; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
        .pubs-page.dark { background: #0C0D11; color: #ECECF0; }
        .pubs-page.light { background: #FAF9F5; color: #171A21; }
        .pubs-wrap { max-width: 1180px; margin: 0 auto; padding: 0 2rem; }
        .pubs-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #C5A059; background: rgba(197,160,89,0.08); border: 1px solid rgba(197,160,89,0.24); padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1rem; }
        .pubs-h1 { font-family: 'Cinzel', serif; font-size: clamp(2rem, 4.5vw, 3.1rem); line-height: 1.15; margin: 0 0 0.6rem; }
        .pubs-page.dark .pubs-h1 { background: linear-gradient(135deg, #fff 40%, #C5A059 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .pubs-lead { font-size: 1rem; line-height: 1.65; opacity: 0.8; max-width: 68ch; margin: 0 0 1.6rem; }
        .pubs-search { position: relative; max-width: 560px; margin-bottom: 1.5rem; }
        .pubs-search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #C5A059; }
        .pubs-input { width: 100%; box-sizing: border-box; padding: 0.85rem 1rem 0.85rem 2.9rem; border-radius: 8px; font-size: 0.92rem; outline: none; font-family: inherit; }
        .pubs-page.dark .pubs-input { background: #12141B; border: 1px solid rgba(197,160,89,0.28); color: #ECECF0; }
        .pubs-page.light .pubs-input { background: #fff; border: 1px solid rgba(197,160,89,0.32); color: #171A21; }
        .pubs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .pub-card { padding: 1.5rem; border-radius: 12px; display: flex; flex-direction: column; gap: 0.6rem; }
        .pubs-page.dark .pub-card { background: #12141B; border: 1px solid rgba(197,160,89,0.2); }
        .pubs-page.light .pub-card { background: #fff; border: 1px solid rgba(197,160,89,0.25); box-shadow: 0 10px 26px rgba(0,0,0,0.05); }
        .pub-top { display: flex; align-items: center; gap: 0.55rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #C5A059; }
        .pub-title { font-family: 'Cinzel', serif; font-size: 1.08rem; line-height: 1.4; margin: 0; font-weight: 700; }
        .pub-desc { font-size: 0.84rem; line-height: 1.6; opacity: 0.82; margin: 0; flex: 1; }
        .pub-meta { font-size: 0.76rem; opacity: 0.7; }
        .pub-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 0.8rem; border-top: 1px solid rgba(197,160,89,0.16); }
        .pub-link { display: inline-flex; align-items: center; gap: 0.4rem; background: none; border: none; color: #C5A059; font-weight: 700; font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer; padding: 0.5rem 0; min-height: 44px; font-family: inherit; transition: opacity var(--dur-pop) var(--ease-out); }
        .pub-cta-btn { font-family: inherit; }
        .pub-empty { padding: 3rem 1.5rem; text-align: center; border: 1px dashed rgba(197,160,89,0.35); border-radius: 10px; }
        .pub-back { margin-top: 1.5rem; }
        .pub-back-btn { font-family: inherit; }
        @media (max-width: 860px) { .pubs-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .pubs-page { padding: 92px 0 60px; } .pubs-wrap { padding: 0 1.1rem; } .pub-card { padding: 1.2rem 1.1rem; } }
      `}</style>
      <div className="pubs-wrap">
        <span className="pubs-badge"><BookOpen size={13} /> Research & Publications</span>
        <h1 className="pubs-h1 lux-crest-text">Publications & Research Briefs</h1>
        <p className="pubs-lead">Citation-grade practice compendia authored by chambers counsel — matrices, checklists and playbooks distilled from live files.</p>
        <div className="pubs-search">
          <Search size={17} className="pubs-search-icon" />
          <input className="pubs-input" type="text" placeholder="Search titles, journals, topics…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search publications" />
        </div>
        {filtered.length === 0 ? (
          <div className="pub-empty"><FileText size={28} color="#C5A059" /><h3>No publications matched “{q}”.</h3><p>Try “arbitration”, “DPDP” or “writ”.</p></div>
        ) : (
          <div className="pubs-grid">
            {filtered.map((p) => (
              <div key={p.id} className="pub-card">
                <div className="pub-top"><FileText size={13} /><span>{p.journal} • {p.year}</span></div>
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-desc">{p.desc}</p>
                <div className="pub-meta">{p.pages} • Chambers authorised excerpt</div>
                <div className="pub-foot">
                  <span className="pub-meta">{p.year} Edition</span>
                  <button type="button" className="pub-link" onClick={() => navigate("/contact")}><Download size={13} /><span>Request copy</span></button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "2rem", padding: "1.75rem", borderRadius: 12, border: "1px solid rgba(197,160,89,0.25)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div><h3 style={{ fontFamily: "'Cinzel', serif", margin: "0 0 0.35rem", fontSize: "1.25rem" }}>Commission a research brief</h3><p style={{ margin: 0, fontSize: "0.86rem", opacity: 0.75 }}>Custom amicus notes, compliance matrices and appellate opinions.</p></div>
          <button type="button" className="pub-cta-btn lux-btn-gold" onClick={() => navigate("/contact")}><span>Engage counsel</span><ArrowRight size={14} /></button>
        </div>
        <div className="pub-back"><button type="button" className="pub-back-btn lux-btn-ghost" onClick={() => navigate("/")}>Back to Home</button></div>
      </div>
    </div>
  );
};

export default Publications;
