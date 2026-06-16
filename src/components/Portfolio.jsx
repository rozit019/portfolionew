import React, { useState, useEffect } from "react";
import NavigateButton from "./NavigateButton";

const projects = [
  {
    id: 1,
    title: "Padham It",
    image: "/it.png",
    fullImage: "/it.png",
    description:
      "A centralized digital ecosystem for academic preparation. Built with React and Node.js.",
    link: "https://padhamit.onrender.com",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Mern first try project",
    image: "/first.png",
    fullImage: "/first.png",
    description:
      "Just a simple mern stack project to test out front end connecting to backend and deploying on render.",
    link: "https://mern-first-project-aken4m.onrender.com/",
    tech: ["React", "node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Graphics Portfolio",
    image: "/wow.png",
    fullImage: "/wow.png",
    description:
      "Graphics and motion design works created using Photoshop, Illustrator, and Premiere Pro.",
    link: "https://drive.google.com/drive/folders/1_aO6yzPQlZsG1fzBdEE1SORDaBDAfbaW",
    tech: ["Vue.js", "Express"],
  },
];

// Character animation component
const WalkingCharacter = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const FRAME_WIDTH = 64;
  const FRAME_HEIGHT = 64;
  const TOTAL_FRAMES = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const backgroundPositionX = -(currentFrame * FRAME_WIDTH);

  return (
    <div
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        backgroundImage: "url(/character/walk_down.png)",
        backgroundPosition: `${backgroundPositionX}px 0px`,
        backgroundSize: `${TOTAL_FRAMES * FRAME_WIDTH}px ${FRAME_HEIGHT}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        transform: "scale(2)",
        transformOrigin: "top left",
      }}
    />
  );
};

const Portfolio = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div
      className="section-page"
      style={{
        padding: "40px",
        maxWidth: 1200,
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Full-width background image at bottom */}
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
          transform: "translateY(20%)",
        }}
      />

      {/* Content layer above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <NavigateButton onNavigate={() => onNavigate("/")} />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 20,
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              color: "#4A90E2",
              transform: "rotate(-5deg)",
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            Rojit
            <br />
            Aryal
          </h1>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "10px",
                color: "#666",
                fontFamily: "'Press Start 2P', cursive",
              }}
            >
              portfolio
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#333",
                fontFamily: "'Press Start 2P', cursive",
                marginTop: 10,
              }}
            >
              the room of
              <br />
              unfinished things
            </p>
          </div>
        </div>

        {/* Main Content: Character Left + Projects Right */}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 40,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT SIDE - Walking Character */}
          <div
            style={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <WalkingCharacter />
            <p
              style={{
                marginTop: 80,
                marginLeft: 50,
                fontSize: "10px",
                color: "#999",
                fontFamily: "'Press Start 2P', cursive",
                textAlign: "center",
                lineHeight: 2,
              }}
            >
              Walking
              <br />
              through
              <br />
              projects...
            </p>
          </div>

          {/* RIGHT SIDE - Project Stack */}
          <div className="portfolio-stack" style={{ flex: 1, marginTop: 20 }}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card"
                style={{
                  zIndex: projects.length - index,
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.zIndex = 100;
                  e.currentTarget.style.transform =
                    "translateY(-15px) scale(1.03)";
                  e.currentTarget.style.boxShadow = "8px 8px 0 rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.zIndex = projects.length - index;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "4px 4px 0 rgba(0,0,0,0.2)";
                }}
                onClick={() => openModal(project)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    color: "#fff",
                    fontSize: "10px",
                    textShadow: "2px 2px 0 #000",
                    zIndex: 5,
                    fontFamily: "'Press Start 2P', cursive",
                  }}
                >
                  {project.title}
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#f5f5f5",
              border: "4px solid #333",
              maxWidth: 900,
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              boxShadow: "8px 8px 0 rgba(0,0,0,0.3)",
              animation: "modalOpen 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#E74C3C",
                color: "white",
                border: "3px solid #333",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "12px",
                padding: "8px 12px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            <div
              style={{
                width: "100%",
                height: 400,
                overflow: "hidden",
                borderBottom: "4px solid #333",
              }}
            >
              <img
                src={selectedProject.fullImage || selectedProject.image}
                alt={selectedProject.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                }}
              />
            </div>

            <div style={{ padding: 30 }}>
              <h2
                style={{
                  fontSize: "24px",
                  color: "#333",
                  marginBottom: 15,
                  fontFamily: "'Press Start 2P', cursive",
                }}
              >
                {selectedProject.title}
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 2,
                  color: "#555",
                  marginBottom: 20,
                  fontFamily: "'Press Start 2P', cursive",
                }}
              >
                {selectedProject.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 20,
                  flexWrap: "wrap",
                }}
              >
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: "#4A90E2",
                      color: "white",
                      padding: "5px 10px",
                      fontSize: "10px",
                      border: "2px solid #333",
                      fontFamily: "'Press Start 2P', cursive",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    background: "#2ECC71",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "12px",
                    border: "3px solid #333",
                    fontFamily: "'Press Start 2P', cursive",
                    textDecoration: "none",
                    boxShadow: "3px 3px 0 #333",
                  }}
                >
                  {selectedProject.link}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
