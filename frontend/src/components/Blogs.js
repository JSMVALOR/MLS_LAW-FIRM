import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Search,
  Scale,
  Briefcase,
  Cpu,
  Bookmark
} from "lucide-react";
import "../styles/Block.css";
import { useTheme } from "./ThemeContext";

const BLOG_ARTICLES = [
  {
    id: "cybercrime",
    route: "/blog/cybercrime",
    category: "Cyber & Tech Law",
    categoryIcon: Cpu,
    title: "Cybercrime Without Borders: Navigating International Legal Conflicts",
    date: "January 11, 2026",
    readTime: "12 min read",
    author: "Shivani Patel",
    authorRole: "Research Fellow, Cyber Jurisprudence Desk",
    image: "/FirmImage.jpg",
    excerpt:
      "An in-depth analysis of extraterritorial jurisdiction, cloud evidence gathering across borders, and how traditional Indian penal frameworks interface with international cyber treaties.",
    keyTakeaway: "Mutual Legal Assistance Treaties (MLATs) and the Indian IT Act framework under cross-border scrutiny."
  },
  {
    id: "corporate-governance",
    route: "/blog/cybercrime",
    category: "Corporate & M&A",
    categoryIcon: Briefcase,
    title: "Corporate Governance Under Amended SEBI LODR & ESG Mandates",
    date: "February 24, 2026",
    readTime: "9 min read",
    author: "Dr. Sattaru Rajani",
    authorRole: "Managing Partner, Corporate Advisory Bench",
    image: "/FirmImage.jpg",
    excerpt:
      "Examining board fiduciary responsibilities, related-party transaction disclosures, and liability mitigations for independent directors under evolving corporate jurisprudence.",
    keyTakeaway: "Statutory ESG reporting architectures and risk allocation in high-value amalgamations."
  },
  {
    id: "constitutional-writs",
    route: "/blog/cybercrime",
    category: "Constitutional Law",
    categoryIcon: Scale,
    title: "Article 226 Writs: Judicial Review of State Commercial Contracts",
    date: "March 08, 2026",
    readTime: "14 min read",
    author: "Dr. Mojjada Ramakrishna",
    authorRole: "Senior Partner & Judicial Counsel",
    image: "/FirmImage.jpg",
    excerpt:
      "A comprehensive doctrine review exploring when High Courts exercise writ jurisdiction over non-arbitrable public tender cancellations and administrative arbitrariness.",
    keyTakeaway: "Balancing contractual dispute clauses with constitutional guarantees under Article 14."
  },
  {
    id: "arbitral-awards",
    route: "/blog/cybercrime",
    category: "Dispute Resolution",
    categoryIcon: Scale,
    title: "Enforcement of Foreign Arbitral Awards: The Public Policy Exception",
    date: "March 29, 2026",
    readTime: "11 min read",
    author: "Adv. Rohit Verma",
    authorRole: "Senior Advocate, International Arbitration",
    image: "/FirmImage.jpg",
    excerpt:
      "Analysis of Section 48 of the Arbitration & Conciliation Act 1996 in light of recent Supreme Court rulings circumscribing the grounds for refusing foreign award execution.",
    keyTakeaway: "Pro-enforcement judicial policy and narrowing the scope of 'fundamental policy of Indian law'."
  },
  {
    id: "dpdp-compliance",
    route: "/blog/cybercrime",
    category: "Cyber & Tech Law",
    categoryIcon: Cpu,
    title: "Digital Personal Data Protection Act: Enterprise Governance Roadmap",
    date: "April 05, 2026",
    readTime: "10 min read",
    author: "Shivani Patel",
    authorRole: "Research Fellow, Tech Law Desk",
    image: "/FirmImage.jpg",
    excerpt:
      "Statutory duties of Data Fiduciaries, cross-border data transfer whitelisting, and structured penalty mitigation protocols under the DPDP Act 2023.",
    keyTakeaway: "Consent architecture implementation and privacy audits for domestic and multinational entities."
  }
];

const CATEGORIES = [
  "All Insights",
  "Cyber & Tech Law",
  "Corporate & M&A",
  "Constitutional Law",
  "Dispute Resolution"
];

