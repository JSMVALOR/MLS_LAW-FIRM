import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Scale,
  Briefcase,
  Cpu,
  Bookmark,
  FileText,
  Sparkles
} from "lucide-react";
import { useTheme } from "./ThemeContext";

export const BLOG_POSTS_DATA = [
  {
    id: "cybercrime",
    category: "Cyber & Emerging Tech",
    categoryIcon: Cpu,
    title: "Cybercrime Without Borders: Navigating Extraterritorial Jurisdictions & Cloud Evidence",
    date: "January 11, 2026",
    readTime: "12 min read",
    author: "Shivani Patel",
    authorRole: "Research Fellow, Cyber Jurisprudence Desk",
    authorImage: "/shivani.jpg",
    image: "/FirmImage.jpg",
    featured: true,
    excerpt:
      "A rigorous examination of cross-border data preservation orders, Mutual Legal Assistance Treaties (MLATs), and how traditional Indian penal statutes reconcile with sovereign cloud infrastructures and distributed cryptographic ledgers.",
    keyProposition: "Statutory interface of IT Act §§ 43/66 with international privacy treaties and extraterritorial search warrants.",
    statutes: ["IT Act 2000 § 43 & 66", "CrPC § 166A", "Budapest Convention Art. 18", "DPDP Act 2023"],
    citations: "2026 MLS J. L. & Tech. 104"
  },
  {
    id: "corporate-governance",
    category: "Corporate & M&A",
    categoryIcon: Briefcase,
    title: "Corporate Governance Under Amended SEBI LODR: ESG Disclosures & Director Fiduciary Duties",
    date: "February 24, 2026",
    readTime: "9 min read",
    author: "Dr. Sattaru Rajani",
    authorRole: "Managing Partner, Corporate Advisory Bench",
    authorImage: "/praksh.png",
    image: "/FirmImage.jpg",
    featured: false,
    excerpt:
      "A strategic assessment of emerging BRSR Core compliance parameters, related-party transaction authorizations, and legal safeguards shielding independent board committees from derivative exposure.",
    keyProposition: "Re-calibration of business judgement doctrines in climate-risk disclosures and cross-border amalgamations.",
    statutes: ["Companies Act 2013 § 166", "SEBI LODR Reg. 23 & 34", "BRSR Core Framework"],
    citations: "2026 Corp. L. Rev. 88"
  },
  {
    id: "constitutional-writs",
    category: "Constitutional & Writs",
    categoryIcon: Scale,
    title: "Article 226 Writs: Judicial Review of State Commercial Arbitrariness & Tender Blacklisting",
    date: "March 08, 2026",
    readTime: "14 min read",
    author: "Dr. Mojjada Ramakrishna",
    authorRole: "Senior Partner & Senior Judicial Counsel",
    authorImage: "/swaroop.png",
    image: "/FirmImage.jpg",
    featured: false,
    excerpt:
      "Balancing alternate contractual arbitration remedies with high-court extraordinary writ intervention under Article 14 to remedy arbitrary sovereign procurement cancellations.",
    keyProposition: "The doctrine of proportionality as applied to administrative blacklisting and sovereign contractual cancellation.",
    statutes: ["Constitution of India Art. 14 & 226", "Specific Relief Act § 20A", "Public Procurement Manual § 7"],
    citations: "2026 Const. L. Rep. 215"
  },
  {
    id: "arbitral-awards",
    category: "International Arbitration",
    categoryIcon: Scale,
    title: "Enforcement of Foreign Arbitral Awards: The Public Policy Exception Narrowed",
    date: "March 29, 2026",
    readTime: "11 min read",
    author: "Adv. Rohit Verma",
    authorRole: "Senior Advocate, International Arbitration Division",
    authorImage: "/praksh.png",
    image: "/FirmImage.jpg",
    featured: false,
    excerpt:
      "An in-depth doctrinal breakdown of Section 48 of the Arbitration & Conciliation Act 1996 in light of recent Apex Court rulings curbing merits re-evaluations under the guise of public policy.",
    keyProposition: "Pro-enforcement judicial policy and the stringent bar against reviewing foreign arbitral awards on substantive merits.",
    statutes: ["Arbitration Act 1996 § 48", "New York Convention 1958 Art. V", "FEMA 1999 § 47"],
    citations: "2026 Int'l Arb. Bull. 42"
  },
  {
    id: "dpdp-compliance",
    category: "Data Protection & Privacy",
    categoryIcon: Cpu,
    title: "Digital Personal Data Protection Act 2023: Enterprise Governance & Cross-Border Data Flows",
    date: "April 05, 2026",
    readTime: "10 min read",
    author: "Shivani Patel",
    authorRole: "Research Fellow, Tech Law Desk",
    authorImage: "/shivani.jpg",
    image: "/FirmImage.jpg",
    featured: false,
    excerpt:
      "Operationalising Data Protection Officer (DPO) duties, data fiduciary accountability protocols, and structured notice architectures to survive the ₹250 Cr statutory ceiling.",
    keyProposition: "Statutory notice standardization and valid verifiable consent mechanisms for corporate data fiduciaries.",
    statutes: ["DPDP Act 2023 §§ 6, 8 & 9", "IT Act 2000 § 43A", "EU GDPR Art. 45 Comparison"],
    citations: "2026 Tech Privacy Q. 19"
  },
  {
    id: "insolvency-waterfall",
    category: "Corporate & M&A",
    categoryIcon: Briefcase,
    title: "IBC Section 53 Waterfall Mechanism: Secured Creditor Priority vs. Statutory Dues",
    date: "April 18, 2026",
    readTime: "13 min read",
    author: "Dr. Sattaru Rajani",
    authorRole: "Managing Partner, Corporate Advisory Bench",
    authorImage: "/praksh.png",
    image: "/FirmImage.jpg",
    featured: false,
    excerpt:
      "Comprehensive analysis of Rainbow Papers jurisprudence, subsequent legislative clarifications, and the inviolable priority of first-charge commercial security holders in liquidation proceedings.",
    keyProposition: "Precedence of consensual commercial security interests over sovereign tax liens under the Insolvency Code.",
    statutes: ["Insolvency & Bankruptcy Code § 53", "SARFAESI Act § 26E", "State Tax Enactments"],
    citations: "2026 IBC Reporter 310"
  }
];

