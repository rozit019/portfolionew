import React from "react";

const spriteSheets = {
  idle: "/character/mage_idle1.png",
  down: "/character/walk_down.png",
  left: "/character/walk_left.png",
  right: "/character/walk_right.png",
  up: "/character/walk_up.png",
};

const frameCounts = {
  idle: 2,
  down: 4,
  left: 5,
  right: 5,
  up: 4,
};

const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;

const Character = ({ position, direction, isMoving, scale: propScale }) => {
  const [currentFrame, setCurrentFrame] = React.useState(0);

  // Animate frames when moving
  React.useEffect(() => {
    if (!isMoving) {
      setCurrentFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCounts[direction]);
    }, 200);

    return () => clearInterval(interval);
  }, [isMoving, direction]);

  const spriteSheet = spriteSheets[isMoving ? direction : "idle"];
  const frameCount = frameCounts[isMoving ? direction : "idle"];

  const backgroundPositionX = -(currentFrame * FRAME_WIDTH);

  // Use prop scale if provided, otherwise default 1.3
  const SCALE = propScale || 1.3;

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
        transformOrigin: "top left",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        zIndex: 10,
      }}
    />
  );
};

export default Character;
