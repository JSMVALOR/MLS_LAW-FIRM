import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, Shield } from 'lucide-react';
import '../styles/Testimonials.css';
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
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <Shield size={14} />
            <span>Client Endorsements</span>
          </div>
          <h2 className="testimonials-title">Trusted By Visionary Leaders</h2>
          <p className="testimonials-subtitle">
            What corporate boards, counsel, and institutions say about our legal stewardship.
          </p>
        </div>

        {/* Featured Showcase Slide Card */}
        <div className="testimonial-feature-card">
          <div className="testimonial-card-top-bar">
            <div className="testimonial-practice-pill">
              <Award size={14} />
              <span>{current.practice}</span>
            </div>
            <div className="testimonial-stars">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="star-icon" size={16} />
              ))}
            </div>
          </div>

          <div className="testimonial-quote-wrapper">
            <Quote className="quote-icon" size={36} />
            <p className="testimonial-lead-text">"{current.quote}"</p>
          </div>

          <div className="testimonial-footer-row">
            <div className="testimonial-author-meta">
              <h4 className="author-name">{current.author}</h4>
              <p className="author-role">{current.designation} &mdash; <span>{current.entity}</span></p>
            </div>

            {/* Pagination Navigator */}
            <div className="testimonial-nav-controls">
              <button
                type="button"
                className="testimonial-nav-btn"
                onClick={handlePrev}
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="testimonial-counter">
                {currentIndex + 1} / {testimonials.length}
              </span>
              <button
                type="button"
                className="testimonial-nav-btn"
                onClick={handleNext}
                aria-label="Next Testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
