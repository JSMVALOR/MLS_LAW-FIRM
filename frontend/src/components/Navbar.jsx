import React, { useState, useEffect, useRef, useCallback } from "react";
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
  { name: "Civil & Constitutional Law", desc: "Writs, appellate advocacy & fundamental rights", icon: Scale, link: "/practice-areas" },
  { name: "Commercial Arbitration & Mediation", desc: "Domestic & international disputes (ICA)", icon: Shield, link: "/practice-areas" },
  { name: "Criminal Defense & Trial Advocacy", desc: "White-collar defense, statutory bail & PMLA", icon: Award, link: "/practice-areas" },
  { name: "Corporate Governance & M&A", desc: "Transactions, corporate structuring & due diligence", icon: Building2, link: "/practice-areas" },
  { name: "Real Estate & Infrastructure", desc: "RERA compliance, EPC contracts & title diligence", icon: Briefcase, link: "/practice-areas" },
  { name: "Taxation & Revenue Law", desc: "Direct taxes, GST appeals & statutory tribunals", icon: FileText, link: "/practice-areas" },
  { name: "Intellectual Property & Technology", desc: "Trademarks, IP litigation & digital commerce", icon: Compass, link: "/practice-areas" },
  { name: "Labour & Employment Advisory", desc: "Executive advisory, POSH & compliance", icon: Users, link: "/practice-areas" }
];

