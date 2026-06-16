import React, { useState, useEffect, useCallback, useRef } from "react";
import Character from "./Character";
import Folder from "./Folder";
import {
  useKeyboardMovement,
  checkCollision,
} from "../hooks/useSpriteAnimation";
import FlyingBird from "./flyingbird";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

const baseFolders = [
  {
    id: "about",
    label: "About Me",
    color: "blue",
    basePosition: { x: 100, y: 260 },
    path: "/about",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    color: "red",
    basePosition: { x: 360, y: 260 },
    path: "/portfolio",
  },
  {
    id: "contact",
    label: "Contact Me",
    color: "yellow",
    basePosition: { x: 620, y: 260 },
    path: "/contact",
  },
];

const isMobileDevice = () => {
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};

const HomeScreen = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const gameAreaRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [gameBounds, setGameBounds] = useState({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        setScale(rect.width / GAME_WIDTH);
        setGameBounds({ width: rect.width, height: rect.height });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Minimum scale for folders so they don't get too tiny
  const folderScale = Math.max(scale, 0.85);
  const charScale = Math.max(scale * 1.4, 1.2);

  // Calculate folder positions
  const getMobileX = (index, total, containerWidth) => {
    const spacing = containerWidth / (total + 1);
    return spacing * (index + 1) - 40 * folderScale;
  };

  const folders = baseFolders.map((folder, index) => {
    const containerWidth =
      gameAreaRef.current?.offsetWidth || GAME_WIDTH * scale;
    const containerHeight =
      gameAreaRef.current?.offsetHeight || GAME_HEIGHT * scale;

    return {
      ...folder,
      position: {
        x: isMobile
          ? getMobileX(index, baseFolders.length, containerWidth)
          : folder.basePosition.x * scale,
        y: isMobile
          ? containerHeight - 80 - folderScale * 20
          : folder.basePosition.y * scale,
      },
    };
  });

  const { position, direction, isMoving, touchHandlers } = useKeyboardMovement(
    4,
    gameBounds,
  );
  const [highlightedFolder, setHighlightedFolder] = useState(null);
  const [collisionTimer, setCollisionTimer] = useState(0);

  useEffect(() => {
    const charRect = {
      x: position.x,
      y: position.y,
      width: 64 * charScale,
      height: 64 * charScale,
    };
    let collidedFolder = null;
    folders.forEach((folder) => {
      const folderRect = {
        x: folder.position.x,
        y: folder.position.y,
        width: 80 * folderScale,
        height: 80 * folderScale,
      };
      if (checkCollision(charRect, folderRect)) {
        collidedFolder = folder;
      }
    });

    setHighlightedFolder(collidedFolder);

    if (collidedFolder) {
      setCollisionTimer((prev) => {
        const newTimer = prev + 1;
        if (newTimer > 90) {
          onNavigate(collidedFolder.path);
          return 0;
        }
        return newTimer;
      });
    } else {
      setCollisionTimer(0);
    }
  }, [position, onNavigate, folders, charScale, folderScale]);

  const handleFolderClick = useCallback(
    (path) => {
      onNavigate(path);
    },
    [onNavigate],
  );

  return (
    <div
      className="home-screen"
      style={{
        padding: "20px 0",
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
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

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1
          className="home-title"
          style={{ textAlign: "center", margin: "20px 0 0" }}
        >
          ROJIT ARYAL
        </h1>
        <p
          style={{
            fontSize: "10px",
            color: "#666",
            textAlign: "center",
            maxWidth: "500px",
            margin: "20px auto 60px",
            lineHeight: "1.8",
          }}
        >
          START BY WALKING OVER DESIRED MODE OR CLICK
        </p>

        <div
          style={{
            marginBottom: 8,
            fontSize: 10,
            color: "#999",
            textAlign: "center",
          }}
        >
          {isMobile ? "Swipe to move" : "Use WASD or Arrow Keys to move"}
        </div>

        <div
          ref={gameAreaRef}
          className="game-area"
          style={{
            position: "relative",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "2px solid #333",
            textAlign: "left",
            zIndex: 2,
            touchAction: "none",
            userSelect: "none",
            overflow: "hidden",
          }}
          {...touchHandlers}
        >
          <FlyingBird
            wingClosed="/close.png"
            wingOpen="/open.png"
            speed={1}
            startY={180}
            scale={4}
          />
          <Character
            position={position}
            direction={direction}
            isMoving={isMoving}
            scale={charScale}
          />
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              label={folder.label}
              color={folder.color}
              position={folder.position}
              scale={folderScale}
              isHighlighted={highlightedFolder?.id === folder.id}
              onClick={() => handleFolderClick(folder.path)}
            />
          ))}
          {highlightedFolder && (
            <div
              style={{
                position: "absolute",
                left: highlightedFolder.position.x,
                top: highlightedFolder.position.y - 20 * folderScale,
                width: 80 * folderScale,
                height: 6 * folderScale,
                background: "#ddd",
                border: "2px solid #333",
              }}
            >
              <div
                style={{
                  width: `${Math.min((collisionTimer / 90) * 100, 100)}%`,
                  height: "100%",
                  background: "#4CAF50",
                  transition: "width 0.1s",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
