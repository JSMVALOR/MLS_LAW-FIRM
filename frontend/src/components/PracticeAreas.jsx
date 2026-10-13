import React, { useState, useRef } from 'react';
import { ArrowRight, X, CheckCircle2, Scale } from "lucide-react";
import { useTheme } from './ThemeContext';

const PRACTICE_AREAS = [
  {
    id: "civil-constitutional",
    num: "01",
    tag: "High Courts & Supreme Court",
    title: "Civil & Constitutional Law",
    shortDesc: "Writs under Articles 32 & 226, private rights enforcement, civil appeals, and high-stakes contract litigation.",
    statutes: "Constitution of India, CPC 1908, Specific Relief Act",
    points: [
      "Writs of Mandamus, Certiorari, and Quo Warranto before High Courts & Supreme Court",
      "High-stakes commercial breach of contract and specific performance suits",
      "Property title disputes, easements, partition deeds, and appellate advocacy",
      "Injunction petitions, declaratory decrees, and Supreme Court Special Leave Petitions (SLPs)"
    ]
  },
  {
    id: "arbitration",
    num: "02",
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
    tag: "Trial & Statutory Defense",
    title: "Criminal Law & White-Collar Defense",
    shortDesc: "Formidable trial advocacy, statutory compliance, and defense against financial crime & regulatory enforcement.",
    statutes: "BNS, BNSS, PMLA, Prevention of Corruption Act, FEMA",
    points: [
      "Anticipatory and regular bail representations before High Courts and Supreme Court",
      "Specialized defense in ED investigations and Prevention of Money Laundering Act (PMLA)",
      "FIR quashing petitions under Section 482 BNSS / CrPC equivalents",
      "Corporate officer criminal liabilities, economic offenses & statutory defense"
    ]
  },
  {
    id: "real-estate",
    num: "05",
    tag: "Property & Infrastructure",
    title: "Real Estate & Infrastructure",
    shortDesc: "Land title verification, EPC contract structuring, RERA disputes, and large-scale industrial acquisitions.",
    statutes: "RERA 2016, Transfer of Property Act 1882, Land Acquisition Act",
    points: [
      "Title scrutiny and 30-year search diligence for residential and commercial tracts",
      "EPC agreements, turnkey construction pacts, and concession contracts",
      "RERA adjudication for buyers, promoters, and developer regulatory compliances",
      "Environmental clearances, zoning permissions, and municipal land approvals"
    ]
  },
  {
    id: "taxation",
    num: "06",
    tag: "Direct & Indirect Tax",
    title: "Taxation & Revenue Law",
    shortDesc: "Strategic direct tax advisory, GST structuring, and high-stakes advocacy before appellate tribunals.",
    statutes: "Income Tax Act 1961, CGST Act 2017, Customs Act",
    points: [
      "Appellate representation before ITAT, High Courts, and Supreme Court of India",
      "GST classification disputes, input tax credit denial & anti-profiteering",
      "Transfer pricing defense and cross-border withholding tax opinions",
      "Representation in search, seizure, and statutory assessment scrutinies"
    ]
  },
  {
    id: "ip-tech",
    num: "07",
    tag: "Intellectual Property & Tech",
    title: "Intellectual Property & Technology",
    shortDesc: "Protecting proprietary brand equity, software algorithms, patents, and resolving digital copyright infringement.",
    statutes: "Trade Marks Act 1999, Patents Act, Copyright Act, IT Act 2000",
    points: [
      "Trademark filing, opposition prosecution, and passing-off injunction suits",
      "Patent drafting scrutiny, software licensing (SaaS), and tech IP agreements",
      "Data privacy advisory, GDPR / DPDP compliance, and trade secret non-disclosures",
      "Domain name disputes before WIPO and INDRP arbitral panels"
    ]
  },
  {
    id: "labour-employment",
    num: "08",
    tag: "Workforce & Industrial Relations",
    title: "Labour & Employment Regulations",
    shortDesc: "Drafting executive contracts, managing trade union negotiations, and ensuring stringent POSH compliance.",
    statutes: "Industrial Relations Code, Social Security Code, POSH Act 2013",
    points: [
      "Drafting senior executive employment agreements, non-competes, and severance covenants",
      "POSH compliance audit, Internal Committee (IC) constitution and inquiry governance",
      "Industrial dispute resolution, trade union conciliations & retrenchment approvals",
      "PF, ESI, gratuity audits and compliance with newly notified Labour Codes"
    ]
  }
];

