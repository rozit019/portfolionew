import { useState, useEffect, useCallback, useRef } from "react";

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
  const centerX = Math.floor((bounds.width - characterSize.width) / 2);
  const centerY = Math.floor((bounds.height - characterSize.height - 100) / 2);

  const [position, setPosition] = useState({ x: centerX, y: centerY });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [keys, setKeys] = useState({});

  // Reset position when bounds change (mobile resize)
  useEffect(() => {
    const newCenterX = Math.floor((bounds.width - characterSize.width) / 2);
    const newCenterY = Math.floor(
      (bounds.height - characterSize.height - 100) / 2,
    );
    setPosition({ x: newCenterX, y: newCenterY });
  }, [bounds.width, bounds.height, characterSize.width, characterSize.height]);

  // Swipe state
  const touchStartRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    setKeys((prev) => ({ ...prev, [e.key]: true }));
  }, []);

  const handleKeyUp = useCallback((e) => {
    setKeys((prev) => ({ ...prev, [e.key]: false }));
  }, []);

  // Swipe handlers - no preventDefault (use CSS touch-action: none instead)
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!touchStartRef.current) return;
      // REMOVED: e.preventDefault() - causes passive event error

      const touch = e.touches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;

      const threshold = 10;

      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
        setPosition((prev) => {
          let newX = prev.x;
          let newY = prev.y;
          let newDirection = direction;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
              newX = Math.min(
                bounds.width - characterSize.width,
                prev.x + speed,
              );
              newDirection = "right";
            } else {
              newX = Math.max(0, prev.x - speed);
              newDirection = "left";
            }
          } else {
            if (dy > 0) {
              newY = Math.min(
                bounds.height - characterSize.height,
                prev.y + speed,
              );
              newDirection = "down";
            } else {
              newY = Math.max(0, prev.y - speed);
              newDirection = "up";
            }
          }

          setDirection(newDirection);
          setIsMoving(true);
          return { x: newX, y: newY };
        });

        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }
    },
    [speed, bounds, direction, characterSize.width, characterSize.height],
  );

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    setIsMoving(false);
  }, []);

  // Keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Keyboard movement loop
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

  return {
    position,
    direction,
    isMoving,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};

export const checkCollision = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};
