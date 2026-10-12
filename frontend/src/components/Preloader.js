import React, { useState, useEffect } from 'react';
import '../styles/Preloader.css';

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const step = prev < 70 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Trigger opening curtain animation
      const openTimer = setTimeout(() => {
        setIsOpening(true);
      }, 250);

      // Unmount after curtain animation completes
      const exitTimer = setTimeout(() => {
        setIsExited(true);
        if (onFinish) onFinish();
      }, 950);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [progress, onFinish]);

  if (isExited) return null;

  return (
    <div className={`preloader-overlay ${isOpening ? 'preloader-opening' : ''}`}>
      {/* Top and Bottom Opening Curtains */}
      <div className="preloader-curtain preloader-curtain-top" />
      <div className="preloader-curtain preloader-curtain-bottom" />

      {/* Center Cinematic Content */}
      <div className={`preloader-content ${isOpening ? 'preloader-content-fade' : ''}`}>
        {/* Ambient Gold Radial Halo */}
        <div className="preloader-glow-ring" aria-hidden="true" />

        {/* Clean Vector SVG Logo */}
        <div className="preloader-logo-frame">
          <img
            src="/mls_logo_clean.svg"
            alt="MLS & Co"
            className="preloader-logo-svg"
          />
        </div>

        {/* Brand Firm Title */}
        <div className="preloader-typography">
          <h1 className="preloader-title">MLS & CO.</h1>
          <span className="preloader-sub">ADVOCATES & SOLICITORS</span>
        </div>

        {/* Motto Shimmer */}
        <p className="preloader-motto">
          Men Legatum Sanctitas
        </p>

        {/* Minimalist Hairline Gold Progress Bar */}
        <div className="preloader-progress-track">
          <div
            className="preloader-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle Counter Percentage */}
        <div className="preloader-counter">
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
