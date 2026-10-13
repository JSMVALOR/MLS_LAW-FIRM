import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { useTheme } from './ThemeContext';

const TESTIMONIALS = [
  {
    quote: "MLS & Co orchestrated our multi-jurisdictional corporate restructuring with exceptional commercial acumen and speed. Their counsel before arbitral tribunals proved decisive in protecting our enterprise equity.",
    author: "Vikramaditya Singhania",
    designation: "Managing Director",
    entity: "Apex Infrastructure & Energy Group",
    rating: 5,
    practice: "Corporate & M&A"
  },
  {
    quote: "When facing a high-stakes constitutional writ, the depth of research and oral advocacy demonstrated by the partners before the High Court was unmatched. They are truly formidable in courtroom defense.",
    author: "Sunita Nambiar",
    designation: "General Counsel",
    entity: "Continental Banking & Financial Corp",
    rating: 5,
    practice: "Constitutional & Civil"
  },
  {
    quote: "Their white-collar defense and regulatory compliance team guided our leadership through complex statutory investigations with total discretion, ethical clarity, and decisive results.",
    author: "Rajeshwar Rao",
    designation: "Chief Executive Officer",
    entity: "Zenith Global Tech Ventures",
    rating: 5,
    practice: "Economic Defense"
  },
  {
    quote: "From intellectual property protection to intricate international arbitration, MLS & Co blends the personal touch of a boutique firm with the sheer muscle of an institutional powerhouse.",
    author: "Ananya Deshmukh",
    designation: "Co-Founder & VP Legal",
    entity: "Novasphere Pharmaceuticals",
    rating: 5,
    practice: "IP & Arbitration"
  }
];

