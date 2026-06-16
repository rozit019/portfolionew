import React, { useState, useEffect } from "react";
import FlyingBird from "./flyingbird.jsx";

const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;
const TOTAL_FRAMES = 2;

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Animate character frames
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 200);

    return () => clearInterval(frameInterval);
  }, []);

  const backgroundPositionX = -(currentFrame * FRAME_WIDTH);
  const SCALE = 1.3;

  return (
    <div
      className="loading-screen"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <img
        src="/omm.png"
        alt="Pixel scenery"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
          imageRendering: "pixelated",
          transform: "translateY(30%)",
        }}
      />

      {/* Loading content above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="loading-text">LOADING</div>
        <div className="loading-bar-container">
          <div
            className="loading-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="loading-percentage">
          {Math.min(Math.round(progress), 100)}%
        </div>

        {/* Character */}
        <div
          style={{
            margin: "30px auto 0",
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            backgroundImage: "url(/character/mage_idle1.png)",
            backgroundPosition: `${backgroundPositionX}px 0px`,
            backgroundSize: `${TOTAL_FRAMES * FRAME_WIDTH}px ${FRAME_HEIGHT}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            transform: `scale(${SCALE})`,
          }}
        />
        <FlyingBird
          wingClosed="/close.png"
          wingOpen="/open.png"
          speed={1}
          startY={180}
          scale={4}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
