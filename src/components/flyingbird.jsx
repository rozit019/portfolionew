import React, { useState, useEffect } from "react";

const FlyingBird = ({
  wingClosed = "/close.png", // Wings closed image
  wingOpen = "/open.png", // Wings open image
  speed = 1,
  startY = 50,
  scale = 4,
}) => {
  const [position, setPosition] = useState({ x: -100, y: startY });
  const [wingState, setWingState] = useState(false); // false = closed, true = open

  useEffect(() => {
    let animationId;
    let lastTime = 0;
    const flapInterval = 200; // ms between wing flaps

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;

      // Move position
      setPosition((prev) => {
        let newX = prev.x + speed;
        let newY = startY + Math.sin(newX / 80) * 10;

        if (newX > window.innerWidth + 100) {
          newX = -50;
        }

        return { x: newX, y: newY };
      });

      // Flap wings
      if (delta > flapInterval) {
        setWingState((prev) => !prev);
        lastTime = timestamp;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed, startY, scale]);

  const currentImage = wingState ? wingOpen : wingClosed;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1,
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
