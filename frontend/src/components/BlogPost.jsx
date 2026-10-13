import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Share2,
  Download,
  Check,
  Scale,
  GraduationCap,
  MapPin
} from "lucide-react";
import { useTheme } from "./ThemeContext";
import { BLOG_POSTS_DATA } from "./Blogs.jsx";

const TREATISE_CONTENTS = {
  cybercrime: {
    title: "Cybercrime Without Borders: Navigating Extraterritorial Jurisdictions & Cloud Evidence",
    subtitle: "A Doctrinal Inquiry into Cross-Border Data Preservation, Section 66 IT Act, and the Sovereignty Conflict in Cloud Espionage",
    date: "January 11, 2026",
    readTime: "12 min read",
    citation: "2026 MLS J. L. & Tech. 104",
    category: "Cyber & Emerging Tech",
    author: {
      name: "Shivani Patel",
      role: "Research Fellow, Cyber Jurisprudence Desk",
      photo: "/shivani.jpg",
      qualification: "LL.B. (Hons.), Bharati Vidyapeeth New Law College",
      location: "Pune & Hyderabad Chambers",
      bio: "Specializing in international digital evidence extraction, cyber sovereignty conflicts, cryptographic privacy, and data fiduciary compliance."
    },
    sections: [
      {
        id: "cyberspace-architecture",
        title: "1. The Tri-Layered Architecture of Cyberspace",
        content: `
          <p class="lead-para">Cyberspace has ceased to be a mere metaphor for electronic mail exchanges; it is today the fundamental substrate of sovereign economic stability and geopolitical diplomacy. Unlike physical territorial borders defined by geographical contours, digital spaces operate on a multi-tiered global commons consisting of physical sub-sea cables, logical routing protocols (BGP/TCP-IP), and cryptographic application layers.</p>
          <p>The term “cyberspace” originates in cybernetics—pioneered by Norbert Wiener to characterize systematic information feedback loops—and was later popularized by William Gibson in <em>Neuromancer</em>. Contemporary jurisprudential doctrine segregates cyberspace into three distinct operational strata:</p>
          <ul>
            <li><strong>The Physical Tier:</strong> Trans-oceanic fiber backbones, telecommunication towers, satellite arrays, server farms, and specialized hardware security modules (HSMs).</li>
            <li><strong>The Logical Tier:</strong> DNS roots, IP address spaces, encryption keys, cryptographic handshakes, and distributed decentralized ledger layers.</li>
            <li><strong>The Personae Tier:</strong> Digital identities, corporate credentials, personal data flows, biometric tokens, and algorithmic social interactions.</li>
          </ul>
          <p>Because the physical and logical layers frequently reside within different sovereign borders than the personae being harmed, traditional <em>lex loci delicti</em> (law of the place of the wrong) proves systematically inadequate in resolving jurisdictional conflicts.</p>
        `
      },
      {
        id: "classification-offences",
        title: "2. Doctrinal Taxonomy of Cross-Border Cyber Offenses",
        content: `
          <p>Indian penal jurisprudence under the Information Technology Act 2000, read alongside the Bharatiya Nyaya Sanhita (and erstwhile IPC), classifies cyber offenses into four distinct operational branches:</p>
          <div class="statute-callout">
            <h4>Statutory Division of Offences</h4>
            <ol>
              <li><strong>Cyber-Dependent Crimes:</strong> Acts that can only exist through digital computing—unauthorized data exfiltration under § 43(a), source code tampering under § 65, and denial-of-service or ransomware infiltration under § 66F.</li>
              <li><strong>Cyber-Enabled Crimes:</strong> Conventional economic swindles, criminal intimidation, and money laundering amplified by anonymous proxy routers and cryptocurrency mixing pools.</li>
              <li><strong>Sovereign Infrastructure Attacks:</strong> Coordinated Advanced Persistent Threats (APTs) targeting SCADA power grids, nuclear control systems, or banking settlement networks.</li>
            </ol>
          </div>
          <p>Section 75 of the IT Act explicitly affords extraterritorial reach to Indian courts where an offence involves a computer or network located in India, irrespective of the nationality of the perpetrator. However, adjudicative jurisdiction remains futile without enforcement capability.</p>
        `
      },
      {
        id: "jurisdictional-friction",
        title: "3. The Jurisdictional Friction: Cloud Evidence & MLAT Deficits",
        content: `
          <p>The critical bottleneck in international cyber prosecution is evidence acquisition. Digital artifacts—such as non-volatile RAM snapshots, ephemeral server connection logs, and end-to-end encrypted messaging metadata—are predominantly stored on distributed hyperscale servers physically stationed within the United States, Ireland, or Singapore.</p>
          <blockquote class="treatise-quote">
            "The traditional concept of sovereignty rests on physical geography; the cloud rests on deliberate geographic obfuscation. When criminal evidence is fragmented across three continents within milliseconds, the territorial court is blinded unless procedural treaties evolve in lockstep."
          </blockquote>
          <p>While Letters Rogatory issued under Section 166A of the Code of Criminal Procedure provide a statutory mechanism for overseas evidence collection, average processing times exceed eighteen to twenty-four months—during which volatile server logs are inevitably overwritten.</p>
          <p>The solution lies in embracing modern international frameworks like the Budapest Convention on Cybercrime (Second Additional Protocol) and bilateral Cloud Act agreements, enabling direct judicial subpoenas to service providers under strict proportionality and fundamental privacy safeguards.</p>
        `
      },
      {
        id: "conclusions-remedies",
        title: "4. Harmonization of Domestic Law with Global Norms",
        content: `
          <p>A borderless digital ecosystem necessitates moving from isolated territorial doctrines to reciprocal procedural bridges. For India, sitting at the epicenter of the global digital services market, statutory alignment requires three urgent milestones:</p>
          <ul>
            <li><strong>Emergency Data Preservation Orders:</strong> Empowering specialized judicial magistrates to issue expedited 90-day evidence freeze notices to foreign intermediaries.</li>
            <li><strong>Chain-of-Custody Cryptographic Hashing:</strong> Universalizing SHA-256 and Ed25519 cryptographic signatures for electronic records submitted under Section 65B of the Indian Evidence Act.</li>
            <li><strong>Bilateral Executive Agreements:</strong> Expediting direct law-enforcement requests for non-content metadata while maintaining rigorous judicial oversight for content surveillance.</li>
          </ul>
        `
      }
    ],
    statutes: [
      { name: "Information Technology Act, 2000", section: "Sections 43, 66, 66F & 75" },
      { name: "Code of Criminal Procedure, 1973", section: "Section 166A (Letters Rogatory)" },
      { name: "Budapest Convention on Cybercrime", section: "Articles 18, 29 & 32b" },
      { name: "Digital Personal Data Protection Act, 2023", section: "Sections 6 & 16" }
    ]
  },
  "corporate-governance": {
    title: "Corporate Governance Under Amended SEBI LODR: ESG Disclosures & Director Fiduciary Duties",
    subtitle: "Navigating BRSR Core Mandates, Board Oversight Responsibilities, and Mitigating Independent Director Liability",
    date: "February 24, 2026",
    readTime: "9 min read",
    citation: "2026 Corp. L. Rev. 88",
    category: "Corporate & M&A",
    author: {
      name: "Dr. Sattaru Rajani",
      role: "Managing Partner, Corporate Advisory Bench",
      photo: "/praksh.png",
      qualification: "Ph.D. in Corporate Jurisprudence, Senior Advocate",
      location: "Visakhapatnam & Hyderabad Chambers",
      bio: "Advising multinational boards on cross-border mergers, board liability architectures, SEBI regulatory inquiries, and insolvency restructuring."
    },
    sections: [
      {
        id: "sebi-lodr-evolution",
        title: "1. The Evolving Regulatory Landscape Under SEBI LODR",
        content: `
          <p class="lead-para">Recent revisions to the SEBI (Listing Obligations and Disclosure Requirements) Regulations 2015 mark an unprecedented pivot from voluntary ESG posturing toward verifiable statutory compliance. Board directors now shoulder direct responsibility for the verifiability of ESG metrics reported in the Business Responsibility and Sustainability Report (BRSR) Core framework.</p>
          <p>Section 166 of the Companies Act 2013 has long codified the fiduciary duty of directors to act in good faith and in the best interests of the company, its employees, shareholders, and the environment. However, recent regulatory enforcement treats environmental neglect not merely as reputational hazard, but as an actionable breach of statutory care.</p>
        `
      },
      {
        id: "director-safeguards",
        title: "2. Shielding Independent Directors: The Business Judgement Rule",
        content: `
          <p>Indian corporate jurisprudence does not possess an explicit statutory Business Judgement Rule comparable to Delaware General Corporation Law § 141. Nonetheless, Supreme Court precedents consistently recognize that independent directors who act on independent expert counsel, maintain diligent dissent records in minutes, and recuse from interested transactions are entitled to safe-harbor immunity.</p>
        `
      }
    ],
    statutes: [
      { name: "Companies Act, 2013", section: "Section 166 & 149(12)" },
      { name: "SEBI LODR Regulations, 2015", section: "Regulations 23, 27 & 34" },
      { name: "BRSR Core Framework", section: "SEBI Circular 2023/120" }
    ]
  },
  "constitutional-writs": {
    title: "Article 226 Writs: Judicial Review of State Commercial Arbitrariness & Tender Blacklisting",
    subtitle: "Extraordinary High Court Jurisdiction, Proportionality in Government Contracts, and Non-Arbitrable Remedies",
    date: "March 08, 2026",
    readTime: "14 min read",
    citation: "2026 Const. L. Rep. 215",
    category: "Constitutional & Writs",
    author: {
      name: "Dr. Mojjada Ramakrishna",
      role: "Senior Partner & Senior Judicial Counsel",
      photo: "/swaroop.png",
      qualification: "Senior Advocate, High Court of AP & Telangana",
      location: "Hyderabad & Visakhapatnam",
      bio: "Distinguished constitutional scholar and advocate specializing in administrative review, writ petitions, and public procurement disputes."
    },
    sections: [
      {
        id: "article-14-contracts",
        title: "1. The Infiltration of Article 14 into Sovereign Commercial Contracts",
        content: `
          <p class="lead-para">The traditional English common law distinction between public law remedies and private contractual rights has undergone radical transformation in Indian constitutional jurisprudence. It is now settled law that the State cannot shed its constitutional obligations under Article 14 merely because it steps into the commercial marketplace.</p>
          <p>While High Courts ordinarily decline to exercise writ jurisdiction under Article 226 where effective alternative dispute mechanisms (such as arbitration) exist, arbitrary cancellations, biased disqualifications, and unreasoned blacklisting orders remain strictly amenable to judicial review.</p>
        `
      }
    ],
    statutes: [
      { name: "Constitution of India", section: "Articles 14, 19(1)(g) & 226" },
      { name: "Specific Relief Act, 1963", section: "Section 20A & 41(ha)" },
      { name: "Public Procurement Norms", section: "Central Vigilance Guidelines" }
    ]
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  const [copiedCitation, setCopiedCitation] = useState(false);

  // Retrieve treatise details or default to cybercrime
  const treatise = useMemo(() => {
    return TREATISE_CONTENTS[id] || TREATISE_CONTENTS["cybercrime"];
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Handle citation copy — Clipboard API with legacy fallback.
  const handleCopyCitation = async () => {
    const text = `${treatise.author.name}, "${treatise.title}", ${treatise.citation} (${treatise.date}).`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  // Other related treatises
  const relatedTreatises = useMemo(() => {
    return BLOG_POSTS_DATA.filter((p) => p.id !== id).slice(0, 3);
  }, [id]);

  return (
    <div className={`blogpost-page-root ${isDarkTheme ? "theme-dark" : "theme-light"}`}>
      <style>{`
        .blogpost-page-root {
          min-height: 100vh;
          width: 100%;
          font-family: 'Cinzel', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, serif;
          transition: background-color 0.4s ease, color 0.4s ease;
          position: relative;
          padding-top: 110px;
          padding-bottom: 90px;
        }

        .blogpost-page-root.theme-dark {
          background-color: #0c0d11;
          color: #f5f4ef;
        }

        .blogpost-page-root.theme-light {
          background-color: #faf9f5;
          color: #14161f;
        }

        .blogpost-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Top Bar Navigation */
        .article-back-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .article-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          min-height: 44px;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: inherit;
          color: #c5a059;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: transform var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
          padding: 0.4rem 0;
        }

        .article-back-btn:active {
          transform: scale(0.97);
        }

        @media (hover: hover) and (pointer: fine) {
          .article-back-btn:hover {
            transform: translateX(-4px);
            color: #f2e3c6;
          }
        }

        .article-citation-tag {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.65;
        }

        /* Treatise Masthead */
        .treatise-header {
          margin-bottom: 3.5rem;
          max-width: 960px;
        }

        .treatise-badge-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .treatise-category-pill {
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid rgba(197, 160, 89, 0.3);
          color: #c5a059;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .treatise-meta-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .treatise-meta-info span {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .treatise-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 4.2vw, 3.8rem);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.015em;
          margin: 0 0 1.25rem;
          color: currentColor;
        }

        .treatise-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.75;
          margin: 0;
          font-weight: 300;
          font-style: italic;
        }

        /* Two-Column Layout: Main Content (72%) + STICKY Sidebar (28%) */
        .treatise-grid-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
          align-items: start;
          margin-bottom: 5.5rem;
        }

        /* Left Editorial Body */
        .article-content-body {
          font-family: Georgia, 'Playfair Display', serif;
          font-size: 1.15rem;
          line-height: 1.85;
          letter-spacing: 0.01em;
        }

        .lead-para::first-letter {
          font-size: 3.8rem;
          float: left;
          line-height: 0.85;
          padding-right: 0.75rem;
          color: #c5a059;
          font-family: 'Cinzel', serif;
          font-weight: 700;
        }

        .article-content-body h3 {
          font-size: 1.85rem;
          font-weight: 600;
          margin: 3.5rem 0 1.25rem;
          color: currentColor;
          font-family: 'Playfair Display', Georgia, serif;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          padding-bottom: 0.5rem;
        }

        .article-content-body p {
          margin-bottom: 1.6rem;
          opacity: 0.88;
        }

        .article-content-body ul,
        .article-content-body ol {
          margin: 1.25rem 0 2rem 1.75rem;
          opacity: 0.88;
        }

        .article-content-body li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }

        .treatise-quote {
          margin: 2.5rem 0;
          padding: 1.75rem 2rem;
          border-left: 3px solid #c5a059;
          font-style: italic;
          font-size: 1.2rem;
          line-height: 1.7;
          border-radius: 0 6px 6px 0;
        }

        .theme-dark .treatise-quote {
          background: rgba(197, 160, 89, 0.05);
          color: #f2e3c6;
        }

        .theme-light .treatise-quote {
          background: rgba(197, 160, 89, 0.08);
          color: #4a3407;
        }

        .statute-callout {
          padding: 1.8rem;
          border-radius: 8px;
          border: 1px solid rgba(197, 160, 89, 0.25);
          margin: 2.2rem 0;
        }

        .theme-dark .statute-callout {
          background: #12141c;
        }

        .theme-light .statute-callout {
          background: #ffffff;
        }

        .statute-callout h4 {
          margin: 0 0 1rem;
          color: #c5a059;
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* STICKY Sidebar Column (User requirement: make image sticky, perfect neat) */
        .treatise-sticky-sidebar {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .author-dossier-card {
          padding: 2.2rem;
          border-radius: 10px;
          border: 1px solid rgba(197, 160, 89, 0.25);
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .theme-dark .author-dossier-card {
          background: #12141c;
        }

        .theme-light .author-dossier-card {
          background: #ffffff;
        }

        .sticky-photo-frame {
          width: 120px;
          height: 120px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #c5a059, #9e7b38);
          box-shadow: 0 8px 20px rgba(197, 160, 89, 0.25);
        }

        .sticky-photo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .dossier-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          margin: 0 0 0.35rem;
          font-weight: 600;
        }

        .dossier-role {
          font-size: 0.78rem;
          color: #c5a059;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0 0 1.25rem;
        }

        .dossier-detail-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          opacity: 0.7;
          margin-bottom: 0.4rem;
        }

        .dossier-bio {
          font-size: 0.85rem;
          line-height: 1.6;
          opacity: 0.8;
          margin: 1.25rem 0 0;
          padding-top: 1rem;
          border-top: 1px solid rgba(197, 160, 89, 0.15);
          font-family: -apple-system, sans-serif;
          font-weight: 300;
          text-align: left;
        }

        /* Sticky Action Deck */
        .sticky-action-deck {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .action-deck-btn {
          width: 100%;
          padding: 0.85rem 1.2rem;
          min-height: 48px;
          border-radius: 6px;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out), border-color var(--dur-pop) var(--ease-out);
        }

        .action-deck-btn:active {
          transform: scale(0.97);
        }

        .btn-copy-citation {
          border: 1px solid #c5a059;
          background: transparent;
          color: #c5a059;
        }

        .btn-download-pdf {
          border: 1px solid rgba(197, 160, 89, 0.25);
          background: rgba(197, 160, 89, 0.08);
          color: currentColor;
        }

        @media (hover: hover) and (pointer: fine) {
          .btn-copy-citation:hover {
            background: #c5a059;
            color: #0c0d11;
          }
          .btn-download-pdf:hover {
            background: rgba(197, 160, 89, 0.15);
          }
        }

        /* Statutes Sidebox */
        .sidebar-statutes-box {
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }

        .theme-dark .sidebar-statutes-box {
          background: #12141c;
        }

        .theme-light .sidebar-statutes-box {
          background: #ffffff;
        }

        .statutes-box-title {
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c5a059;
          font-weight: 700;
          margin: 0 0 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .statute-entry {
          margin-bottom: 0.85rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.1);
        }

        .statute-entry:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .statute-entry-name {
          font-size: 0.82rem;
          font-weight: 600;
          margin: 0 0 0.15rem;
        }

        .statute-entry-section {
          font-size: 0.72rem;
          color: #c5a059;
          opacity: 0.9;
        }

        /* Bottom Related Treatises Section */
        .related-treatises-section {
          padding-top: 4rem;
          border-top: 1px solid rgba(197, 160, 89, 0.2);
        }

        .related-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem;
          margin: 0 0 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .related-card {
          padding: 1.8rem;
          border-radius: 8px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          cursor: pointer;
          min-width: 0;
          transition: transform var(--dur-drop) var(--ease-out), border-color var(--dur-pop) var(--ease-out), box-shadow var(--dur-drop) var(--ease-out);
        }

        .related-card:active {
          transform: scale(0.99);
        }

        .theme-dark .related-card {
          background: #12141c;
        }

        .theme-light .related-card {
          background: #ffffff;
        }

        @media (hover: hover) and (pointer: fine) {
          .theme-dark .related-card:hover {
            border-color: #c5a059;
            transform: translateY(-4px);
          }
          .theme-light .related-card:hover {
            border-color: #9e7b38;
            transform: translateY(-4px);
          }
        }

        .related-card-category {
          font-size: 0.72rem;
          color: #c5a059;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .related-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.25rem;
          line-height: 1.35;
          margin: 0 0 0.75rem;
        }

        .related-card-date {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .treatise-grid-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .treatise-sticky-sidebar {
            position: relative;
            top: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .blogpost-container {
            padding: 0 1.25rem;
          }
          .treatise-header {
            margin-bottom: 2rem;
          }
          .treatise-sticky-sidebar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="blogpost-container">
        {/* Navigation Bar */}
        <div className="article-back-bar">
          <button className="article-back-btn" onClick={() => navigate("/blogs")}>
            <ArrowLeft size={16} /> Return to Legal Insights Archive
          </button>
          <span className="article-citation-tag">Citation: {treatise.citation}</span>
        </div>

        {/* Treatise Editorial Header */}
        <header className="treatise-header">
          <div className="treatise-badge-row">
            <span className="treatise-category-pill">{treatise.category}</span>
            <div className="treatise-meta-info">
              <span>
                <Calendar size={13} /> {treatise.date}
              </span>
              <span>
                <Clock size={13} /> {treatise.readTime}
              </span>
            </div>
          </div>

          <h1 className="treatise-title">{treatise.title}</h1>
          <p className="treatise-subtitle">{treatise.subtitle}</p>
        </header>

        {/* Main 2-Column Layout */}
        <div className="treatise-grid-layout">
          {/* Main Article Body */}
          <main className="article-content-body">
            {treatise.sections.map((sec) => (
              <section key={sec.id} id={sec.id}>
                <h3>{sec.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: sec.content }} />
              </section>
            ))}
          </main>

          {/* STICKY Sidebar: Image, Author Dossier, Statutes, Citations */}
          <aside className="treatise-sticky-sidebar">
            <div className="author-dossier-card">
              <div className="sticky-photo-frame">
                <img
                  src={treatise.author.photo}
                  alt={treatise.author.name}
                  className="sticky-photo-img"
                />
              </div>

              <h3 className="dossier-name">{treatise.author.name}</h3>
              <p className="dossier-role">{treatise.author.role}</p>

              <div className="dossier-detail-row">
                <GraduationCap size={14} color="#c5a059" />
                <span>{treatise.author.qualification}</span>
              </div>

              <div className="dossier-detail-row">
                <MapPin size={14} color="#c5a059" />
                <span>{treatise.author.location}</span>
              </div>

              <p className="dossier-bio">{treatise.author.bio}</p>
            </div>

            {/* Quick Actions */}
            <div className="sticky-action-deck">
              <button className="action-deck-btn btn-copy-citation" onClick={handleCopyCitation}>
                {copiedCitation ? (
                  <>
                    <Check size={14} /> Citation Copied
                  </>
                ) : (
                  <>
                    <Share2 size={14} /> Copy Citation Record
                  </>
                )}
              </button>

              <button
                className="action-deck-btn btn-download-pdf"
                onClick={() => alert("Treatise PDF is being rendered by Chambers Document Service.")}
              >
                <Download size={14} /> Download PDF Briefing
              </button>
            </div>

            {/* Statutory Reference Table */}
            {treatise.statutes && (
              <div className="sidebar-statutes-box">
                <div className="statutes-box-title">
                  <Scale size={14} /> Key Statutory Provisions
                </div>
                {treatise.statutes.map((stat, idx) => (
                  <div key={idx} className="statute-entry">
                    <div className="statute-entry-name">{stat.name}</div>
                    <div className="statute-entry-section">{stat.section}</div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>

        {/* Related Treatises */}
        <section className="related-treatises-section">
          <h2 className="related-title">
            <BookOpen size={20} color="#c5a059" />
            Parallel Research Dossiers
          </h2>

          <div className="related-grid">
            {relatedTreatises.map((item) => (
              <div
                key={item.id}
                className="related-card"
                onClick={() => navigate(`/blog/${item.id}`)}
                role="link"
                tabIndex={0}
                aria-label={`Read: ${item.title}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(`/blog/${item.id}`); } }}
              >
                <div className="related-card-category">{item.category}</div>
                <h3 className="related-card-title">{item.title}</h3>
                <div className="related-card-date">{item.date} • {item.readTime}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
