import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import {
  Shield,
  Scale,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import "../styles/Legacy.css";
import { useTheme } from "./ThemeContext";

const TRIPARTITE_PILLARS = [
  {
    id: "men",
    latin: "MEN",
    subtitle: "The Intellect & Judicial Mind",
    motto: "Ratio Decidendi • Forensic Clarity",
    description:
      "Represents the intellectual sharpness, forensic legal analysis, and incisive oral argument required to prevail in contentious high-bench litigation. We believe that masterful advocacy is not mere rhetoric, but the relentless application of sound jurisprudential logic.",
    tenets: [
      "Rigorous statutory and constitutional precedent research",
      "Nuanced drafting engineered to withstand judicial scrutiny",
      "Assertive oral advocacy tailored for appellate benches",
      "Strategic litigation risk analysis and dispute foresight"
    ],
    quote: "“The intellect of the advocate is the instrument through which the law discovers its true conscience.”"
  },
  {
    id: "legatum",
    latin: "LEGATUM",
    subtitle: "The Heritage & Enduring Precedent",
    motto: "Monumentum Aere Perennius • Enduring Value",
    description:
      "Represents the lasting trust, institutional value, and binding judicial precedents established across decades of practice. Every mandate entrusted to our chambers is handled with a view to safeguarding client equity and shaping forward-looking jurisprudence.",
    tenets: [
      "Preservation of enterprise valuation across generations",
      "Landmark rulings before High Courts and the Supreme Court",
      "Unbroken fiduciary stewardship across 25+ years",
      "Institutional mentoring of senior advocates and judicial counsels"
    ],
    quote: "“A true legal legacy is measured not in courtroom triumphs alone, but in the enduring sanctity of rights defended.”"
  },
  {
    id: "sanctitas",
    latin: "SANCTITAS",
    subtitle: "The Sanctity of Law & Ethical Stewardship",
    motto: "Fides et Constantia • Ethical Inviolability",
    description:
      "Represents our uncompromising adherence to the dignity of the courts, professional ethics under the Bar Council of India, and fearless defense of the rule of law. We view the practice of law as a sacred constitutional trust.",
    tenets: [
      "Absolute confidentiality protected under attorney-client privilege",
      "Unflinching commitment to courtroom truth and procedural integrity",
      "Independent, transparent counsel free of commercial compromise",
      "Defense of fundamental liberties, fairness, and constitutional equity"
    ],
    quote: "“In the turbulent waters of litigation, ethical rectitude is our unchanging anchor and highest shield.”"
  }
];

const HISTORICAL_EPOCHS = [
  {
    yearRange: "2000 — 2007",
    tag: "Chambers Inception",
    title: "Foundations in Appellate Advocacy",
    desc: "Established as a dedicated litigation practice focused on High Court constitutional writs, property title disputes, and trial defense across Andhra Pradesh and Telangana.",
    milestones: [
      "Over 300+ civil and constitutional writ petitions instituted",
      "Defense counsel in landmark state land acquisition trials",
      "Establishment of the firm's foundational appellate research library"
    ]
  },
  {
    yearRange: "2008 — 2015",
    tag: "Commercial Expansion",
    title: "Corporate Restructuring & Infrastructure ADR",
    desc: "Expanded into high-value commercial transactions, arbitrations, and regulatory advisory for financial institutions, private enterprises, and public sector undertakings.",
    milestones: [
      "Appointed counsel in landmark cross-border consortium arbitrations",
      "Structured extensive due diligence for 1000+ acres infrastructure projects",
      "Advisory mandates for leading domestic banks on recovery and insolvencies"
    ]
  },
  {
    yearRange: "2016 — 2022",
    tag: "Judicial Precedents",
    title: "National Tribunals & Supreme Court Presence",
    desc: "Consolidated pan-India standing before the Supreme Court of India, National Company Law Appellate Tribunal (NCLAT), and specialized appellate authorities.",
    milestones: [
      "Secured precedent-setting rulings on IBC creditor hierarchies",
      "High-stakes financial crimes and PMLA defense representations",
      "Formed specialized Intellectual Property & Technology counsel desk"
    ]
  },
  {
    yearRange: "2023 — Present",
    tag: "Institutional Era",
    title: "Full-Service Institutional Leadership",
    desc: "A multidisciplinary partnership comprising retired judges, senior litigators, and commercial specialists advising multinationals, statutory boards, and private clients worldwide.",
    milestones: [
      "Induction of distinguished retired judicial officers to the senior bench",
      "Pan-India network across New Delhi, Hyderabad, Bengaluru, and Mumbai",
      "Deployment of digital IP auditing and DPDP privacy governance practice"
    ]
  }
];

const STATS_DATA = [
  { count: 1200, label: "Litigation & Appellate Verdicts", suffix: "+" },
  { count: 1000, label: "Retained Corporate & Private Clients", suffix: "+" },
  { count: 25, label: "Years of Unbroken Chambers Standing", suffix: "+" },
  { count: 98, label: "Strategic & Advisory Mandate Success", suffix: "%" }
];

const Legacy = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [selectedEpoch, setSelectedEpoch] = useState(0);

  const activePillar = TRIPARTITE_PILLARS[selectedPillar];
  const activeEpoch = HISTORICAL_EPOCHS[selectedEpoch];

  return (
    <div className={`legacy-page ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {/* Background Watermark & Atmosphere */}
      <div className="legacy-watermark" aria-hidden="true">
        <img src="/mls_logo_clean.svg" alt="" className="legacy-watermark-img" />
      </div>

      <div className="legacy-container">
        
        {/* ========================================================
            1. HERO DOSSIER: INSTITUTIONAL HERITAGE
            ======================================================== */}
        <section className="legacy-hero">
          <div className="legacy-badge">
            <Shield size={14} />
            <span>ESTABLISHED MM • A QUARTER-CENTURY OF ADVOCACY</span>
          </div>

          <h1 className="legacy-hero-title">
            An Enduring Heritage of <br />
            <span className="legacy-title-accent">Jurisprudential Rigor</span> & Honor
          </h1>

          <div className="legacy-accent-line" />

          <p className="legacy-hero-lead">
            Forged in the crucible of constitutional litigation and complex commercial disputes, 
            <strong> MLS & Co</strong> stands as an institutional bastion of courtroom mastery, 
            intellectual clarity, and fiduciary integrity.
          </p>

          <div className="legacy-quick-metrics-strip">
            <div className="quick-metric-item">
              <span className="quick-metric-val">25+</span>
              <span className="quick-metric-lbl">Years of Advocacy</span>
            </div>
            <div className="quick-metric-divider" />
            <div className="quick-metric-item">
              <span className="quick-metric-val">1200+</span>
              <span className="quick-metric-lbl">High Bench Briefs</span>
            </div>
            <div className="quick-metric-divider" />
            <div className="quick-metric-item">
              <span className="quick-metric-val">Pan-India</span>
              <span className="quick-metric-lbl">Supreme Court & HCs</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. THE TRIPARTITE VAULT: MEN • LEGATUM • SANCTITAS
            ======================================================== */}
        <section className="legacy-triad-section">
          <div className="section-overhead">
            <span className="section-overhead-tag">FOUNDATIONAL PHILOSOPHY</span>
            <h2 className="section-overhead-title">The Tripartite Pillar Vault</h2>
            <p className="section-overhead-desc">
              Every strategic opinion, oral argument, and courtroom brief issued by MLS & Co is anchored 
              upon three immutable Latin principles.
            </p>
          </div>

          {/* Triad Interactive Selector Cards */}
          <div className="triad-cards-grid">
            {TRIPARTITE_PILLARS.map((pillar, pIdx) => {
              const isSelected = selectedPillar === pIdx;
              return (
                <div
                  key={pillar.id}
                  className={`triad-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedPillar(pIdx)}
                  onMouseEnter={() => setSelectedPillar(pIdx)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedPillar(pIdx); } }}
                >
                  <div className="triad-card-top">
                    <span className="triad-roman">0{pIdx + 1}</span>
                    <span className="triad-pill-motto">{pillar.motto.split("•")[0]}</span>
                  </div>

                  <h3 className="triad-latin-title">{pillar.latin}</h3>
                  <p className="triad-sub-label">{pillar.subtitle}</p>

                  <div className="triad-card-indicator" />
                </div>
              );
            })}
          </div>

          {/* Deep Selected Pillar Dossier Box */}
          <div className="triad-dossier-box">
            <div className="dossier-left">
              <div className="dossier-badge">
                <Scale size={16} />
                <span>DOCTRINE OF {activePillar.latin}</span>
              </div>
              <h3 className="dossier-heading">{activePillar.subtitle}</h3>
              <p className="dossier-desc">{activePillar.description}</p>
              
              <blockquote className="dossier-quote">
                {activePillar.quote}
              </blockquote>
            </div>

            <div className="dossier-right">
              <h4 className="dossier-tenets-heading">Operational Manifestations:</h4>
              <ul className="dossier-tenets-list">
                {activePillar.tenets.map((tenet, tIdx) => (
                  <li key={tIdx}>
                    <CheckCircle2 size={16} className="dossier-check" />
                    <span>{tenet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. HISTORICAL EPOCHS: INTERACTIVE MILESTONE TIMELINE
            ======================================================== */}
        <section className="legacy-epochs-section">
          <div className="section-overhead">
            <span className="section-overhead-tag">CHRONICLES OF GROWTH</span>
            <h2 className="section-overhead-title">Epochs of Jurisprudence</h2>
            <p className="section-overhead-desc">
              Trace the quarter-century trajectory from regional trial advocacy to a premier pan-India partnership.
            </p>
          </div>

          {/* Interactive Stepper Navigation Bar */}
          <div className="epochs-stepper-bar">
            {HISTORICAL_EPOCHS.map((epoch, eIdx) => {
              const isActive = selectedEpoch === eIdx;
              return (
                <button
                  key={eIdx}
                  type="button"
                  className={`epoch-step-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedEpoch(eIdx)}
                >
                  <span className="epoch-step-range">{epoch.yearRange}</span>
                  <span className="epoch-step-tag">{epoch.tag}</span>
                  <div className="epoch-step-indicator" />
                </button>
              );
            })}
          </div>

          {/* Active Epoch Showcase Card */}
          <div className="epoch-showcase-card">
            <div className="epoch-showcase-header">
              <div className="epoch-time-badge">
                <Calendar size={14} />
                <span>{activeEpoch.yearRange}</span>
              </div>
              <span className="epoch-era-tag">✦ {activeEpoch.tag}</span>
            </div>

            <h3 className="epoch-showcase-title">{activeEpoch.title}</h3>
            <p className="epoch-showcase-desc">{activeEpoch.desc}</p>

            <div className="epoch-milestones-block">
              <h4 className="epoch-milestones-title">Key Institutional Achievements:</h4>
              <div className="epoch-milestones-grid">
                {activeEpoch.milestones.map((ms, mIdx) => (
                  <div key={mIdx} className="milestone-chip">
                    <ChevronRight size={15} className="milestone-arrow" />
                    <span>{ms}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. HALL OF METRICS: RECORD OF PREEMINENCE
            ======================================================== */}
        <section className="legacy-metrics-section">
          <div className="section-overhead">
            <span className="section-overhead-tag">EMPIRICAL PROOF</span>
            <h2 className="section-overhead-title">The Measure of Triumph</h2>
            <p className="section-overhead-desc">
              Numbers that reflect a steadfast devotion to justice, client equity, and judicial excellence.
            </p>
          </div>

          <div className="legacy-metrics-grid">
            {STATS_DATA.map((stat, sIdx) => (
              <div key={sIdx} className="legacy-metric-card">
                <div className="metric-number-row">
                  <CountUp
                    start={0}
                    end={stat.count}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                    className="metric-counter"
                  />
                  <span className="metric-suffix">{stat.suffix}</span>
                </div>
                <div className="metric-card-line" />
                <p className="metric-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            5. INSTITUTIONAL COVENANT & INTAKE CALL
            ======================================================== */}
        <section className="legacy-covenant-box">
          <div className="covenant-content">
            <div className="covenant-badge">
              <Sparkles size={16} />
              <span>THE CHAMBERS COVENANT</span>
            </div>

            <h3 className="covenant-title">
              Driven by the Spirit of Justice, <br />
              Guided by the Sanctity of Law.
            </h3>

            <p className="covenant-lead">
              Whether defending fundamental rights before constitutional benches or structuring multi-crore 
              corporate amalgamations, the partners and counsel of MLS & Co remain steadfast in delivering 
              bespoke, fearless, and enduring solutions.
            </p>

            <div className="covenant-actions">
              <button
                type="button"
                className="covenant-btn-primary"
                onClick={() => navigate("/#contact")}
              >
                <span>Instruct Counsel</span>
                <ArrowRight size={16} />
              </button>

              <Link to="/team" className="covenant-btn-secondary">
                <BookOpen size={16} />
                <span>Meet Senior Partnership</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Legacy;
