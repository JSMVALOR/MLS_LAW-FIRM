import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ArrowRight,
  Scale,
  Briefcase,
  Shield,
  BookOpen,
  FileText,
  Calendar,
  Users,
  Compass,
  Building2,
  Award
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useTheme } from "./ThemeContext";

const PRACTICE_ITEMS = [
  { name: "Civil & Constitutional Law", desc: "Writs, appellate advocacy & fundamental rights", icon: Scale },
  { name: "Commercial Arbitration & Mediation", desc: "Domestic & international disputes (ICA)", icon: Shield },
  { name: "Criminal Defense & Trial Advocacy", desc: "White-collar defense, statutory bail & PMLA", icon: Award },
  { name: "Corporate Governance & M&A", desc: "Transactions, corporate structuring & due diligence", icon: Building2 },
  { name: "Real Estate & Infrastructure", desc: "RERA compliance, EPC contracts & title diligence", icon: Briefcase },
  { name: "Taxation & Revenue Law", desc: "Direct taxes, GST appeals & statutory tribunals", icon: FileText },
  { name: "Intellectual Property & Technology", desc: "Trademarks, IP litigation & digital commerce", icon: Compass },
  { name: "Labour & Employment Advisory", desc: "Executive advisory, POSH & compliance", icon: Users }
];

