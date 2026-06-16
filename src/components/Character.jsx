import React from "react";

// Sprite sheet paths - each image has 4 frames
const spriteSheets = {
  idle: "/character/mage_idle1.png",
  down: "/character/walk_down.png",
  left: "/character/walk_left.png",
  right: "/character/walk_right.png",
  up: "/character/walk_up.png",
};

// Frame count per sprite sheet (adjust based on your images)
const frameCounts = {
  idle: 2, // 4 frames in idle image
  down: 4, // 4 frames in walk_down
  left: 5, // 4 frames in walk_left
  right: 5, // 4 frames in walk_right
  up: 4, // 4 frames in walk_up
};

// Frame size in pixels (adjust based on your sprite size)
const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;

const Character = ({ position, direction, isMoving }) => {
  const [currentFrame, setCurrentFrame] = React.useState(0);

  // Animate frames when moving
  React.useEffect(() => {
    if (!isMoving) {
      setCurrentFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCounts[direction]);
    }, 200); // Change frame every 200ms

    return () => clearInterval(interval);
  }, [isMoving, direction]);

  const spriteSheet = spriteSheets[isMoving ? direction : "idle"];
  const frameCount = frameCounts[isMoving ? direction : "idle"];

  // Calculate which part of the sprite sheet to show
  // backgroundPosition shifts the visible area
  const backgroundPositionX = -(currentFrame * FRAME_WIDTH);
  const SCALE = 1.3;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        backgroundImage: `url(${spriteSheet})`,
        backgroundPosition: `${backgroundPositionX}px 0px`,
        backgroundSize: `${frameCount * FRAME_WIDTH}px ${FRAME_HEIGHT}px`,
        transform: `scale(${SCALE})`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        // transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        zIndex: 10,
      }}
    />
  );
};

export default Character;
