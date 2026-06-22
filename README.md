# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

import React, { useState, useEffect, useCallback } from "react";
import Character from "./Character";
import Folder from "./Folder";
import {
  useKeyboardMovement,
  checkCollision,
} from "../hooks/useSpriteAnimation";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

const folders = [
  {
    id: "about",
    label: "About Me",
    color: "blue",
    position: { x: 100, y: 280 },
    path: "/about",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    color: "red",
    position: { x: 360, y: 280 },
    path: "/portfolio",
  },
  {
    id: "contact",
    label: "Contact Me",
    color: "yellow",
    position: { x: 620, y: 280 },
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
    <div className="home-screen">
      <h1 className="home-title">ROJIT ARYAL</h1>
      <p className="home-subtitle">
        START BY WALKING OVER DESIRED MODE OR CLICK
      </p>

      <div
        className="game-area"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
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
      <div style={{ marginTop: 20, fontSize: 10, color: "#999" }}>
        Use WASD or Arrow Keys to move
      </div>
    </div>
  );
};

export default HomeScreen;