const CATEGORIES = [
  "All Disciplines",
  "Cyber & Emerging Tech",
  "Corporate & M&A",
  "Constitutional & Writs",
  "International Arbitration",
  "Data Protection & Privacy"
];

const Blogs = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Disciplines");

  // Filtered post list
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Disciplines" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.statutes.some((s) => s.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Lead featured post (from full list or fallback)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS_DATA.find((p) => p.featured) || BLOG_POSTS_DATA[0];
  }, []);

  return (
    <div className={`blogs-page-root ${isDarkTheme ? "theme-dark" : "theme-light"}`}>
      <style>{`
        .blogs-page-root {
          min-height: 100vh;
          width: 100%;
          font-family: 'Cinzel', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, serif;
          transition: background-color 0.4s ease, color 0.4s ease;
          position: relative;
          padding-top: 100px;
          padding-bottom: 90px;
        }

        .blogs-page-root.theme-dark {
          background-color: #0c0d11;
          color: #f5f4ef;
        }

        .blogs-page-root.theme-light {
          background-color: #faf9f5;
          color: #14161f;
        }

        /* Subtle background grain & aura */
        .blogs-page-root::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 600px;
          background: radial-gradient(circle at 50% 0%, rgba(197, 160, 89, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .blogs-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        /* Masthead Section */
        .blogs-masthead {
          padding: 2.5rem 0 3.5rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.22);
          margin-bottom: 4rem;
        }

        .masthead-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chambers-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #c5a059;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.25);
          border-radius: 999px;
        }

        .chambers-status {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          opacity: 0.6;
          text-transform: uppercase;
        }

        .masthead-title {
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -0.015em;
          margin: 0 0 1.25rem;
          color: currentColor;
        }

        .masthead-title span {
          color: #c5a059;
          font-style: italic;
        }

        .masthead-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          opacity: 0.78;
          max-width: 820px;
          margin: 0;
          font-weight: 300;
        }

        /* Control Deck: Search & Categories */
        .control-deck {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-wrapper {
          position: relative;
          max-width: 580px;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: #c5a059;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.95rem 1.2rem 0.95rem 3.2rem;
          border-radius: 8px;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          outline: none;
          transition: border-color var(--dur-pop) var(--ease-out), box-shadow var(--dur-pop) var(--ease-out);
          font-family: inherit;
        }

        .theme-dark .search-input {
          background: #12141c;
          border: 1px solid rgba(197, 160, 89, 0.25);
          color: #f5f4ef;
        }

        .theme-dark .search-input:focus {
          border-color: #c5a059;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15);
        }

        .theme-light .search-input {
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.35);
          color: #14161f;
        }

        .theme-light .search-input:focus {
          border-color: #9e7b38;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        /* Category Filter Pills */
        .categories-deck {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          align-items: center;
        }

        .category-pill {
          padding: 0.55rem 1.15rem;
          min-height: 40px;
          border-radius: 999px;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), color var(--dur-pop) var(--ease-out), border-color var(--dur-pop) var(--ease-out), background-color var(--dur-pop) var(--ease-out);
          border: 1px solid transparent;
          background: transparent;
          white-space: nowrap;
        }

        .category-pill:active {
          transform: scale(0.95);
        }

        .theme-dark .category-pill {
          color: #a4a7b5;
          border-color: rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .theme-dark .category-pill.active {
          color: #0c0d11;
          background: linear-gradient(135deg, #E8CF9A 0%, #c5a059 60%, #9e7b38 100%);
          border-color: #c5a059;
          box-shadow: 0 4px 18px rgba(197, 160, 89, 0.25);
        }

        .theme-light .category-pill {
          color: #555c6e;
          border-color: rgba(0, 0, 0, 0.08);
          background: rgba(0, 0, 0, 0.02);
        }

        .theme-light .category-pill.active {
          color: #ffffff;
          background: #9e7b38;
          border-color: #9e7b38;
          box-shadow: 0 4px 18px rgba(158, 123, 56, 0.25);
        }

        @media (hover: hover) and (pointer: fine) {
          .theme-dark .category-pill:hover {
            color: #f5f4ef;
            border-color: rgba(197, 160, 89, 0.4);
            background: rgba(197, 160, 89, 0.05);
          }
          .theme-light .category-pill:hover {
            color: #14161f;
            border-color: rgba(158, 123, 56, 0.4);
            background: rgba(197, 160, 89, 0.08);
          }
        }

        /* Lead Featured Treatise */
        .featured-treatise-wrapper {
          margin-bottom: 5.5rem;
        }

        .featured-section-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .featured-card {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: 3.5rem;
          padding: 3rem;
          border-radius: 12px;
          border: 1px solid rgba(197, 160, 89, 0.28);
          align-items: center;
          position: relative;
          overflow: hidden;
          min-width: 0;
          transition: border-color var(--dur-drop) var(--ease-out), box-shadow var(--dur-drop) var(--ease-out);
        }

        .theme-dark .featured-card {
          background: linear-gradient(135deg, #12141c 0%, #0e1017 100%);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
        }

        .theme-light .featured-card {
          background: linear-gradient(135deg, #ffffff 0%, #fbfaf6 100%);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.06);
        }

        @media (hover: hover) and (pointer: fine) {
          .featured-card:hover {
            border-color: #c5a059;
          }
          .featured-title:hover {
            color: #c5a059;
          }
          .featured-card:hover .featured-cover-img {
            transform: scale(1.03);
            filter: grayscale(0%) contrast(105%);
          }
        }

        .featured-content-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .featured-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          color: #c5a059;
        }

        .featured-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 500;
          line-height: 1.22;
          letter-spacing: -0.01em;
          margin: 0;
          color: currentColor;
          cursor: pointer;
          transition: color var(--dur-pop) var(--ease-out);
          text-wrap: balance;
        }

        .featured-excerpt {
          font-size: 1.05rem;
          line-height: 1.7;
          opacity: 0.8;
          margin: 0;
          font-weight: 300;
        }

        .statutes-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0.25rem 0;
        }

        .statute-tag {
          font-size: 0.72rem;
          padding: 0.3rem 0.65rem;
          border-radius: 4px;
          letter-spacing: 0.03em;
          font-weight: 500;
        }

        .theme-dark .statute-tag {
          background: rgba(197, 160, 89, 0.1);
          color: #f2e3c6;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }

        .theme-light .statute-tag {
          background: rgba(197, 160, 89, 0.12);
          color: #7a5c1e;
          border: 1px solid rgba(197, 160, 89, 0.25);
        }

        .featured-author-deck {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(197, 160, 89, 0.18);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .author-identity {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .author-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #c5a059;
        }

        .author-meta-name {
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin: 0 0 0.15rem;
        }

        .author-meta-role {
          font-size: 0.72rem;
          opacity: 0.65;
          margin: 0;
        }

        .meta-stats {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .meta-stats span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* Lead Image Column with Sticky Frame */
        .featured-visual-col {
          position: relative;
          height: 100%;
          min-height: 380px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(197, 160, 89, 0.3);
        }

        .featured-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(18%) contrast(105%);
          transition: transform 600ms var(--ease-out), filter 600ms var(--ease-out);
        }

        .featured-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(12, 13, 17, 0.88) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1.75rem;
        }

        .citation-tag {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: #f2e3c6;
          font-weight: 600;
          background: rgba(12, 13, 17, 0.75);
          backdrop-filter: blur(8px);
          padding: 0.4rem 0.85rem;
          border-radius: 4px;
          border: 1px solid rgba(197, 160, 89, 0.4);
        }

        .examine-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 1.8rem;
          min-height: 48px;
          border-radius: 6px;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          border: 1px solid rgba(242, 227, 198, 0.45);
          background: linear-gradient(135deg, #E8CF9A 0%, #c5a059 55%, #9e7b38 100%);
          color: #0c0d11;
          transition: transform var(--dur-press) var(--ease-out), filter var(--dur-pop) var(--ease-out), box-shadow 200ms var(--ease-out);
          width: fit-content;
          max-width: 100%;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 4px 14px rgba(197, 160, 89, 0.25);
        }

        .examine-button:active {
          transform: scale(0.97);
        }

        @media (hover: hover) and (pointer: fine) {
          .examine-button:hover {
            filter: brightness(1.06);
            transform: translateY(-2px);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 8px 24px rgba(197, 160, 89, 0.35);
          }
        }

        /* Dossiers Grid Section */
        .archive-grid-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.18);
          padding-bottom: 1rem;
        }

        .archive-section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem;
          font-weight: 500;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .archive-count {
          font-size: 0.85rem;
          opacity: 0.6;
          font-family: -apple-system, sans-serif;
          font-weight: 400;
        }

        .dossiers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2.2rem;
          margin-bottom: 5.5rem;
        }

        .dossier-card {
          border-radius: 8px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          display: flex;
          flex-direction: column;
          padding: 2.2rem;
          min-width: 0;
          transition: transform var(--dur-drop) var(--ease-out), border-color var(--dur-pop) var(--ease-out), box-shadow var(--dur-drop) var(--ease-out), background-color var(--dur-pop) var(--ease-out);
          cursor: pointer;
          position: relative;
        }

        .dossier-card:active {
          transform: scale(0.99);
        }

        .theme-dark .dossier-card {
          background: #12141c;
        }

        .theme-light .dossier-card {
          background: #ffffff;
        }

        @media (hover: hover) and (pointer: fine) {
          .theme-dark .dossier-card:hover {
            border-color: #c5a059;
            transform: translateY(-5px);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
            background: #141722;
          }
          .theme-light .dossier-card:hover {
            border-color: #9e7b38;
            transform: translateY(-5px);
            box-shadow: 0 16px 36px rgba(158, 123, 56, 0.12);
          }
          .dossier-card:hover .dossier-title {
            color: #c5a059;
          }
          .dossier-card:hover .dossier-link {
            transform: translateX(4px);
          }
        }

        .dossier-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          font-size: 0.75rem;
        }

        .dossier-category {
          color: #c5a059;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .dossier-readtime {
          opacity: 0.6;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .dossier-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 500;
          line-height: 1.32;
          letter-spacing: -0.005em;
          margin: 0 0 1rem;
          color: currentColor;
          transition: color var(--dur-pop) var(--ease-out);
          text-wrap: balance;
        }

        .dossier-excerpt {
          font-size: 0.92rem;
          line-height: 1.65;
          opacity: 0.75;
          margin: 0 0 1.5rem;
          font-weight: 300;
          flex-grow: 1;
        }

        .dossier-takeaway-box {
          padding: 0.95rem;
          border-radius: 6px;
          font-size: 0.8rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          border-left: 3px solid #c5a059;
        }

        .theme-dark .dossier-takeaway-box {
          background: rgba(197, 160, 89, 0.05);
          color: #f2e3c6;
        }

        .theme-light .dossier-takeaway-box {
          background: rgba(197, 160, 89, 0.08);
          color: #5c430e;
        }

        .dossier-takeaway-box strong {
          color: #c5a059;
          display: block;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.2rem;
        }

        .dossier-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(197, 160, 89, 0.15);
          margin-top: auto;
        }

        .dossier-author {
          font-size: 0.82rem;
          font-weight: 600;
          opacity: 0.85;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dossier-link {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #c5a059;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          transition: transform var(--dur-pop) var(--ease-out);
        }

        /* Empty State */
        .empty-filter-state {
          padding: 5rem 2rem;
          text-align: center;
          border: 1px dashed rgba(197, 160, 89, 0.3);
          border-radius: 8px;
          margin-bottom: 5rem;
        }

        .empty-icon {
          color: #c5a059;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
        }

        .empty-desc {
          font-size: 0.95rem;
          opacity: 0.65;
          margin-bottom: 1.5rem;
        }

        .reset-filter-btn {
          padding: 0.7rem 1.4rem;
          min-height: 44px;
          border-radius: 6px;
          border: 1px solid #c5a059;
          background: transparent;
          color: #c5a059;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
        }

        .reset-filter-btn:active {
          transform: scale(0.96);
        }

        @media (hover: hover) and (pointer: fine) {
          .reset-filter-btn:hover {
            background: #c5a059;
            color: #0c0d11;
          }
        }

        /* Institutional Research Advisory CTA */
        .advisory-cta-section {
          padding: 3.5rem;
          border-radius: 10px;
          border: 1px solid rgba(197, 160, 89, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .theme-dark .advisory-cta-section {
          background: radial-gradient(circle at 80% 50%, rgba(197, 160, 89, 0.12) 0%, #12141c 70%);
        }

        .theme-light .advisory-cta-section {
          background: radial-gradient(circle at 80% 50%, rgba(197, 160, 89, 0.14) 0%, #ffffff 70%);
        }

        .advisory-cta-info {
          max-width: 680px;
        }

        .advisory-badge {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c5a059;
          font-weight: 700;
          margin-bottom: 0.65rem;
        }

        .advisory-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.95rem;
          font-weight: 500;
          margin: 0 0 0.75rem;
        }

        .advisory-sub {
          font-size: 0.95rem;
          opacity: 0.75;
          line-height: 1.6;
          margin: 0;
          font-weight: 300;
        }

        .advisory-action-btn {
          padding: 0.95rem 2rem;
          min-height: 48px;
          border-radius: 6px;
          background: linear-gradient(135deg, #E8CF9A 0%, #c5a059 55%, #9e7b38 100%);
          color: #0c0d11;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: inherit;
          border: 1px solid rgba(242, 227, 198, 0.45);
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), filter var(--dur-pop) var(--ease-out), box-shadow 200ms var(--ease-out);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 4px 14px rgba(197, 160, 89, 0.25);
          white-space: nowrap;
        }

        .advisory-action-btn:active {
          transform: scale(0.97);
        }

        @media (hover: hover) and (pointer: fine) {
          .advisory-action-btn:hover {
            filter: brightness(1.06);
            transform: translateY(-2px);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 8px 24px rgba(197, 160, 89, 0.3);
          }
        }

        @media (max-width: 1024px) {
          .featured-card {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2.2rem;
          }
          .featured-visual-col {
            min-height: 280px;
          }
        }

        @media (max-width: 768px) {
          .blogs-page-root {
            padding-top: 85px;
          }
          .blogs-container {
            padding: 0 1.25rem;
          }
          .dossiers-grid {
            grid-template-columns: 1fr;
          }
          .advisory-cta-section {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="blogs-container">
        {/* Chambers Masthead */}
        <header className="blogs-masthead">
          <div className="masthead-meta-row">
            <span className="chambers-badge">
              <Sparkles size={13} />
              Chambers Legal Intelligence & Research
            </span>
            <span className="chambers-status">
              Archival Repository • Vol. XIV • 2026 Edition
            </span>
          </div>

          <h1 className="masthead-title">
            Jurisprudential <span>Treatises</span> & Inquiries
          </h1>

          <p className="masthead-lead">
            Authoritative, citation-grade commentary examining landmark High Court and Supreme
            Court precedents, cross-border dispute mechanisms, constitutional writ remedies, and
            evolving regulatory compliance frameworks.
          </p>

          {/* Search & Category Filter Controls */}
          <div className="control-deck">
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search doctrines, statutes (e.g. IT Act, Art 226), or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="categories-deck">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Lead Featured Treatise (Lead Editorial) */}
        {selectedCategory === "All Disciplines" && !searchQuery && (
          <section className="featured-treatise-wrapper">
            <div className="featured-section-label">
              <Bookmark size={15} />
              Lead Featured Treatise • Bench Advisory
            </div>

            <div className="featured-card">
              <div className="featured-content-col">
                <div className="featured-category-badge">
                  <Cpu size={14} />
                  {featuredPost.category}
                </div>

                <h2
                  className="featured-title"
                  onClick={() => navigate(`/blog/${featuredPost.id}`)}
                >
                  {featuredPost.title}
                </h2>

                <p className="featured-excerpt">{featuredPost.excerpt}</p>

                <div className="statutes-pills">
                  {featuredPost.statutes.map((stat, idx) => (
                    <span key={idx} className="statute-tag">
                      {stat}
                    </span>
                  ))}
                </div>

                <div className="featured-author-deck">
                  <div className="author-identity">
                    <img
                      src={featuredPost.authorImage}
                      alt={featuredPost.author}
                      className="author-avatar"
                    />
                    <div>
                      <p className="author-meta-name">{featuredPost.author}</p>
                      <p className="author-meta-role">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <div className="meta-stats">
                    <span>
                      <Calendar size={13} />
                      {featuredPost.date}
                    </span>
                    <span>
                      <Clock size={13} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>

                <button
                  className="examine-button"
                  onClick={() => navigate(`/blog/${featuredPost.id}`)}
                >
                  Examine Complete Treatise
                  <ArrowRight size={15} />
                </button>
              </div>

              <div
                className="featured-visual-col"
                onClick={() => navigate(`/blog/${featuredPost.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="featured-cover-img"
                />
                <div className="featured-visual-overlay">
                  <span className="citation-tag">
                    {featuredPost.citations}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Curated Research Dossiers Grid */}
        <section className="dossiers-section">
          <div className="archive-grid-header">
            <h2 className="archive-section-title">
              <FileText size={20} color="#c5a059" />
              {selectedCategory === "All Disciplines" ? "Jurisprudential Archive" : selectedCategory}
              <span className="archive-count">({filteredPosts.length} Treatises)</span>
            </h2>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="dossiers-grid">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="dossier-card"
                  onClick={() => navigate(`/blog/${post.id}`)}
                  role="link"
                  tabIndex={0}
                  aria-label={`Read: ${post.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(`/blog/${post.id}`); } }}
                >
                  <div className="dossier-top-meta">
                    <span className="dossier-category">{post.category}</span>
                    <span className="dossier-readtime">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="dossier-title">{post.title}</h3>

                  <p className="dossier-excerpt">{post.excerpt}</p>

                  <div className="dossier-takeaway-box">
                    <strong>Core Judicial Proposition</strong>
                    {post.keyProposition}
                  </div>

                  <div className="dossier-footer">
                    <span className="dossier-author">{post.author}</span>
                    <span className="dossier-link">
                      Read Opinion <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-filter-state">
              <BookOpen size={36} className="empty-icon" />
              <h3 className="empty-title">No Treatises Match Your Search</h3>
              <p className="empty-desc">
                No archived briefs matched "{searchQuery}" under "{selectedCategory}".
              </p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Disciplines");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Institutional Consultation & Research Advisory CTA */}
        <section className="advisory-cta-section">
          <div className="advisory-cta-info">
            <div className="advisory-badge">INSTITUTIONAL CONSULTATION DESK</div>
            <h3 className="advisory-title">Commission a Specialized Legal Briefing</h3>
            <p className="advisory-sub">
              Our Senior Advocates and Practice Group Chairs author custom amicus curiae briefs,
              statutory compliance risk matrices, and appellate merits opinions for domestic corporations
              and international institutions.
            </p>
          </div>

          <button
            className="advisory-action-btn"
            onClick={() => navigate("/#contact")}
          >
            Engage Chambers Counsel <ArrowRight size={15} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
