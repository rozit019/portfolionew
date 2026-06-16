import React, { useState, useEffect, useRef } from "react";

const FlyingBird = ({
  wingClosed = "/close.png",
  wingOpen = "/open.png",
  speed = 2,
  startY = 50,
  scale = 4,
}) => {
  const [position, setPosition] = useState({ x: -100, y: startY });
  const [wingState, setWingState] = useState(false);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;

      // Move position
      setPosition((prev) => {
        let newX = prev.x + speed;
        let newY = startY + Math.sin(newX / 80) * 10;

        if (newX > window.innerWidth + 100) {
          newX = -50;
        }

        return { x: newX, y: newY };
      });

      // Flap wings every 200ms
      if (delta > 200) {
        setWingState((prev) => !prev);
        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, startY]); // Only re-run if speed or startY changes

  const currentImage = wingState ? wingOpen : wingClosed;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 0,
        pointerEvents: "none",
        width: 16 * scale,
        height: 16 * scale,
      }}
    >
      <img
        src={currentImage}
        alt="bird"
        style={{
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
          display: "block",
        }}
      />
    </div>
  );
};

export default FlyingBird;
