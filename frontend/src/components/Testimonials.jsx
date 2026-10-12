import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Testimonials = () => {
  const { isDarkTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const current = testimonials[currentIndex];

  return (
    <section className={`testimonials snap-slide ${isDarkTheme ? 'dark-theme' : 'light-theme'}`} id="awards">
      <style>{`
        .testimonials {
          position: relative;
          height: calc(100vh - var(--nav-height, 80px));
          max-height: calc(100vh - var(--nav-height, 80px));
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 2rem;
          overflow: hidden;
          box-sizing: border-box;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .testimonials.dark-theme {
          background: radial-gradient(circle at 50% 50%, #12141C 0%, #0C0D11 75%);
          color: #ECECF0;
        }
        .testimonials.light-theme {
          background: radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F9F8F5 75%);
          color: #171A21;
        }
        .testimonials-container {
          max-width: 1080px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: center;
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 1.5rem;
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
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .testimonials-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 0.35rem;
        }
        .testimonials.dark-theme .testimonials-title {
          background: linear-gradient(135deg, #FFFFFF 50%, #C5A059 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .testimonials.light-theme .testimonials-title {
          color: #171A21;
        }
        .testimonials-subtitle {
          font-size: 0.84rem;
          opacity: 0.75;
          margin: 0;
        }
        /* Card Showcase */
        .testimonial-card {
          width: 100%;
          max-width: 820px;
          padding: 2.2rem 2.6rem;
          border-radius: 14px;
          position: relative;
          box-sizing: border-box;
          animation: cardFade 0.3s ease;
        }
        .testimonials.dark-theme .testimonial-card {
          background: rgba(18, 20, 27, 0.75);
          border: 1px solid rgba(197, 160, 89, 0.22);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(14px);
        }
        .testimonials.light-theme .testimonial-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(197, 160, 89, 0.25);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(14px);
        }
        .testimonial-quote-icon {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          opacity: 0.15;
          color: #C5A059;
        }
        .testimonial-stars {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 1rem;
          color: #C5A059;
        }
        .testimonial-text {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.96rem, 1.6vw, 1.18rem);
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 1.5rem;
          opacity: 0.92;
        }
        .testimonial-author-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(197, 160, 89, 0.16);
        }
        .author-name {
          font-size: 0.96rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .author-meta {
          font-size: 0.76rem;
          opacity: 0.7;
          margin-top: 2px;
        }
        .practice-chip {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.1);
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }
        /* Nav buttons */
        .testimonial-nav-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1.25rem;
        }
        .testimonial-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid rgba(197, 160, 89, 0.28);
          color: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .testimonial-nav-btn:hover {
          border-color: #C5A059;
          color: #C5A059;
          transform: scale(1.08);
        }
        .testimonial-dots {
          display: flex;
          gap: 0.45rem;
        }
        .testimonial-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.25);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .testimonial-dot.active {
          width: 18px;
          border-radius: 4px;
          background: #C5A059;
        }
      `}</style>

      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <Shield size={13} />
            <span>Client Endorsements</span>
          </div>
          <h2 className="testimonials-title">Trusted By Visionary Leaders</h2>
          <p className="testimonials-subtitle">
            What corporate boards, general counsel, and institutions say about our legal stewardship.
          </p>
        </div>

        <div className="testimonial-card">
          <Quote size={52} className="testimonial-quote-icon" />

          <div className="testimonial-stars">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={15} fill="#C5A059" stroke="#C5A059" />
            ))}
          </div>

          <p className="testimonial-text">&ldquo;{current.quote}&rdquo;</p>

          <div className="testimonial-author-row">
            <div>
              <div className="author-name">{current.author}</div>
              <div className="author-meta">
                {current.designation} &bull; {current.entity}
              </div>
            </div>
            <span className="practice-chip">{current.practice}</span>
          </div>
        </div>

        <div className="testimonial-nav-row">
          <button
            type="button"
            className="testimonial-nav-btn"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className={`testimonial-dot ${currentIndex === idx ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            className="testimonial-nav-btn"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