const Blogs = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All Insights");
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === "All Insights" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchFilter.toLowerCase()) ||
      article.author.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeArticle = filteredArticles[activeArticleIndex] || filteredArticles[0] || BLOG_ARTICLES[0];

  return (
    <div className={`blogs-page ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {/* Background Watermark */}
      <div className="blogs-watermark" aria-hidden="true">
        <img src="/mls_logo_clean.svg" alt="" className="blogs-watermark-img" />
      </div>

      <div className="blogs-container">
        {/* Navigation & Header Strip */}
        <header className="blogs-header-strip">
          <div className="blogs-header-top">
            <button
              type="button"
              className="blogs-back-link"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
              <span>Return to Chambers Home</span>
            </button>

            <div className="blogs-header-badge">
              <BookOpen size={14} />
              <span>MLS JURISPRUDENCE & INSIGHTS DESK</span>
            </div>
          </div>

          <div className="blogs-title-row">
            <div>
              <h1 className="blogs-page-title">
                Legal Insights & <br />
                <span className="blogs-title-accent">Scholarly Opinions</span>
              </h1>
              <p className="blogs-page-subtitle">
                Authoritative commentary on high-bench constitutional rulings, corporate governance 
                developments, and technology regulations from our partners and research fellows.
              </p>
            </div>

            {/* Quick Search */}
            <div className="blogs-search-box">
              <Search size={16} className="blogs-search-icon" />
              <input
                type="text"
                placeholder="Search articles, keywords, authors..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="blogs-search-input"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="blogs-categories-bar">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveArticleIndex(0);
                }}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </header>

        {/* ========================================================
            2-COLUMN EDITORIAL SPLIT LAYOUT (STICKY IMAGE CANVAS)
            ======================================================== */}
        <div className="blogs-split-layout">
          
          {/* LEFT COLUMN: STICKY EDITORIAL IMAGE & FEATURED DOSSIER CANVAS */}
          <aside className="blogs-sticky-canvas">
            <div className="sticky-canvas-card">
              <div className="sticky-image-frame">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="sticky-image"
                />
                <div className="sticky-image-gradient" />
                <div className="sticky-category-tag">
                  <Bookmark size={13} />
                  <span>{activeArticle.category}</span>
                </div>
              </div>

              <div className="sticky-card-content">
                <div className="sticky-meta-strip">
                  <span className="sticky-meta-item">
                    <Calendar size={13} />
                    <span>{activeArticle.date}</span>
                  </span>
                  <span className="sticky-meta-dot">•</span>
                  <span className="sticky-meta-item">
                    <Clock size={13} />
                    <span>{activeArticle.readTime}</span>
                  </span>
                </div>

                <h3 className="sticky-article-title">{activeArticle.title}</h3>
                <p className="sticky-article-excerpt">{activeArticle.excerpt}</p>

                <div className="sticky-key-takeaway">
                  <span className="takeaway-label">Key Mandate Takeaway:</span>
                  <p className="takeaway-text">{activeArticle.keyTakeaway}</p>
                </div>

                <div className="sticky-author-row">
                  <div>
                    <span className="sticky-author-name">{activeArticle.author}</span>
                    <span className="sticky-author-role">{activeArticle.authorRole}</span>
                  </div>
                  <button
                    type="button"
                    className="sticky-read-btn"
                    onClick={() => navigate(activeArticle.route)}
                  >
                    <span>Read Treatise</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: SCROLLABLE LIST OF EDITORIAL ARTICLES */}
          <main className="blogs-articles-stream">
            <div className="stream-header-row">
              <span className="stream-header-label">
                SHOWING {filteredArticles.length} RESEARCH DOSSIERS
              </span>
              <span className="stream-header-hint">
                Hover to preview • Click to examine full article
              </span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="blogs-empty-state">
                <Shield size={32} />
                <h3>No articles match your search query</h3>
                <p>Try clearing filters or search for topics like "Cybercrime", "SEBI", or "Writs".</p>
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => {
                    setSelectedCategory("All Insights");
                    setSearchFilter("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="articles-list-container">
                {filteredArticles.map((article, index) => {
                  const isHovered = activeArticle.id === article.id;
                  const CatIcon = article.categoryIcon;
                  return (
                    <article
                      key={article.id}
                      className={`article-row-item ${isHovered ? "active" : ""}`}
                      onMouseEnter={() => setActiveArticleIndex(index)}
                      onClick={() => navigate(article.route)}
                    >
                      <div className="article-row-meta">
                        <div className="article-cat-chip">
                          <CatIcon size={13} />
                          <span>{article.category}</span>
                        </div>
                        <span className="article-date-chip">{article.date}</span>
                        <span className="article-time-chip">{article.readTime}</span>
                      </div>

                      <h2 className="article-row-title">{article.title}</h2>
                      <p className="article-row-excerpt">{article.excerpt}</p>

                      <div className="article-row-footer">
                        <div className="article-author-chip">
                          <span>By <strong>{article.author}</strong></span>
                          <span className="author-dot">•</span>
                          <span>{article.authorRole}</span>
                        </div>

                        <div className="article-open-action">
                          <span>Read Full Analysis</span>
                          <div className="article-arrow-circle">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Left accent indicator */}
                      <div className="article-left-indicator" />
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {/* Footer Chamber Banner */}
        <section className="blogs-bottom-banner">
          <div className="bottom-banner-content">
            <div className="bottom-banner-badge">
              <Sparkles size={14} />
              <span>ACADEMIC SCHOLARSHIP & LEGAL INQUIRIES</span>
            </div>
            <h3 className="bottom-banner-title">
              Require Bespoke Counsel on Emerging Regulations?
            </h3>
            <p className="bottom-banner-desc">
              Our partners routinely advise multinational corporations, financial institutions, and government 
              entities on complex statutory interpretation, dispute risks, and compliance architectures.
            </p>
            <button
              type="button"
              className="bottom-banner-btn"
              onClick={() => navigate("/#contact")}
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