const PracticeAreas = ({ onNavigate }) => {
  const { isDarkTheme } = useTheme();
  const [selectedModalArea, setSelectedModalArea] = useState(null);
  const scrollListRef = useRef(null);

  const handleConsult = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const snapContainer = document.querySelector('.home-snap-container');
      const el = document.getElementById('contact');
      if (snapContainer && el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className={`section_areas snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
      id="practice"
    >
      <style>{`
        /* ========================================================
           TLH EXACT PRACTICE AREAS STYLE & BUTTERY INNER SCROLL
           Pinned Left Block, Full-Editorial Link Rows & 1-Slide Fit
           ======================================================== */
        .section_areas {
          position: relative;
          min-height: calc(100vh - var(--nav-height, 80px)) !important;
          min-height: calc(100svh - var(--nav-height, 80px)) !important;
          scroll-snap-align: start !important;
          scroll-snap-stop: always !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 2.5rem;
          padding-left: max(2.5rem, var(--sal, 0px));
          padding-right: max(2.5rem, var(--sar, 0px));
          overflow: hidden;
          overflow: clip;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .section_areas.dark-theme {
          background-color: #0C0D11;
          color: #ECECF0;
        }

        .section_areas.light-theme {
          background-color: #FAF9F5;
          color: #171A21;
        }

        .areas_container {
          max-width: 1360px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
        }

        .areas_wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 3.5rem;
          position: relative;
        }

        /* ========================================================
           LEFT BLOCK (TLH EXACT PINNED CARD WITH TOP GOLD ACCENT BAR)
           ======================================================== */
        .areas_left {
          width: 38%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.6rem 2.4rem;
          border-radius: 12px;
          border-top: 4px solid #C5A059;
          position: relative;
          box-sizing: border-box;
        }

        .section_areas.dark-theme .areas_left {
          background-color: rgba(18, 20, 27, 0.85);
          border-right: 1px solid rgba(197, 160, 89, 0.16);
          border-bottom: 1px solid rgba(197, 160, 89, 0.16);
          border-left: 1px solid rgba(197, 160, 89, 0.16);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(14px);
        }

        .section_areas.light-theme .areas_left {
          background-color: #FFFFFF;
          border-right: 1px solid rgba(197, 160, 89, 0.2);
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          border-left: 1px solid rgba(197, 160, 89, 0.2);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(14px);
        }

        .areas_badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C5A059;
          margin-bottom: 0.65rem;
        }

        .areas_left_heading {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 2.6vw, 2.4rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0;
          color: inherit;
        }

        .section_areas.dark-theme .areas_left_heading {
          background: linear-gradient(135deg, #FFFFFF 50%, #C5A059 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* TLH Signature Horizontal Accent Line */
        .accent-line-horizontal {
          width: 80px;
          height: 2px;
          background: rgba(197, 160, 89, 0.22);
          position: relative;
          margin: 1.25rem 0 1.5rem;
        }

        .accent-line-element-horizontal {
          width: 26px;
          height: 4px;
          background: #C5A059;
          position: absolute;
          top: -1px;
          left: 0;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.5);
        }

        .areas_left_description {
          font-size: 0.88rem;
          line-height: 1.6;
          opacity: 0.8;
          margin: 0 0 1.85rem;
          font-weight: 400;
        }

        .areas_left_cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.8rem 1.45rem;
          min-height: 48px;
          border-radius: 8px;
          background: #C5A059;
          color: #0E1015;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          width: fit-content;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.22);
        }

        .areas_left_cta:hover {
          background: #D4AF37;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(197, 160, 89, 0.35);
        }

        /* ========================================================
           RIGHT COLUMN (TLH EXACT SCROLLABLE LIST WITH HAIRLINES & ARROWS)
           ======================================================== */
        .areas_right {
          width: 58%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Subtle Fade Vignettes Top/Bottom (TLH Smooth Visual Flow) */
        .areas_right::before,
        .areas_right::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 28px;
          pointer-events: none;
          z-index: 5;
        }

        .section_areas.dark-theme .areas_right::before {
          top: 0;
          background: linear-gradient(to bottom, #0C0D11, transparent);
        }
        .section_areas.dark-theme .areas_right::after {
          bottom: 0;
          background: linear-gradient(to top, #0C0D11, transparent);
        }

        .section_areas.light-theme .areas_right::before {
          top: 0;
          background: linear-gradient(to bottom, #FAF9F5, transparent);
        }
        .section_areas.light-theme .areas_right::after {
          bottom: 0;
          background: linear-gradient(to top, #FAF9F5, transparent);
        }

        /* The Scroll Container inside the 1 Slide */
        .areas_scroll_list {
          max-height: 480px;
          overflow-y: auto;
          padding: 0.5rem 0.5rem 1rem 0;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          display: flex;
          flex-direction: column;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }

        .areas_scroll_list::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
        }

        /* TLH Exact Link Block */
        .areas_link_block {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
          padding: 1.1rem 0.75rem;
          min-height: 56px;
          border-top: 1px solid;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
        }

        .section_areas.dark-theme .areas_link_block {
          border-top-color: rgba(197, 160, 89, 0.16);
        }

        .section_areas.light-theme .areas_link_block {
          border-top-color: rgba(197, 160, 89, 0.2);
        }

        .areas_link_block:last-child {
          border-bottom: 1px solid;
        }

        .section_areas.dark-theme .areas_link_block:last-child {
          border-bottom-color: rgba(197, 160, 89, 0.16);
        }

        .section_areas.light-theme .areas_link_block:last-child {
          border-bottom-color: rgba(197, 160, 89, 0.2);
        }

        .areas_link_text {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.15rem, 1.8vw, 1.48rem);
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.02em;
          transition: color 0.2s ease, transform 0.25s ease;
        }

        .areas_link_block:hover .areas_link_text {
          color: #C5A059;
          transform: translateX(6px);
        }

        .section_areas.light-theme .areas_link_block:hover .areas_link_text {
          color: #8C661D;
        }

        /* TLH Arrow Icon */
        .areas_link_arrow_wrap {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, color 0.2s ease;
          opacity: 0.55;
          flex-shrink: 0;
        }

        .areas_link_block:hover .areas_link_arrow_wrap {
          transform: translateX(6px);
          opacity: 1;
          color: #C5A059;
        }

        /* Expanding TLH Bottom Accent Bar on Hover */
        .areas_hover_accent {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: #C5A059;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .areas_link_block:hover .areas_hover_accent {
          width: 100%;
        }

        /* Mandate Detail Modal */
        .mandate_modal_backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 7, 10, 0.84);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFade 0.2s ease;
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mandate_modal_dialog {
          position: relative;
          width: 100%;
          max-width: 660px;
          border-radius: 14px;
          padding: 2.2rem;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7);
          max-height: 85vh;
          overflow-y: auto;
          box-sizing: border-box;
          animation: modalPop 0.24s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .section_areas.dark-theme .mandate_modal_dialog {
          background: #111319;
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: #ECECF0;
        }

        .section_areas.light-theme .mandate_modal_dialog {
          background: #FFFFFF;
          border: 1px solid rgba(197, 160, 89, 0.3);
          color: #171A21;
        }

        .mandate_close_btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          opacity: 0.6;
          padding: 0.3rem;
          transition: opacity 0.2s, color 0.2s;
        }

        .mandate_close_btn:hover {
          opacity: 1;
          color: #C5A059;
        }

        .mandate_num_tag {
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          font-weight: 800;
          color: #C5A059;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.22);
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .mandate_modal_title {
          font-family: 'Cinzel', serif;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 0.5rem;
        }

        .mandate_modal_desc {
          font-size: 0.88rem;
          line-height: 1.55;
          opacity: 0.85;
          margin: 0 0 1rem;
        }

        .mandate_statute_box {
          font-size: 0.78rem;
          padding: 0.5rem 0.85rem;
          border-radius: 6px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.18);
          margin-bottom: 1.25rem;
        }

        .mandate_points_title {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C5A059;
          margin-bottom: 0.75rem;
        }

        .mandate_point_row {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.84rem;
          line-height: 1.45;
          opacity: 0.9;
          margin-bottom: 0.65rem;
        }

        .mandate_footer_action {
          display: flex;
          justify-content: flex-end;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(197, 160, 89, 0.16);
        }

        @media (max-width: 992px) {
          .areas_wrap {
            flex-direction: column;
            gap: 1.25rem;
          }
          .areas_left {
            width: 100%;
            padding: 1.5rem;
          }
          .areas_right {
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .section_areas { padding: 2.5rem 1.1rem 2rem; align-items: flex-start; }
          .areas_left { padding: 1.25rem 1.1rem; }
          .areas_left_heading { font-size: clamp(1.5rem, 6.5vw, 1.9rem); }
          .areas_link_text { font-size: 1.02rem; }
          .areas_scroll_list { max-height: 340px; }
          .areas_left_cta { width: 100%; }
          .mandate_modal_backdrop { padding: 1rem; align-items: flex-end; }
          .mandate_modal_dialog { padding: 1.5rem 1.25rem; max-height: 88vh; max-height: 88dvh; border-radius: 12px 12px 0 0; }
          .mandate_modal_title { font-size: 1.25rem; }
        }
      `}</style>

      <div className="areas_container">
        <div className="areas_wrap">
          {/* Pinned Left Card (TLH Exact Style) */}
          <div className="areas_left">
            <div className="areas_badge">
              <Scale size={13} />
              <span>Core Mandates</span>
            </div>

            <h2 className="areas_left_heading">Practice Areas</h2>

            <div className="accent-line-horizontal">
              <div className="accent-line-element-horizontal" />
            </div>

            <p className="areas_left_description">
              Our nuanced understanding of the legal landscape equips us to effectively counsel international and domestic businesses, operations and investments across varied practice areas.
            </p>

            <button
              type="button"
              className="areas_left_cta"
              onClick={handleConsult}
            >
              <span>Consult Chambers</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Scrollable Right List (TLH Exact Links & Scroll) */}
          <div className="areas_right">
            <div className="areas_scroll_list" ref={scrollListRef}>
              {PRACTICE_AREAS.map((area) => (
                <div
                  key={area.id}
                  className="areas_link_block"
                  onClick={() => setSelectedModalArea(area)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="areas_link_text">{area.title}</span>

                  <div className="areas_link_arrow_wrap">
                    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.761719 1.62158L6.09616 6.95602L0.792858 12.2593" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="areas_hover_accent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TLH Detail Mandate Modal */}
      {selectedModalArea && (
        <div
          className="mandate_modal_backdrop"
          onClick={() => setSelectedModalArea(null)}
        >
          <div
            className="mandate_modal_dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mandate_close_btn"
              onClick={() => setSelectedModalArea(null)}
              aria-label="Close practice detail modal"
            >
              <X size={18} />
            </button>

            <span className="mandate_num_tag">{selectedModalArea.num} &bull; {selectedModalArea.tag}</span>

            <h3 className="mandate_modal_title">{selectedModalArea.title}</h3>
            <p className="mandate_modal_desc">{selectedModalArea.shortDesc}</p>

            <div className="mandate_statute_box">
              <strong style={{ color: '#C5A059' }}>Primary Statutory Bench: </strong>
              <span>{selectedModalArea.statutes}</span>
            </div>

            <div className="mandate_points_title">Key Advocacy & Regulatory Mandates</div>
            <div>
              {selectedModalArea.points.map((pt, idx) => (
                <div key={idx} className="mandate_point_row">
                  <CheckCircle2 size={15} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="mandate_footer_action">
              <button
                type="button"
                className="areas_left_cta"
                onClick={() => {
                  setSelectedModalArea(null);
                  handleConsult();
                }}
              >
                <span>Engage Counsel in {selectedModalArea.title}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticeAreas;
