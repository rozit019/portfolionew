import { useState, useEffect, useCallback } from "react";

export const useSpriteAnimation = (
  frames,
  interval = 200,
  isPlaying = true,
) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!isPlaying || !frames || frames.length <= 1) {
      setCurrentFrame(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer);
  }, [frames, interval, isPlaying]);

  return frames ? frames[currentFrame] || frames[0] : null;
};

export const useKeyboardMovement = (
  speed = 5,
  bounds = { width: 800, height: 400 },
  characterSize = { width: 64, height: 64 },
) => {
  // Calculate center position dynamically based on bounds and character size
  const centerX = Math.floor((bounds.width - characterSize.width) / 2);
  const centerY = Math.floor((bounds.height - characterSize.height - 100) / 2);

  const [position, setPosition] = useState({ x: centerX, y: centerY });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [keys, setKeys] = useState({});

  const handleKeyDown = useCallback((e) => {
    setKeys((prev) => ({ ...prev, [e.key]: true }));
  }, []);

  const handleKeyUp = useCallback((e) => {
    setKeys((prev) => ({ ...prev, [e.key]: false }));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        let newDirection = direction;
        let moving = false;

        if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
          newY = Math.max(0, prev.y - speed);
          newDirection = "up";
          moving = true;
        }
        if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
          newY = Math.min(bounds.height - characterSize.height, prev.y + speed);
          newDirection = "down";
          moving = true;
        }
        if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
          newX = Math.max(0, prev.x - speed);
          newDirection = "left";
          moving = true;
        }
        if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
          newX = Math.min(bounds.width - characterSize.width, prev.x + speed);
          newDirection = "right";
          moving = true;
        }

        setDirection(newDirection);
        setIsMoving(moving);
        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [
    keys,
    speed,
    bounds,
    direction,
    characterSize.width,
    characterSize.height,
  ]);

  return { position, direction, isMoving };
};

export const checkCollision = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};
