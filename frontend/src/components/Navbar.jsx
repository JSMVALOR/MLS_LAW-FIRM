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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 80);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  const handleMouseEnter = (menu) => {
    if (dropdownCloseTimeout.current) clearTimeout(dropdownCloseTimeout.current);
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

  const handleSectionNavigation = (sectionId) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      const snapContainer = document.querySelector(".home-snap-container");
      const element = document.getElementById(sectionId);
      if (snapContainer && element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (element) {
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
      <style>{`
        .mls-header {
          height: 80px;
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          border-bottom: 1px solid transparent;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .mls-header.dark-theme {
          background: rgba(12, 14, 18, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #ECECF0;
          border-bottom-color: rgba(197, 160, 89, 0.16);
        }
        .mls-header.dark-theme.scrolled {
          background: rgba(10, 11, 15, 0.98);
          border-bottom-color: rgba(197, 160, 89, 0.24);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .mls-header.light-theme {
          background: rgba(250, 249, 245, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #171A21;
          border-bottom-color: rgba(197, 160, 89, 0.2);
        }
        .mls-header.light-theme.scrolled {
          background: rgba(255, 255, 255, 0.98);
          border-bottom-color: rgba(197, 160, 89, 0.28);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
        }
        .mls-header-container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mls-brand {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          text-decoration: none;
          color: inherit;
          flex-shrink: 0;
          cursor: pointer;
          padding: 0.25rem 0;
        }
        .mls-logo-frame {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .mls-brand:hover .mls-logo-frame {
          transform: scale(1.05);
        }
        .mls-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .mls-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .mls-brand-title {
          font-family: 'Cinzel', serif;
          font-size: 1.28rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #C5A059;
        }
        .mls-header.dark-theme .mls-brand-title {
          background: linear-gradient(135deg, #F2E3C6 0%, #C5A059 60%, #9E7B38 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .mls-header.light-theme .mls-brand-title {
          background: linear-gradient(135deg, #A47B2E 0%, #87621B 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .mls-brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          opacity: 0.75;
          text-transform: uppercase;
          margin-top: 3px;
        }
        .mls-desktop-nav {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .mls-desktop-nav { display: flex; }
        }
        .mls-nav-item {
          position: relative;
          display: flex;
          align-items: center;
        }
        .mls-nav-link {
          background: none;
          border: none;
          color: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 0.65rem 0.35rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          transition: color 0.2s ease;
          font-family: inherit;
        }
        .mls-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #C5A059;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mls-nav-link:hover::after,
        .mls-nav-link.active::after {
          width: 100%;
        }
        .mls-header.dark-theme .mls-nav-link:hover,
        .mls-header.dark-theme .mls-nav-link.active {
          color: #C5A059;
        }
        .mls-header.light-theme .mls-nav-link:hover,
        .mls-header.light-theme .mls-nav-link.active {
          color: #8C661D;
        }
        .mls-chevron {
          transition: transform 0.25s ease;
          opacity: 0.7;
        }
        .mls-chevron.open {
          transform: rotate(180deg);
          opacity: 1;
        }
        .mls-dropdown-panel {
          position: absolute;
          top: calc(100% + 0.6rem);
          z-index: 1200;
          border-radius: 10px;
          animation: mlsFadeSlideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes mlsFadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mls-header.dark-theme .mls-dropdown-panel {
          background: #111319;
          border: 1px solid rgba(197, 160, 89, 0.22);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
        }
        .mls-header.light-theme .mls-dropdown-panel {
          background: #FFFFFF;
          border: 1px solid rgba(197, 160, 89, 0.25);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        }
        .mls-dropdown-practice {
          left: 50%;
          transform: translateX(-50%);
          width: 720px;
          padding: 1.5rem;
        }
        .mls-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.9rem;
          margin-bottom: 0.9rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
        }
        .mls-dropdown-header-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C5A059;
        }
        .mls-dropdown-view-all {
          background: none;
          border: none;
          color: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          opacity: 0.75;
          transition: opacity 0.2s, color 0.2s;
        }
        .mls-dropdown-view-all:hover {
          opacity: 1;
          color: #C5A059;
        }
        .mls-practice-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem 1.25rem;
        }
        .mls-practice-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mls-header.dark-theme .mls-practice-item:hover {
          background: rgba(197, 160, 89, 0.1);
        }
        .mls-header.light-theme .mls-practice-item:hover {
          background: rgba(197, 160, 89, 0.08);
        }
        .mls-practice-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(197, 160, 89, 0.1);
          color: #C5A059;
        }
        .mls-practice-text {
          display: flex;
          flex-direction: column;
        }
        .mls-practice-name {
          font-size: 0.84rem;
          font-weight: 600;
          line-height: 1.25;
        }
        .mls-header.dark-theme .mls-practice-item:hover .mls-practice-name {
          color: #E2C889;
        }
        .mls-header.light-theme .mls-practice-item:hover .mls-practice-name {
          color: #8C661D;
        }
        .mls-practice-desc {
          font-size: 0.72rem;
          opacity: 0.65;
          line-height: 1.35;
          margin-top: 2px;
        }
        .mls-dropdown-simple {
          left: 0;
          width: 290px;
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .mls-dropdown-link {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }
        .mls-header.dark-theme .mls-dropdown-link:hover {
          background: rgba(197, 160, 89, 0.12);
        }
        .mls-header.light-theme .mls-dropdown-link:hover {
          background: rgba(197, 160, 89, 0.08);
        }
        .mls-dropdown-link-icon {
          margin-top: 2px;
          color: #C5A059;
          flex-shrink: 0;
        }
        .mls-dropdown-link-title {
          display: block;
          font-size: 0.84rem;
          font-weight: 600;
        }
        .mls-dropdown-link-sub {
          display: block;
          font-size: 0.71rem;
          opacity: 0.65;
          margin-top: 1px;
        }
        .mls-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mls-action-btn {
          background: none;
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: inherit;
          cursor: pointer;
          border-radius: 6px;
          padding: 0.5rem 0.65rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          transition: all 0.2s ease;
        }
        .mls-action-btn:hover {
          border-color: #C5A059;
          color: #C5A059;
        }
        .mls-search-shortcut {
          font-size: 0.7rem;
          font-weight: 700;
          opacity: 0.65;
        }
        @media (max-width: 900px) {
          .mls-search-shortcut { display: none; }
        }
        .mls-cta-button {
          background: #C5A059;
          color: #0E1015;
          border: none;
          border-radius: 6px;
          padding: 0.58rem 1.15rem;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.22);
        }
        .mls-cta-button:hover {
          background: #D4AF37;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(197, 160, 89, 0.32);
        }
        .mls-cta-arrow {
          transition: transform 0.2s ease;
        }
        .mls-cta-button:hover .mls-cta-arrow {
          transform: translateX(3px);
        }
        @media (max-width: 1023px) {
          .mls-cta-button { display: none; }
        }
        .mls-mobile-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid rgba(197, 160, 89, 0.25);
          border-radius: 6px;
          padding: 0.48rem;
          color: inherit;
          cursor: pointer;
        }
        @media (min-width: 1024px) {
          .mls-mobile-toggle-btn { display: none; }
        }
        .mls-mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 1500;
          border-top: 1px solid rgba(197, 160, 89, 0.18);
          padding: 1.25rem 1.5rem 2rem;
          animation: mlsFadeSlideDown 0.25s ease;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }
        .mls-header.dark-theme .mls-mobile-drawer {
          background: #0D0F14;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
        }
        .mls-header.light-theme .mls-mobile-drawer {
          background: #FAF9F5;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1);
        }
        .mls-mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .mls-mobile-search-bar {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: inherit;
          font-size: 0.84rem;
          cursor: pointer;
          text-align: left;
        }
        .mls-mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .mls-mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 0.95rem;
          background: none;
          border: none;
          color: inherit;
          font-size: 0.94rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }
        .mls-header.dark-theme .mls-mobile-nav-item:hover {
          background: rgba(197, 160, 89, 0.12);
          color: #C5A059;
        }
        .mls-header.light-theme .mls-mobile-nav-item:hover {
          background: rgba(197, 160, 89, 0.1);
          color: #8C661D;
        }
        .mls-mobile-subgroup {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.5rem 0.95rem;
          border-left: 2px solid rgba(197, 160, 89, 0.3);
          margin-left: 0.65rem;
        }
        .mls-mobile-subgroup-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #C5A059;
          margin-bottom: 0.25rem;
        }
        .mls-mobile-subitem {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0;
          font-size: 0.86rem;
          color: inherit;
          text-decoration: none;
          opacity: 0.85;
        }
        .mls-mobile-subitem:hover {
          opacity: 1;
          color: #C5A059;
        }
        .mls-mobile-footer-action {
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(197, 160, 89, 0.15);
        }
        .mls-mobile-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: #C5A059;
          color: #0E1015;
          border: none;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .mls-search-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 9, 12, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 12vh;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .mls-search-modal {
          width: 100%;
          max-width: 620px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          animation: mlsFadeSlideDown 0.2s ease;
        }
        .mls-header.dark-theme .mls-search-modal {
          background: #12141B;
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: #ECECF0;
        }
        .mls-header.light-theme .mls-search-modal {
          background: #FFFFFF;
          border: 1px solid rgba(197, 160, 89, 0.32);
          color: #171A21;
        }
        .mls-search-input-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1.15rem 1.35rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.16);
        }
        .mls-search-modal-icon {
          color: #C5A059;
          flex-shrink: 0;
        }
        .mls-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: 1rem;
          color: inherit;
          font-family: inherit;
        }
        .mls-search-close-btn {
          background: none;
          border: none;
          color: inherit;
          opacity: 0.6;
          cursor: pointer;
          padding: 0.25rem;
        }
        .mls-search-close-btn:hover {
          opacity: 1;
          color: #C5A059;
        }
        .mls-search-results-pane {
          padding: 0.75rem 1rem 1.25rem;
          max-height: 380px;
          overflow-y: auto;
        }
        .mls-search-pane-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4rem 0.5rem 0.6rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #C5A059;
        }
        .mls-search-hint {
          font-size: 0.68rem;
          opacity: 0.6;
          font-weight: 500;
          text-transform: none;
        }
        .mls-search-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .mls-search-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.85rem;
          border-radius: 8px;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }
        .mls-header.dark-theme .mls-search-item:hover {
          background: rgba(197, 160, 89, 0.1);
        }
        .mls-header.light-theme .mls-search-item:hover {
          background: rgba(197, 160, 89, 0.08);
        }
        .mls-search-item-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .mls-search-item-title {
          font-size: 0.88rem;
          font-weight: 600;
        }
        .mls-search-item-badge {
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.18rem 0.5rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.12);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.22);
        }
        .mls-search-item-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
          color: #C5A059;
        }
        .mls-search-item:hover .mls-search-item-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .mls-search-empty {
          padding: 2rem 1rem;
          text-align: center;
          font-size: 0.86rem;
          opacity: 0.65;
        }
      `}</style>

      <header
        className={`mls-header ${isDarkTheme ? "dark-theme" : "light-theme"} ${
          scrolled ? "scrolled" : ""
        }`}
        ref={navContainerRef}
      >
        <div className="mls-header-container">
          {/* Brand Identity */}
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

            <button
              type="button"
              onClick={toggleTheme}
              className="mls-action-btn mls-theme-btn"
              aria-label="Toggle theme mode"
              title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              type="button"
              className="mls-cta-button"
              onClick={() => handleSectionNavigation("contact")}
            >
              <span>Consult Chambers</span>
              <ArrowRight size={13} className="mls-cta-arrow" />
            </button>

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
