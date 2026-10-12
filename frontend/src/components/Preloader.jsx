import React, { useState, useEffect } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOpening(true);
          setTimeout(() => {
            setLoading(false);
          }, 850);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`preloader-overlay ${opening ? "preloader-opening" : ""}`}
      aria-hidden="true"
    >
      <style>{`
        .preloader-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          user-select: none;
          pointer-events: all;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .preloader-curtain {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 50.5%;
          background: #08090C;
          z-index: 1;
          transition: transform 0.85s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .preloader-curtain-top {
          top: 0;
          transform-origin: top;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
        }
        .preloader-curtain-bottom {
          bottom: 0;
          transform-origin: bottom;
          border-top: 1px solid rgba(197, 160, 89, 0.15);
        }
        .preloader-overlay.preloader-opening .preloader-curtain-top {
          transform: translateY(-100%);
        }
        .preloader-overlay.preloader-opening .preloader-curtain-bottom {
          transform: translateY(100%);
        }
        .preloader-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: opacity 0.5s ease, transform 0.6s ease;
        }
        .preloader-content-fade {
          opacity: 0;
          transform: scale(1.05);
          pointer-events: none;
        }
        .preloader-glow-ring {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: -1;
        }
        .preloader-logo-frame {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.15rem;
        }
        .preloader-logo-svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 16px rgba(197, 160, 89, 0.3));
        }
        .preloader-typography {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .preloader-title {
          font-family: 'Cinzel', serif;
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          background: linear-gradient(135deg, #FFFFFF 0%, #EAD9B8 40%, #C5A059 70%, #9E7B38 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        .preloader-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          color: #C5A059;
          opacity: 0.85;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .preloader-motto {
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          font-style: italic;
          letter-spacing: 0.08em;
          color: #9BA0AD;
          margin-bottom: 1.5rem;
        }
        .preloader-progress-track {
          width: 170px;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          overflow: hidden;
          position: relative;
          margin-bottom: 0.65rem;
        }
        .preloader-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #F2E3C6 0%, #C5A059 60%, #A47B2E 100%);
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.6);
          transition: width 0.08s ease-out;
          border-radius: 9999px;
        }
        .preloader-counter {
          font-size: 0.7rem;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          color: #C5A059;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }
      `}</style>

      <div className="preloader-curtain preloader-curtain-top" />
      <div className="preloader-curtain preloader-curtain-bottom" />

      <div className={`preloader-content ${opening ? "preloader-content-fade" : ""}`}>
        <div className="preloader-glow-ring" />

        <div className="preloader-logo-frame">
          <img
            src="/mls_logo_clean.svg"
            alt="MLS & Co."
            className="preloader-logo-svg"
          />
        </div>

        <div className="preloader-typography">
          <h1 className="preloader-title">MLS & CO.</h1>
          <span className="preloader-sub">ADVOCATES & SOLICITORS</span>
        </div>

        <div className="preloader-motto">
          Men Legatum Sanctitas
        </div>

        <div className="preloader-progress-track">
          <div
            className="preloader-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="preloader-counter">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
