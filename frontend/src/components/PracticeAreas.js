import React, { useState } from 'react';
import {
  Scale,
  Gavel,
  Briefcase,
  Building,
  Landmark,
  FileCheck,
  Percent,
  Users,
  ArrowRight,
  ArrowUpRight,
  X,
  Compass,
  CheckCircle2
} from "lucide-react";
import '../styles/PracticeAreas.css';
import { useTheme } from './ThemeContext';

const PRACTICE_AREAS = [
  {
    id: "civil-constitutional",
    num: "01",
    icon: Scale,
    tag: "High Courts & Supreme Court",
    title: "Civil & Constitutional Law",
    shortDesc: "Writs under Articles 32 & 226, private rights enforcement, civil appeals, and commercial contract litigation.",
    statutes: "Constitution of India, CPC 1908, Specific Relief Act",
    points: [
      "Writs of Mandamus, Certiorari, and Quo Warranto under Articles 32 & 226",
      "High-stakes commercial breach of contract and specific performance suits",
      "Property title disputes, easements, partition deeds, and appellate advocacy",
      "Injunction petitions, declaratory decrees, and Supreme Court Special Leave Petitions (SLPs)"
    ]
  },
  {
    id: "arbitration",
    num: "02",
    icon: Landmark,
    tag: "Domestic & International ADR",
    title: "Commercial Arbitration & Mediation",
    shortDesc: "Expedited dispute resolution engineered to preserve enterprise valuation and enforce contractual mandates.",
    statutes: "Arbitration & Conciliation Act 1996, SIAC, LCIA, ICC Rules",
    points: [
      "Representation in complex domestic and International Commercial Arbitrations (ICA)",
      "Section 9 urgent interim relief petitions and Section 11 arbitrator appointments",
      "Enforcement and setting aside of domestic and foreign arbitral awards (Sections 34 & 36)",
      "Structured commercial mediation, judicial conciliations & settlement structuring"
    ]
  },
  {
    id: "corporate-ma",
    num: "03",
    icon: Briefcase,
    tag: "Transactional & Regulatory",
    title: "Corporate Governance & M&A",
    shortDesc: "Full-lifecycle enterprise counsel from cross-border M&A and due diligence to board fiduciary advisory.",
    statutes: "Companies Act 2013, SEBI LODR, FEMA, RBI Guidelines",
    points: [
      "Cross-border Mergers, Acquisitions, joint ventures and scheme amalgamations",
      "Comprehensive legal and regulatory due diligence for institutional investors",
      "Board governance advisory, shareholder pacts, voting agreements & term sheets",
      "NCLT representation for corporate insolvencies, oppression & mismanagement petitions"
    ]
  },
  {
    id: "criminal-defense",
    num: "04",
    icon: Gavel,
    tag: "Trial & Statutory Defense",
    title: "Criminal Law & White-Collar Defense",
    shortDesc: "Formidable trial advocacy, statutory compliance, and defense against financial crime & regulatory enforcement.",
    statutes: "BNS, BNSS, PMLA, Prevention of Corruption Act, FEMA",
    points: [
      "Anticipatory and regular bail representations before High Courts and Supreme Court",
      "Specialized defense in ED investigations and Prevention of Money Laundering Act (PMLA)",
      "FIR quashing petitions under Section 482 BNSS / CrPC equivalents",
      "Corporate officer criminal liabilities, economic offenses & statutory enforcement defense"
    ]
  },
  {
    id: "real-estate",
    num: "05",
    icon: Building,
    tag: "Property & Infrastructure",
    title: "Real Estate & Infrastructure",
    shortDesc: "Strategic land acquisition counsel, RERA statutory representation, infrastructure EPC contracts and title audits.",
    statutes: "RERA 2016, Transfer of Property Act, Land Acquisition Act",
    points: [
      "Rigorous 30-year property title scrutiny, search reports & encumbrance certification",
      "Representation before Real Estate Regulatory Authorities (RERA) and Appellate Tribunals",
      "EPC contracting, consortium agreements, concession pacts & PPP frameworks",
      "Zoning compliance, land use conversion, developer agreements & layout approvals"
    ]
  },
  {
    id: "ip-tech",
    num: "06",
    icon: FileCheck,
    tag: "Innovation & Technology",
    title: "Intellectual Property & Technology",
    shortDesc: "Safeguarding trademarks, patents, software copyrights, and enterprise digital privacy architectures.",
    statutes: "Trade Marks Act 1999, Patents Act, Copyright Act, DPDP Act",
    points: [
      "Trademark and copyright registration, opposition proceedings & global portfolio defense",
      "Patent infringement litigation, passing-off suits & interim restraining orders",
      "Software licensing, SaaS terms, technology transfer pacts & API governance",
      "Digital Personal Data Protection (DPDP) audits and trade secret nondisclosure structures"
    ]
  },
  {
    id: "taxation",
    num: "07",
    icon: Percent,
    tag: "Fiscal & Appellate Representation",
    title: "Taxation & Revenue Law",
    shortDesc: "Advisory and litigation spanning direct tax appellate tribunals, GST classification, and cross-border structuring.",
    statutes: "Income Tax Act 1961, Central GST Act, Transfer Pricing Rules",
    points: [
      "Appellate representations before ITAT, CESTAT, High Courts and Supreme Court",
      "GST classification dispute advisory, input tax credit audits & show cause replies",
      "Cross-border transfer pricing documentation, international treaties (DTAA) & advance rulings",
      "Fiscal structuring for domestic amalgamations, spin-offs, and capital reorganizations"
    ]
  },
  {
    id: "employment",
    num: "08",
    icon: Users,
    tag: "Workforce & Compliance",
    title: "Labour & Employment Regulations",
    shortDesc: "Guiding enterprise employers through workforce restructuring, executive contracts, and statutory POSH frameworks.",
    statutes: "Industrial Relations Code, POSH Act 2013, EPF & ESI Acts",
    points: [
      "Executive employment contracts, non-compete covenants & senior severance frameworks",
      "Internal Complaints Committee (ICC) advisory and independent POSH inquiry guidance",
      "Workforce restructuring, retrenchment compliance, and union conciliation advocacy",
      "Labour audits, social security statutory compliance, and workplace safety protocols"
    ]
  }
];

