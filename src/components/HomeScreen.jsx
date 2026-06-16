import React, { useState, useEffect, useCallback } from "react";
import Character from "./Character";
import Folder from "./Folder";
import {
  useKeyboardMovement,
  checkCollision,
} from "../hooks/useSpriteAnimation";
import FlyingBird from "./flyingbird";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

const folders = [
  {
    id: "about",
    label: "About Me",
    color: "blue",
    position: { x: 100, y: 260 },
    path: "/about",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    color: "red",
    position: { x: 360, y: 260 },
    path: "/portfolio",
  },
  {
    id: "contact",
    label: "Contact Me",
    color: "yellow",
    position: { x: 620, y: 260 },
    path: "/contact",
  },
];

const HomeScreen = ({ onNavigate }) => {
  const { position, direction, isMoving } = useKeyboardMovement(4, {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  });
  const [highlightedFolder, setHighlightedFolder] = useState(null);
  const [collisionTimer, setCollisionTimer] = useState(0);

  useEffect(() => {
    const charRect = { x: position.x, y: position.y, width: 64, height: 64 };
    let collidedFolder = null;
    folders.forEach((folder) => {
      const folderRect = {
        x: folder.position.x,
        y: folder.position.y,
        width: 80,
        height: 80,
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
  }, [position, onNavigate]);

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
      {/* Background image at very back */}
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

      {/* Content layer - zIndex 1 */}
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
          Use WASD or Arrow Keys to move
        </div>

        {/* Game box - zIndex 2, ABOVE background */}
        <div
          className="game-area"
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            position: "relative",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "2px solid #333",
            textAlign: "left",
            zIndex: 2,
          }}
        >
          <Character
            position={position}
            direction={direction}
            isMoving={isMoving}
          />
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              label={folder.label}
              color={folder.color}
              position={folder.position}
              isHighlighted={highlightedFolder?.id === folder.id}
              onClick={() => handleFolderClick(folder.path)}
            />
          ))}
          {highlightedFolder && (
            <div
              style={{
                position: "absolute",
                left: highlightedFolder.position.x,
                top: highlightedFolder.position.y - 20,
                width: 80,
                height: 6,
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

      {/* Bird - OUTSIDE content layer, zIndex between background and game box */}
      <FlyingBird
        wingClosed="/close.png"
        wingOpen="/open.png"
        speed={1}
        startY={180}
        scale={4}
      />
      {/* <FlyingBird
        wingClosed="/close.png"
        wingOpen="/open.png"
        speed={1}
        startY={160}
        scale={4}
      /> */}
    </div>
  );
};

export default HomeScreen;
