import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import PracticeAreas from "./components/PracticeAreas.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Ourpeople from "./components/Ourpeople.jsx";
import AcademicCollaborations from "./components/AcademicCollaborations.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import Legacy from "./components/Legacy";
import Careers from "./components/Career";
import Blogs from "./components/Blogs.jsx";
import Publications from "./components/Publications";
import Events from "./components/Events";
import Team from "./components/Team";
import BlogPost from "./components/BlogPost.jsx";
import AcademicCollaborationsPage from "./components/AcademicCollaborationsPage.jsx";
import Preloader from "./components/Preloader.jsx";
import { ThemeProvider } from "./components/ThemeContext";
import "./App.css";

const SLIDES = [
  { id: "home", label: "Hero" },
  { id: "about", label: "About Firm" },
  { id: "practice", label: "Practice Areas" },
  { id: "awards", label: "Testimonials" },
  { id: "people", label: "Our People" },
  { id: "collaborations", label: "Academic Collaborations" },
  { id: "contact", label: "Chambers Intake" }
];

/* Snap-Fitting Single-Slide Home Page Component (Final slide is Contact with mini footer) */
const HomePage = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const location = useLocation();
  const snapContainerRef = useRef(null);

  // Scroll smoothly to a specific section by index or id
  const scrollToSlide = useCallback((target) => {
    let targetId = target;
    if (typeof target === "number") {
      targetId = SLIDES[target]?.id || "home";
    }

    const container = snapContainerRef.current;
    const el = document.getElementById(targetId);
    if (container && el) {
      container.scrollTo({
        top: el.offsetTop,
        behavior: "smooth"
      });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Handle hash scrolling if navigating with #section from other pages
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        scrollToSlide(sectionId);
      }, 200);
    }
  }, [location.hash, scrollToSlide]);

  // Track active slide via IntersectionObserver on snap container
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SLIDES.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) {
              setActiveSlideIndex(idx);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.55
      }
    );

    SLIDES.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for slide snapping (ArrowUp / ArrowDown / PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        return;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setActiveSlideIndex((prev) => {
          const next = Math.min(prev + 1, SLIDES.length - 1);
          scrollToSlide(next);
          return next;
        });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setActiveSlideIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          scrollToSlide(next);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToSlide]);

  return (
    <div className="home-wrapper">
      {/* Micro-Dot Slide Pagination */}
      <nav className="slide-pagination" aria-label="Slide Navigation">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            className={`pagination-dot ${activeSlideIndex === idx ? "active" : ""}`}
            onClick={() => scrollToSlide(idx)}
            aria-label={`Scroll to ${slide.label}`}
          >
            <span className="pagination-tooltip">{slide.label}</span>
          </button>
        ))}
      </nav>

      {/* Snap Fitting Slide Container */}
      <div className="home-snap-container" ref={snapContainerRef}>
        <Hero onNavigate={scrollToSlide} />
        <About onNavigate={scrollToSlide} />
        <PracticeAreas onNavigate={scrollToSlide} />
        <Testimonials onNavigate={scrollToSlide} />
        <Ourpeople onNavigate={scrollToSlide} />
        <AcademicCollaborations onNavigate={scrollToSlide} />
        <ContactForm onNavigate={scrollToSlide} />
      </div>
    </div>
  );
};

/* Scroll To Top helper for multi-page routing */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);
  return null;
};

/* Multi-Page Lenis Initializer for outer pages (Legacy, Blogs, Careers, etc.) */
const GlobalScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Only enable Lenis on non-home pages that require continuous document scrolling
    if (location.pathname !== "/") {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false
      });

      window.__lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      const rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        window.__lenis = null;
      };
    }
  }, [location.pathname]);

  return null;
};

/* Page Layout Shell for outer pages (attaches full upgraded footer) */
const OuterPageShell = ({ children }) => (
  <div className="outer-page-shell">
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Preloader />
      <Router>
        <ScrollToTop />
        <GlobalScrollManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Independent standalone pages — every navbar option resolves here */}
          <Route path="/about" element={<OuterPageShell><About /></OuterPageShell>} />
          <Route path="/practice-areas" element={<OuterPageShell><PracticeAreas /></OuterPageShell>} />
          <Route path="/testimonials" element={<OuterPageShell><Testimonials /></OuterPageShell>} />
          <Route path="/people" element={<OuterPageShell><Ourpeople /></OuterPageShell>} />
          <Route path="/contact" element={<OuterPageShell><ContactForm /></OuterPageShell>} />
          <Route path="/academic-collaborations" element={<OuterPageShell><AcademicCollaborationsPage /></OuterPageShell>} />
          <Route path="/legacy" element={<OuterPageShell><Legacy /></OuterPageShell>} />
          <Route path="/careers" element={<OuterPageShell><Careers /></OuterPageShell>} />
          <Route path="/blogs" element={<OuterPageShell><Blogs /></OuterPageShell>} />
          <Route path="/publications" element={<OuterPageShell><Publications /></OuterPageShell>} />
          <Route path="/events" element={<OuterPageShell><Events /></OuterPageShell>} />
          <Route path="/team" element={<OuterPageShell><Team /></OuterPageShell>} />
          <Route path="/blog/:id" element={<OuterPageShell><BlogPost /></OuterPageShell>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