const Testimonials = () => {
  const { isDarkTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);
  const touchStartT = useRef(0);

  const goTo = useCallback((idx) => {
    setCurrentIndex((prev) => {
      const next = (idx + TESTIMONIALS.length) % TESTIMONIALS.length;
      setDirection(next >= prev ? 1 : -1);
      return next;
    });
  }, []);

  const handlePrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const handleNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // Arrow-key navigation when the section is in view; ignored inside form fields.
  useEffect(() => {
    const section = document.getElementById("awards");
    if (!section) return;
    const onKey = (e) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      const r = section.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3;
      if (!inView) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  // Swipe with velocity handoff — a flick dismisses regardless of distance.
  const onTouchStart = (e) => {
    if (e.touches.length > 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartT.current = performance.now();
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dt = Math.max(performance.now() - touchStartT.current, 1);
    const velocity = Math.abs(dx) / dt;
    if (Math.abs(dx) > 48 || velocity > 0.11) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className={`testimonials snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="awards" aria-label="Client endorsements">
      <style>{`
        .testimonials {
          position: relative;
          min-height: calc(100vh - var(--nav-height, 80px));
          min-height: calc(100svh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 2rem;
          padding-left: max(2rem, var(--sal));
          padding-right: max(2rem, var(--sar));
          overflow: hidden;
          overflow: clip;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .testimonials.dark-theme {
          background: radial-gradient(circle at 50% 30%, #14161E 0%, #0C0D11 70%);
          color: #ECECF0;
        }
        .testimonials.light-theme {
          background: radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F9F8F5 70%);
          color: #171A21;
        }
        .testimonials-container {
          max-width: 1080px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .testimonials-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.85rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.22);
          color: #C5A059;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
          white-space: nowrap;
        }
        .testimonials-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.2;
          margin: 0 0 0.35rem;
          text-align: center;
          text-wrap: balance;
        }
        .testimonials-subtitle {
          font-size: 0.84rem;
          line-height: 1.6;
          opacity: 0.75;
          margin: 0 0 1.5rem;
          text-align: center;
          max-width: 58ch;
        }
        .testimonial-card {
          width: 100%;
          max-width: 820px;
          padding: 2.2rem 2.6rem;
          border-radius: var(--r-lg);
          position: relative;
          box-sizing: border-box;
          touch-action: pan-y;
          overflow: hidden;
        }
        /* Direction-aware slide — exits the way it entered */
        .testimonial-card.slide-next {
          animation: slideNext var(--dur-drop) var(--ease-out);
        }
        .testimonial-card.slide-prev {
          animation: slidePrev var(--dur-drop) var(--ease-out);
        }
        @keyframes slideNext {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slidePrev {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .testimonial-quote-icon {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          opacity: 0.14;
          color: #C5A059;
          pointer-events: none;
        }
        .testimonial-stars {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 1rem;
          color: #C5A059;
        }
        .testimonial-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          line-height: 1.55;
          font-style: italic;
          font-weight: 500;
          margin: 0 0 1.5rem;
          opacity: 0.94;
          text-wrap: pretty;
          min-height: 3.2em;
        }
        .testimonial-author-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(197, 160, 89, 0.16);
        }
        .author-block {
          min-width: 0;
        }
        .author-name {
          font-size: 0.96rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .author-meta {
          font-size: 0.76rem;
          opacity: 0.7;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .practice-chip {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.1);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.22);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .testimonial-nav-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }
        .testimonial-nav-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: inherit;
          cursor: pointer;
          transition: transform var(--dur-press) var(--ease-out), border-color var(--dur-pop) var(--ease-out), color var(--dur-pop) var(--ease-out);
        }
        .testimonial-nav-btn:active {
          transform: scale(0.9);
        }
        .testimonial-dots {
          display: flex;
          gap: 0.15rem;
          align-items: center;
        }
        .testimonial-dot {
          width: 28px;
          height: 28px;
          min-width: 28px;
          min-height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .testimonial-dot::after {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.25);
          transition: width var(--dur-pop) var(--ease-out), background-color var(--dur-pop) var(--ease-out), border-radius var(--dur-pop) var(--ease-out);
          display: block;
        }
        .testimonial-dot.active::after {
          width: 18px;
          border-radius: 4px;
          background: #C5A059;
        }
        .testimonial-count {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          opacity: 0.55;
          font-variant-numeric: tabular-nums;
          margin-left: 0.5rem;
        }
        @media (hover: hover) and (pointer: fine) {
          .testimonial-nav-btn:hover {
            border-color: #C5A059;
            color: #C5A059;
            transform: scale(1.06);
          }
        }
        @media (max-width: 768px) {
          .testimonials { padding: 2.5rem 1.1rem 2rem; align-items: flex-start; }
          .testimonials-title { font-size: clamp(1.45rem, 6.5vw, 1.9rem); }
          .testimonials-subtitle { font-size: 0.88rem; max-width: 36ch; }
          .testimonial-card { padding: 1.4rem 1.25rem 1.25rem; }
          .testimonial-quote-icon { top: 1rem; right: 1.1rem; }
          .testimonial-text { font-size: 1.08rem; min-height: 0; }
          .testimonial-author-row { flex-direction: column; align-items: flex-start; gap: 0.7rem; }
          .practice-chip { align-self: flex-start; }
          .testimonial-nav-row { margin-top: 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-card.slide-next, .testimonial-card.slide-prev {
            animation: fadeOnly 180ms ease;
          }
          @keyframes fadeOnly {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>

      <div className="testimonials-container">
        <div className="testimonials-badge">
          <Shield size={13} style={{ flexShrink: 0 }} />
          <span>Client Endorsements</span>
        </div>
        <h2 className="testimonials-title lux-crest-text">Trusted By Visionary Leaders</h2>
        <p className="testimonials-subtitle">
          What corporate boards, general counsel, and institutions say about our legal stewardship.
        </p>

        <div
          key={currentIndex}
          className={`testimonial-card lux-card ${direction >= 0 ? "slide-next" : "slide-prev"}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Quote size={52} className="testimonial-quote-icon" aria-hidden="true" />

          <div className="testimonial-stars" aria-label={`${current.rating} out of 5 stars`}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={15} fill="#C5A059" stroke="#C5A059" aria-hidden="true" />
            ))}
          </div>

          <p className="testimonial-text">&ldquo;{current.quote}&rdquo;</p>

          <div className="testimonial-author-row">
            <div className="author-block">
              <div className="author-name">{current.author}</div>
              <div className="author-meta">{current.designation} &bull; {current.entity}</div>
            </div>
            <span className="practice-chip">{current.practice}</span>
          </div>
        </div>

        <div className="testimonial-nav-row">
          <button type="button" className="testimonial-nav-btn" onClick={handlePrev} aria-label="Previous testimonial">
            <ChevronLeft size={18} />
          </button>

          <div className="testimonial-dots" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`testimonial-dot ${currentIndex === idx ? "active" : ""}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>

          <button type="button" className="testimonial-nav-btn" onClick={handleNext} aria-label="Next testimonial">
            <ChevronRight size={18} />
          </button>

          <span className="testimonial-count" aria-hidden="true">
            {String(currentIndex + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