const PracticeAreas = ({ onNavigate }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState(null);
  const { isDarkTheme } = useTheme();

  const activeArea = PRACTICE_AREAS[hoveredIndex] || PRACTICE_AREAS[0];

  return (
    <section
      id="practice"
      className={`practice-areas snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
    >
      <div className="practice-container">
        {/* TLH Style Split 2-Column Grid */}
        <div className="practice-split-layout">
          
          {/* LEFT COLUMN: Pinned / Sticky Editorial Header & Active Preview */}
          <div className="practice-col-left">
            <div className="practice-header-pinned">
              <div className="practice-badge">
                <span className="practice-badge-dot" />
                <span className="practice-badge-text">PRACTICE DISCIPLINES</span>
              </div>

              <h2 className="practice-title">
                Areas of <br />
                <span className="practice-title-accent">Practice</span>
              </h2>

              {/* TLH Signature Horizontal Accent Line */}
              <div className="practice-accent-line" />

              <p className="practice-description">
                MLS & Co provides comprehensive trial advocacy and institutional counsel across 
                the full spectrum of contentious disputes and high-value commercial transactions.
              </p>

              {/* Dynamic Active Area Preview Card */}
              <div className="practice-active-preview">
                <div className="preview-top-row">
                  <div className="preview-num-badge">{activeArea.num}</div>
                  <span className="preview-tag">{activeArea.tag}</span>
                </div>
                
                <h3 className="preview-title">{activeArea.title}</h3>
                <p className="preview-desc">{activeArea.shortDesc}</p>

                <div className="preview-statute-row">
                  <span className="preview-statute-label">Primary Statutes:</span>
                  <span className="preview-statute-val">{activeArea.statutes}</span>
                </div>

                <button
                  type="button"
                  className="preview-mandate-btn"
                  onClick={() => setSelectedArea(activeArea)}
                >
                  <span>Examine Detailed Mandate Scope</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="practice-left-footer">
                <div className="practice-stat-chip">
                  <Compass size={14} />
                  <span>8 Core Disciplines</span>
                </div>
                <div className="practice-stat-chip">
                  <CheckCircle2 size={14} />
                  <span>High Courts & Supreme Court</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TLH Stacked Editorial List (.areas_link-block style) */}
          <div className="practice-col-right">
            <div className="practice-list-header">
              <span className="list-header-label">DISCIPLINE DIRECTORY</span>
              <span className="list-header-hint">Hover to preview • Click to examine</span>
            </div>

            <div className="practice-stacked-list">
              {PRACTICE_AREAS.map((area, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <div
                    key={area.id}
                    className={`tlh-area-row ${isHovered ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onClick={() => setSelectedArea(area)}
                  >
                    <div className="tlh-area-left">
                      <span className="tlh-area-num">{area.num}</span>
                      <div className="tlh-area-info">
                        <span className="tlh-area-title">{area.title}</span>
                        <span className="tlh-area-tag">{area.tag}</span>
                      </div>
                    </div>

                    <div className="tlh-area-right">
                      <div className="tlh-area-arrow-box">
                        <ArrowRight size={16} className="tlh-area-arrow" />
                      </div>
                    </div>

                    {/* Animated hover border line */}
                    <div className="tlh-area-indicator" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TLH Style Deep Mandate Modal */}
        {selectedArea && (
          <div
            className="practice-modal-backdrop"
            onClick={() => setSelectedArea(null)}
          >
            <div
              className="practice-modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="practice-modal-close"
                onClick={() => setSelectedArea(null)}
                aria-label="Close practice mandate"
              >
                <X size={20} />
              </button>

              <div className="modal-hero">
                <div className="modal-hero-badge">
                  <span className="modal-badge-num">{selectedArea.num}</span>
                  <span className="modal-badge-tag">{selectedArea.tag}</span>
                </div>
                <h3 className="modal-title">{selectedArea.title}</h3>
                <p className="modal-lead">{selectedArea.shortDesc}</p>
                
                <div className="modal-statute-chip">
                  <strong>Governing Legislation:</strong> {selectedArea.statutes}
                </div>
              </div>

              <div className="modal-body-content">
                <h4 className="modal-mandate-heading">Scope of Representation & Key Mandates</h4>
                <div className="modal-points-grid">
                  {selectedArea.points.map((pt, pIdx) => (
                    <div key={pIdx} className="modal-point-card">
                      <div className="modal-point-bullet">✦</div>
                      <p className="modal-point-text">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer-cta">
                <button
                  type="button"
                  className="modal-cta-primary"
                  onClick={() => {
                    setSelectedArea(null);
                    if (onNavigate) {
                      onNavigate('contact');
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span>Instruct Counsel for {selectedArea.title}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticeAreas;