const SEARCH_DIRECTORY = [
  { title: "Civil & Constitutional Law", type: "Practice Area", link: "/#practice" },
  { title: "Commercial Arbitration & Mediation", type: "Practice Area", link: "/#practice" },
  { title: "Criminal Defense & White-Collar", type: "Practice Area", link: "/#practice" },
  { title: "Corporate Governance & M&A", type: "Practice Area", link: "/#practice" },
  { title: "Real Estate & Infrastructure", type: "Practice Area", link: "/#practice" },
  { title: "Intellectual Property & Technology", type: "Practice Area", link: "/#practice" },
  { title: "Taxation & Revenue Law", type: "Practice Area", link: "/#practice" },
  { title: "Labour & Employment Regulations", type: "Practice Area", link: "/#practice" },
  { title: "Our People & Senior Partners", type: "Team", link: "/#people" },
  { title: "Chambers & Institutional Legacy", type: "Overview", link: "/legacy" },
  { title: "Careers & Internships", type: "Careers", link: "/careers" },
  { title: "Legal Insights & Blogs", type: "Academics", link: "/blogs" },
  { title: "Research Publications", type: "Academics", link: "/publications" },
  { title: "Conferences & Symposia", type: "Events", link: "/events" },
  { title: "Chambers Consultation Intake", type: "Contact", link: "/#contact" }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'practice' | 'insights' | null
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef(null);
  const navContainerRef = useRef(null);
  const dropdownCloseTimeout = useRef(null);

  const { isDarkTheme, toggleTheme } = useTheme();

  // Scroll detection for sticky elevated bar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global click outside listener to reliably close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K / Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when search modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 80);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Safe Dropdown hover handlers with slight grace period to prevent flickering
  const handleMouseEnter = (menu) => {
    if (dropdownCloseTimeout.current) {
      clearTimeout(dropdownCloseTimeout.current);
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownCloseTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  // Navigate to sections smoothly
  const handleSectionNavigation = (sectionId) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleSearchResultClick = (link) => {
    setSearchOpen(false);
    if (link.startsWith("/#")) {
      handleSectionNavigation(link.replace("/#", ""));
    } else {
      navigate(link);
    }
  };

  const filteredResults = searchQuery.trim() === ""
    ? SEARCH_DIRECTORY.slice(0, 6)
    : SEARCH_DIRECTORY.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <header
        className={`mls-header ${isDarkTheme ? "dark-theme" : "light-theme"} ${
          scrolled ? "scrolled" : ""
        }`}
        ref={navContainerRef}
      >
        <div className="mls-header-container">
          {/* Brand Identity (Left) */}
          <Link to="/" className="mls-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="mls-logo-frame">
              <img
                src="/mls_logo_clean.svg"
                alt="MLS & Co. Advocates & Solicitors"
                className="mls-logo-img"
              />
            </div>
            <div className="mls-brand-text">
              <span className="mls-brand-title">MLS & Co.</span>
              <span className="mls-brand-sub">ADVOCATES & SOLICITORS</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="mls-desktop-nav" aria-label="Main Navigation">
            {/* Practice Areas Menu */}
            <div
              className="mls-nav-item mls-has-dropdown"
              onMouseEnter={() => handleMouseEnter("practice")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`mls-nav-link ${openDropdown === "practice" ? "active" : ""}`}
                onClick={() => toggleDropdown("practice")}
                aria-expanded={openDropdown === "practice"}
              >
                <span>Practice Areas</span>
                <ChevronDown size={14} className={`mls-chevron ${openDropdown === "practice" ? "open" : ""}`} />
              </button>

              {/* Clean Practice Areas Dropdown Menu */}
              {openDropdown === "practice" && (
                <div
                  className="mls-dropdown-panel mls-dropdown-practice"
                  onMouseEnter={() => handleMouseEnter("practice")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="mls-dropdown-practice-inner">
                    <div className="mls-dropdown-header">
                      <span className="mls-dropdown-header-title">Core Legal Disciplines</span>
                      <button
                        type="button"
                        className="mls-dropdown-view-all"
                        onClick={() => handleSectionNavigation("practice")}
                      >
                        Explore All Practices <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="mls-practice-grid">
                      {PRACTICE_ITEMS.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={idx}
                            className="mls-practice-item"
                            onClick={() => handleSectionNavigation("practice")}
                            role="button"
                            tabIndex={0}
                          >
                            <div className="mls-practice-icon-box">
                              <Icon size={16} />
                            </div>
                            <div className="mls-practice-text">
                              <span className="mls-practice-name">{item.name}</span>
                              <span className="mls-practice-desc">{item.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Legacy Link */}
            <Link to="/legacy" className="mls-nav-link">
              Legacy
            </Link>

            {/* Our People Link */}
            <button
              type="button"
              className="mls-nav-link"
              onClick={() => handleSectionNavigation("people")}
            >
              Our People
            </button>

            {/* Insights & Academics Menu */}
            <div
              className="mls-nav-item mls-has-dropdown"
              onMouseEnter={() => handleMouseEnter("insights")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`mls-nav-link ${openDropdown === "insights" ? "active" : ""}`}
                onClick={() => toggleDropdown("insights")}
                aria-expanded={openDropdown === "insights"}
              >
                <span>Insights</span>
                <ChevronDown size={14} className={`mls-chevron ${openDropdown === "insights" ? "open" : ""}`} />
              </button>

              {openDropdown === "insights" && (
                <div
                  className="mls-dropdown-panel mls-dropdown-simple"
                  onMouseEnter={() => handleMouseEnter("insights")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/blogs"
                    className="mls-dropdown-link"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <BookOpen size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Legal Insights & Articles</span>
                      <span className="mls-dropdown-link-sub">Expert commentary & judicial analysis</span>
                    </div>
                  </Link>

                  <Link
                    to="/publications"
                    className="mls-dropdown-link"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <FileText size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Publications & Research</span>
                      <span className="mls-dropdown-link-sub">Scholarly papers & law briefs</span>
                    </div>
                  </Link>

                  <Link
                    to="/events"
                    className="mls-dropdown-link"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <Calendar size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Conferences & Symposia</span>
                      <span className="mls-dropdown-link-sub">Chambers lectures & roundtables</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Careers Link */}
            <Link to="/careers" className="mls-nav-link">
              Careers
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="mls-actions">
            {/* Search Trigger */}
            <button
              type="button"
              className="mls-action-btn mls-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search directory"
              title="Search Directory (⌘K)"
            >
              <Search size={15} />
              <span className="mls-search-shortcut">⌘K</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="mls-action-btn mls-theme-btn"
              aria-label="Toggle theme mode"
              title={isDarkTheme ? "Switch to Ivory Light Theme" : "Switch to Obsidian Dark Theme"}
            >
              {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Chambers Consultation Intake CTA */}
            <button
              type="button"
              className="mls-cta-button"
              onClick={() => handleSectionNavigation("contact")}
            >
              <span>Consult Chambers</span>
              <ArrowRight size={13} className="mls-cta-arrow" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mls-mobile-toggle-btn"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mls-mobile-drawer">
            <div className="mls-mobile-drawer-inner">
              {/* Quick Search in Drawer */}
              <button
                type="button"
                className="mls-mobile-search-bar"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search size={16} />
                <span>Search practices, lawyers, publications...</span>
              </button>

              <div className="mls-mobile-nav-list">
                <button
                  type="button"
                  className="mls-mobile-nav-item"
                  onClick={() => handleSectionNavigation("practice")}
                >
                  <Scale size={18} />
                  <span>Practice Areas</span>
                </button>

                <Link
                  to="/legacy"
                  className="mls-mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Compass size={18} />
                  <span>Chambers Legacy</span>
                </Link>

                <button
                  type="button"
                  className="mls-mobile-nav-item"
                  onClick={() => handleSectionNavigation("people")}
                >
                  <Users size={18} />
                  <span>Our People & Partners</span>
                </button>

                {/* Mobile Insights Submenu */}
                <div className="mls-mobile-subgroup">
                  <span className="mls-mobile-subgroup-title">RESEARCH & INSIGHTS</span>
                  <Link
                    to="/blogs"
                    className="mls-mobile-subitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen size={15} />
                    <span>Blogs & Legal Insights</span>
                  </Link>
                  <Link
                    to="/publications"
                    className="mls-mobile-subitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText size={15} />
                    <span>Publications & Briefs</span>
                  </Link>
                  <Link
                    to="/events"
                    className="mls-mobile-subitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar size={15} />
                    <span>Conferences & Events</span>
                  </Link>
                </div>

                <Link
                  to="/careers"
                  className="mls-mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Briefcase size={18} />
                  <span>Careers & Clerkships</span>
                </Link>
              </div>

              {/* Consultation CTA in Mobile Drawer */}
              <div className="mls-mobile-footer-action">
                <button
                  type="button"
                  className="mls-mobile-cta"
                  onClick={() => handleSectionNavigation("contact")}
                >
                  <span>Chambers Consultation</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette / Search Modal */}
      {searchOpen && (
        <div
          className="mls-search-backdrop"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="mls-search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mls-search-input-box">
              <Search size={18} className="mls-search-modal-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="mls-search-input"
                placeholder="Search practice areas, partners, insights, or careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="mls-search-close-btn"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mls-search-results-pane">
              <div className="mls-search-pane-header">
                <span>Directory Results</span>
                <span className="mls-search-hint">Press ESC to dismiss</span>
              </div>

              {filteredResults.length === 0 ? (
                <div className="mls-search-empty">
                  No directory records matched &quot;{searchQuery}&quot;. Try searching &quot;Litigation&quot;, &quot;Arbitration&quot;, or &quot;People&quot;.
                </div>
              ) : (
                <div className="mls-search-list">
                  {filteredResults.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="mls-search-item"
                      onClick={() => handleSearchResultClick(item.link)}
                    >
                      <div className="mls-search-item-info">
                        <span className="mls-search-item-title">{item.title}</span>
                        <span className="mls-search-item-badge">{item.type}</span>
                      </div>
                      <ArrowRight size={14} className="mls-search-item-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