const SEARCH_DIRECTORY = [
  { title: "About the Firm", type: "Overview", link: "/about" },
  { title: "Civil & Constitutional Law", type: "Practice Area", link: "/practice-areas" },
  { title: "Commercial Arbitration & Mediation", type: "Practice Area", link: "/practice-areas" },
  { title: "Criminal Defense & White-Collar", type: "Practice Area", link: "/practice-areas" },
  { title: "Corporate Governance & M&A", type: "Practice Area", link: "/practice-areas" },
  { title: "Real Estate & Infrastructure", type: "Practice Area", link: "/practice-areas" },
  { title: "Intellectual Property & Technology", type: "Practice Area", link: "/practice-areas" },
  { title: "Taxation & Revenue Law", type: "Practice Area", link: "/practice-areas" },
  { title: "Labour & Employment Regulations", type: "Practice Area", link: "/practice-areas" },
  { title: "Client Testimonials", type: "Endorsements", link: "/testimonials" },
  { title: "Our People & Senior Partners", type: "Team", link: "/people" },
  { title: "Full Chambers Registry", type: "Team", link: "/team" },
  { title: "Chambers & Institutional Legacy", type: "Overview", link: "/legacy" },
  { title: "Academic Collaborations", type: "Academia", link: "/academic-collaborations" },
  { title: "Careers & Internships", type: "Careers", link: "/careers" },
  { title: "Legal Insights & Blogs", type: "Academics", link: "/blogs" },
  { title: "Research Publications", type: "Academics", link: "/publications" },
  { title: "Conferences & Symposia", type: "Events", link: "/events" },
  { title: "Chambers Consultation Intake", type: "Contact", link: "/contact" }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef(null);
  const navContainerRef = useRef(null);
  const dropdownCloseTimeout = useRef(null);
  const scrollTicking = useRef(false);

  const { isDarkTheme, toggleTheme } = useTheme();

  // rAF-throttled scroll state — no setState storm per scroll event.
  useEffect(() => {
    const onScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > 25;
          return prev === next ? prev : next;
        });
        scrollTicking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
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
      const t = setTimeout(() => searchInputRef.current.focus(), 80);
      return () => clearTimeout(t);
    }
    setSearchQuery("");
  }, [searchOpen]);

  // Lock body scroll when drawer / search is open.
  useEffect(() => {
    if (!(mobileMenuOpen || searchOpen)) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen, searchOpen]);

  const handleMouseEnter = useCallback((menu) => {
    if (dropdownCloseTimeout.current) clearTimeout(dropdownCloseTimeout.current);
    setOpenDropdown(menu);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownCloseTimeout.current = setTimeout(() => setOpenDropdown(null), 180);
  }, []);

  useEffect(() => () => {
    if (dropdownCloseTimeout.current) clearTimeout(dropdownCloseTimeout.current);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleSectionNavigation = useCallback((sectionId) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  }, [location.pathname, navigate]);

  const handleSearchResultClick = (link) => {
    setSearchOpen(false);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (link.startsWith("/#")) {
      handleSectionNavigation(link.replace("/#", ""));
    } else {
      navigate(link);
    }
  };

  const go = useCallback((link) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    navigate(link);
  }, [navigate]);

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
          height: var(--nav-height, 80px);
          position: sticky;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background-color 250ms var(--ease-out), box-shadow 250ms var(--ease-out), border-color 250ms var(--ease-out);
          display: flex;
          align-items: center;
          border-bottom: 1px solid transparent;
          padding-top: var(--sat);
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .mls-header.dark-theme {
          background: rgba(12, 14, 18, 0.86);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          color: #ECECF0;
          border-bottom-color: rgba(197, 160, 89, 0.16);
        }
        .mls-header.dark-theme.scrolled {
          background: rgba(10, 11, 15, 0.94);
          border-bottom-color: rgba(197, 160, 89, 0.24);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .mls-header.light-theme {
          background: rgba(250, 249, 245, 0.88);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          color: #171A21;
          border-bottom-color: rgba(197, 160, 89, 0.2);
        }
        .mls-header.light-theme.scrolled {
          background: rgba(255, 255, 255, 0.94);
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
          gap: 0.75rem;
        }
        .mls-brand {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          text-decoration: none;
          color: inherit;
          flex-shrink: 0;
          min-width: 0;
          cursor: pointer;
          padding: 0.25rem 0;
          background: none;
          border: none;
          font: inherit;
        }
        .mls-logo-frame {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform var(--dur-drop) var(--ease-out);
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
          min-width: 0;
        }
        .mls-brand-title {
          font-family: 'Cinzel', serif;
          font-size: 1.28rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          white-space: nowrap;
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
          letter-spacing: 0.2em;
          opacity: 0.75;
          text-transform: uppercase;
          margin-top: 3px;
          white-space: nowrap;
        }
        .mls-desktop-nav {
          display: none;
          align-items: center;
          gap: 1.75rem;
        }
        @media (min-width: 1100px) {
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
          letter-spacing: 0.02em;
          padding: 0.65rem 0.35rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          transition: color var(--dur-pop) var(--ease-out);
          font-family: inherit;
          white-space: nowrap;
        }
        .mls-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #C5A059;
          transition: width var(--dur-drop) var(--ease-out);
        }
        .mls-chevron {
          transition: transform var(--dur-drop) var(--ease-out), opacity var(--dur-pop) var(--ease-out);
          opacity: 0.7;
        }
        .mls-chevron.open {
          transform: rotate(180deg);
          opacity: 1;
        }
        /* Origin-aware dropdowns: scale from trigger, never from nothing */
        .mls-dropdown-panel {
          position: absolute;
          top: calc(100% + 0.6rem);
          z-index: 1200;
          border-radius: 10px;
          transform-origin: top center;
          animation: mlsDropIn var(--dur-drop) var(--ease-out);
        }
        @keyframes mlsDropIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
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
          width: min(720px, calc(100vw - 2rem));
          padding: 1.5rem;
        }
        @keyframes mlsDropInCentered {
          from { opacity: 0; transform: translateX(-50%) scale(0.95) translateY(-6px); }
          to { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
        }
        .mls-dropdown-practice {
          animation-name: mlsDropInCentered;
        }
        .mls-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 0.9rem;
          margin-bottom: 0.9rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
        }
        .mls-dropdown-header-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #C5A059;
          white-space: nowrap;
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
          transition: opacity var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
          font-family: inherit;
          white-space: nowrap;
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
          transition: background-color var(--dur-pop) var(--ease-out);
          min-width: 0;
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
          min-width: 0;
        }
        .mls-practice-name {
          font-size: 0.84rem;
          font-weight: 600;
          line-height: 1.25;
          transition: color var(--dur-pop) var(--ease-out);
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
          transform-origin: top left;
        }
        .mls-dropdown-link {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          color: inherit;
          transition: background-color var(--dur-pop) var(--ease-out);
          min-width: 0;
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
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .mls-action-btn {
          background: none;
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: inherit;
          cursor: pointer;
          border-radius: 6px;
          padding: 0.5rem 0.65rem;
          min-width: 40px;
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          transition: transform var(--dur-press) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
        }
        .mls-action-btn:active {
          transform: scale(0.93);
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
          min-height: 40px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out), box-shadow 200ms var(--ease-out);
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.22);
          font-family: inherit;
          white-space: nowrap;
        }
        .mls-cta-button:active {
          transform: scale(0.97);
        }
        .mls-cta-arrow {
          transition: transform var(--dur-pop) var(--ease-out);
        }
        @media (max-width: 1099px) {
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
          min-width: 40px;
          min-height: 40px;
          color: inherit;
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), border-color var(--dur-pop) var(--ease-out);
        }
        .mls-mobile-toggle-btn:active {
          transform: scale(0.93);
        }
        @media (min-width: 1100px) {
          .mls-mobile-toggle-btn { display: none; }
        }
        /* Hover gated to fine pointers — touch gets :active instead */
        @media (hover: hover) and (pointer: fine) {
          .mls-brand:hover .mls-logo-frame { transform: scale(1.05); }
          .mls-nav-link:hover::after, .mls-nav-link.active::after { width: 100%; }
          .mls-header.dark-theme .mls-nav-link:hover, .mls-header.dark-theme .mls-nav-link.active { color: #C5A059; }
          .mls-header.light-theme .mls-nav-link:hover, .mls-header.light-theme .mls-nav-link.active { color: #8C661D; }
          .mls-dropdown-view-all:hover { opacity: 1; color: #C5A059; }
          .mls-header.dark-theme .mls-practice-item:hover { background: rgba(197, 160, 89, 0.1); }
          .mls-header.light-theme .mls-practice-item:hover { background: rgba(197, 160, 89, 0.08); }
          .mls-header.dark-theme .mls-practice-item:hover .mls-practice-name { color: #E2C889; }
          .mls-header.light-theme .mls-practice-item:hover .mls-practice-name { color: #8C661D; }
          .mls-header.dark-theme .mls-dropdown-link:hover { background: rgba(197, 160, 89, 0.12); }
          .mls-header.light-theme .mls-dropdown-link:hover { background: rgba(197, 160, 89, 0.08); }
          .mls-action-btn:hover { border-color: #C5A059; color: #C5A059; }
          .mls-cta-button:hover { background: #D4AF37; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(197, 160, 89, 0.32); }
          .mls-cta-button:hover .mls-cta-arrow { transform: translateX(3px); }
          .mls-header.dark-theme .mls-mobile-nav-item:hover { background: rgba(197, 160, 89, 0.12); color: #C5A059; }
          .mls-header.light-theme .mls-mobile-nav-item:hover { background: rgba(197, 160, 89, 0.1); color: #8C661D; }
          .mls-mobile-subitem:hover { opacity: 1; color: #C5A059; }
          .mls-search-close-btn:hover { opacity: 1; color: #C5A059; }
          .mls-header.dark-theme .mls-search-item:hover { background: rgba(197, 160, 89, 0.1); }
          .mls-header.light-theme .mls-search-item:hover { background: rgba(197, 160, 89, 0.08); }
          .mls-search-item:hover .mls-search-item-arrow { opacity: 1; transform: translateX(0); }
        }
        .mls-mobile-drawer {
          position: fixed;
          top: var(--nav-height, 64px);
          left: 0; right: 0; bottom: 0;
          z-index: 1500;
          border-top: 1px solid rgba(197, 160, 89, 0.18);
          padding: 1rem 1rem calc(1.5rem + var(--sab));
          padding-left: max(1rem, var(--sal));
          padding-right: max(1rem, var(--sar));
          animation: mlsDrawerIn var(--dur-modal) var(--ease-drawer);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        @keyframes mlsDrawerIn {
          from { opacity: 0.4; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 769px) {
          .mls-mobile-drawer {
            position: absolute;
            top: 100%;
            bottom: auto;
            max-height: calc(100vh - 80px);
            max-height: calc(100svh - 80px);
            padding: 1.25rem 1.5rem 2rem;
          }
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
          min-height: 48px;
          border-radius: 8px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: inherit;
          font-size: 0.84rem;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          width: 100%;
          overflow: hidden;
        }
        .mls-mobile-search-bar span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
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
          padding: 0.9rem 0.95rem;
          min-height: 48px;
          background: none;
          border: none;
          color: inherit;
          font-size: 0.94rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          transition: background-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
          width: 100%;
          font-family: inherit;
          min-width: 0;
        }
        .mls-mobile-nav-item span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        .mls-mobile-nav-item svg {
          flex-shrink: 0;
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
          letter-spacing: 0.06em;
          color: #C5A059;
          margin-bottom: 0.25rem;
        }
        .mls-mobile-subitem {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0;
          min-height: 44px;
          font-size: 0.86rem;
          color: inherit;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
          min-width: 0;
        }
        .mls-mobile-subitem svg {
          flex-shrink: 0;
        }
        .mls-mobile-footer-action {
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(197, 160, 89, 0.15);
          padding-bottom: var(--sab);
        }
        .mls-mobile-cta {
          width: 100%;
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.9rem 1.25rem;
          background: #C5A059;
          color: #0E1015;
          border: none;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-pop) var(--ease-out);
        }
        .mls-mobile-cta:active {
          transform: scale(0.98);
        }
        .mls-mobile-backdrop {
          position: fixed;
          inset: 0;
          top: var(--nav-height, 64px);
          background: rgba(0,0,0,0.45);
          z-index: 1400;
          animation: mlsFade 200ms var(--ease-out);
        }
        @keyframes mlsFade {
          from { opacity: 0; }
          to { opacity: 1; }
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
          padding-top: 8vh;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-bottom: max(1rem, var(--sab));
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          animation: mlsFade 180ms var(--ease-out);
        }
        .mls-search-modal {
          width: 100%;
          max-width: 620px;
          max-height: 85vh;
          max-height: 85dvh;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          transform-origin: top center;
          animation: mlsModalIn var(--dur-drop) var(--ease-out);
        }
        @keyframes mlsModalIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
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
          min-width: 0;
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
          padding: 0.5rem;
          min-width: 40px;
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out), transform var(--dur-press) var(--ease-out);
        }
        .mls-search-close-btn:active {
          transform: scale(0.9);
        }
        .mls-search-results-pane {
          padding: 0.75rem 1rem 1.25rem;
          max-height: 380px;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .mls-search-pane-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
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
          white-space: nowrap;
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
          gap: 0.75rem;
          padding: 0.75rem 0.85rem;
          min-height: 52px;
          border-radius: 8px;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          text-align: left;
          transition: background-color var(--dur-pop) var(--ease-out);
          font-family: inherit;
          min-width: 0;
        }
        .mls-search-item-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 0;
          flex: 1;
        }
        .mls-search-item-title {
          font-size: 0.88rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
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
          white-space: nowrap;
          flex-shrink: 0;
        }
        .mls-search-item-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity var(--dur-pop) var(--ease-out), transform var(--dur-pop) var(--ease-out);
          color: #C5A059;
          flex-shrink: 0;
        }
        .mls-search-empty {
          padding: 2rem 1rem;
          text-align: center;
          font-size: 0.86rem;
          opacity: 0.65;
          overflow-wrap: anywhere;
        }
        @media (max-width: 1100px) {
          .mls-header-container { padding: 0 1rem; padding-left: max(1rem, var(--sal)); padding-right: max(1rem, var(--sar)); }
          .mls-brand-title { font-size: 1.05rem; }
          .mls-brand-sub { font-size: 0.56rem; letter-spacing: 0.16em; }
          .mls-logo-frame { width: 36px; height: 36px; }
        }
        @media (max-width: 380px) {
          .mls-brand-sub { display: none; }
          .mls-brand-title { font-size: 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mls-dropdown-panel, .mls-mobile-drawer, .mls-search-backdrop, .mls-search-modal {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <header
        className={`mls-header ${isDarkTheme ? "dark-theme" : "light-theme"} ${scrolled ? "scrolled" : ""}`}
        ref={navContainerRef}
      >
        <div className="mls-header-container">
          <Link to="/" className="mls-brand" onClick={() => setMobileMenuOpen(false)} aria-label="MLS & Co. home">
            <div className="mls-logo-frame">
              <img src="/mls_logo_clean.svg" alt="MLS & Co. Advocates & Solicitors" className="mls-logo-img" />
            </div>
            <div className="mls-brand-text">
              <span className="mls-brand-title">MLS & Co.</span>
              <span className="mls-brand-sub">ADVOCATES & SOLICITORS</span>
            </div>
          </Link>

          <nav className="mls-desktop-nav" aria-label="Main Navigation">
            <Link to="/about" className="mls-nav-link">About</Link>

            <div
              className="mls-nav-item"
              onMouseEnter={() => handleMouseEnter("practice")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`mls-nav-link ${openDropdown === "practice" ? "active" : ""}`}
                onClick={() => go("/practice-areas")}
                onFocus={() => handleMouseEnter("practice")}
                aria-expanded={openDropdown === "practice"}
                aria-haspopup="true"
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
                  <div className="mls-dropdown-header">
                    <span className="mls-dropdown-header-title">Core Legal Disciplines</span>
                    <button type="button" className="mls-dropdown-view-all" onClick={() => go("/practice-areas")}>
                      Explore All Practices <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="mls-practice-grid">
                    {PRACTICE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="mls-practice-item"
                          onClick={() => go(item.link)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(item.link); } }}
                        >
                          <div className="mls-practice-icon-box"><Icon size={16} /></div>
                          <div className="mls-practice-text">
                            <span className="mls-practice-name">{item.name}</span>
                            <span className="mls-practice-desc">{item.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link to="/legacy" className="mls-nav-link">Legacy</Link>
            <Link to="/people" className="mls-nav-link">Our People</Link>

            <div
              className="mls-nav-item"
              onMouseEnter={() => handleMouseEnter("insights")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`mls-nav-link ${openDropdown === "insights" ? "active" : ""}`}
                onClick={() => toggleDropdown("insights")}
                aria-expanded={openDropdown === "insights"}
                aria-haspopup="true"
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
                  <Link to="/blogs" className="mls-dropdown-link" onClick={() => setOpenDropdown(null)}>
                    <BookOpen size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Legal Insights & Articles</span>
                      <span className="mls-dropdown-link-sub">Expert commentary & judicial analysis</span>
                    </div>
                  </Link>
                  <Link to="/publications" className="mls-dropdown-link" onClick={() => setOpenDropdown(null)}>
                    <FileText size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Publications & Research</span>
                      <span className="mls-dropdown-link-sub">Scholarly papers & law briefs</span>
                    </div>
                  </Link>
                  <Link to="/events" className="mls-dropdown-link" onClick={() => setOpenDropdown(null)}>
                    <Calendar size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Conferences & Symposia</span>
                      <span className="mls-dropdown-link-sub">Chambers lectures & roundtables</span>
                    </div>
                  </Link>
                  <Link to="/academic-collaborations" className="mls-dropdown-link" onClick={() => setOpenDropdown(null)}>
                    <Users size={16} className="mls-dropdown-link-icon" />
                    <div>
                      <span className="mls-dropdown-link-title">Academic Collaborations</span>
                      <span className="mls-dropdown-link-sub">MOU programmes & clerkships</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/careers" className="mls-nav-link">Careers</Link>
          </nav>

          <div className="mls-actions">
            <button
              type="button"
              className="mls-action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search directory"
              title="Search Directory (Ctrl/⌘K)"
            >
              <Search size={15} />
              <span className="mls-search-shortcut">Ctrl K</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="mls-action-btn"
              aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button type="button" className="mls-cta-button" onClick={() => go("/contact")}>
              <span>Consult Chambers</span>
              <ArrowRight size={13} className="mls-cta-arrow" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="mls-mobile-toggle-btn"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div className="mls-mobile-backdrop" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
            <div className="mls-mobile-drawer" role="dialog" aria-label="Mobile navigation">
              <div className="mls-mobile-drawer-inner">
                <button
                  type="button"
                  className="mls-mobile-search-bar"
                  onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                >
                  <Search size={16} style={{ flexShrink: 0 }} />
                  <span>Search practices, lawyers, publications...</span>
                </button>

                <div className="mls-mobile-nav-list">
                  <Link to="/about" className="mls-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Compass size={18} /><span>About the Firm</span>
                  </Link>
                  <Link to="/practice-areas" className="mls-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Scale size={18} /><span>Practice Areas</span>
                  </Link>
                  <Link to="/legacy" className="mls-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Compass size={18} /><span>Chambers Legacy</span>
                  </Link>
                  <Link to="/people" className="mls-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Users size={18} /><span>Our People & Partners</span>
                  </Link>
                  <Link to="/testimonials" className="mls-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Shield size={18} /><span>Client Testimonials</span>
                  </Link>

                  <div className="mls-mobile-subgroup">
                    <span className="mls-mobile-subgroup-title">RESEARCH & INSIGHTS</span>
                    <Link to="/blogs" className="mls-mobile-subitem" onClick={() => setMobileMenuOpen(false)}>
                      <BookOpen size={15} /><span>Blogs & Legal Insights</span>
                    </Link>
                    <Link to="/publications" className="mls-mobile-subitem" onClick={() => setMobileMenuOpen(false)}>
                      <FileText size={15} /><span>Publications & Briefs</span>
                    </Link>
                    <Link to="/events" className="mls-mobile-subitem" onClick={() => setMobileMenuOpen(false)}>
                      <Calendar size={15} /><span>Conferences & Events</span>
                    </Link>
                    <Link to="/academic-collaborations" className="mls-mobile-subitem" onClick={() => setMobileMenuOpen(false)}>
                      <Users size={15} /><span>Academic Collaborations</span>
                    </Link>
                  </div>

                  <Link to="/careers" className="mls-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Briefcase size={18} /><span>Careers & Clerkships</span>
                  </Link>
                </div>

                <div className="mls-mobile-footer-action">
                  <button type="button" className="mls-mobile-cta" onClick={() => go("/contact")}>
                    <span>Chambers Consultation</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {searchOpen && (
        <div className="mls-search-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="mls-search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Site search">
            <div className="mls-search-input-box">
              <Search size={18} className="mls-search-modal-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="mls-search-input"
                placeholder="Search practice areas, partners, insights, or careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                enterKeyHint="search"
                autoComplete="off"
                aria-label="Search the site directory"
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
                  No directory records matched &quot;{searchQuery}&quot;. Try &quot;Arbitration&quot;, &quot;Events&quot; or &quot;People&quot;.
                </div>
              ) : (
                <div className="mls-search-list">
                  {filteredResults.map((item) => (
                    <button
                      key={item.title}
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
