import React, { useState, useEffect } from "react";
import NavigateButton from "./NavigateButton";

const skills = [
  {
    id: "mern",
    name: "MERN Stack",
    icon: "fa-solid fa-layer-group",
    color: "#61DAFB",
    items: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    id: "django",
    name: "Django",
    icon: "fa-brands fa-python",
    color: "#092E20",
    items: ["Learning"],
  },
  {
    id: "graphics",
    name: "Graphics Design",
    icon: "fa-solid fa-palette",
    color: "#FF6B6B",
    items: ["Photoshop", "Illustrator"],
  },
  {
    id: "motion",
    name: "Motion Design",
    icon: "fa-solid fa-film",
    color: "#9B59B6",
    items: ["Premiere Pro"],
  },
];

const certificates = [
  {
    id: 1,
    title: "Graphic Design",
    issuer: "Firefly Engineering",
    image: "/grphics.jpeg",
    fullImage: "/grphics.jpeg",
    date: "2026",
    description:
      "Certificate of Appreciation for successful completion of a 5-month intensive Graphic Design course.",
  },
  {
    id: 2,
    title: "MERN Stack Development",
    issuer: "CodeIT",
    image: "https://via.placeholder.com/300x200/555/fff?text=Certificate+2",
    fullImage:
      "https://via.placeholder.com/800x600/555/fff?text=Full+Certificate+2",
    date: "2024",
    description:
      "Advanced React patterns, hooks, and performance optimization techniques.",
  },
];

// Detect mobile
const isMobileDevice = () => {
  return window.innerWidth < 768;
};

const AboutMe = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (cert) => {
    setSelectedCertificate(cert);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div
      className="section-page"
      style={{
        padding: isMobile ? "20px" : "40px 60px",
        maxWidth: 1100,
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

        {/* Title */}
        <h1
          className="section-title"
          style={{
            fontSize: isMobile ? "20px" : "32px",
            marginBottom: isMobile ? 20 : 40,
            textAlign: "center",
          }}
        >
          About Me
        </h1>

        {/* Description */}
        <div
          className="section-content"
          style={{
            fontSize: isMobile ? "10px" : "14px",
            lineHeight: 2.5,
            color: "#444",
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto 60px",
            padding: isMobile ? "0 10px" : 0,
          }}
        >
          <p>Hi, my name is Rojit Aryal.</p>
          <p>I try to make cool stuff.</p>
          <p style={{ marginTop: 20 }}>
            I am a full-stack developer(currently learning) & designer in
            graphics design, and motion design. I am currently focusing on
            learning backend.
          </p>
        </div>

        {/* Skills Section */}
        <div style={{ marginBottom: isMobile ? 40 : 80 }}>
          <h2
            style={{
              fontSize: isMobile ? "14px" : "20px",
              color: "#333",
              textAlign: "center",
              marginBottom: isMobile ? 20 : 40,
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            SKILLS
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? 15 : 30,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  background: "#fff",
                  border: "3px solid #333",
                  padding: isMobile ? 15 : 25,
                  boxShadow: "4px 4px 0 rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `6px 6px 0 ${skill.color}60`;
                  e.currentTarget.style.borderColor = skill.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "4px 4px 0 rgba(0,0,0,0.2)";
                  e.currentTarget.style.borderColor = "#333";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    marginBottom: 15,
                  }}
                >
                  <i
                    className={skill.icon}
                    style={{
                      fontSize: isMobile ? 20 : 28,
                      color: skill.color,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: isMobile ? "10px" : "14px",
                      color: "#333",
                      fontFamily: "'Press Start 2P', cursive",
                    }}
                  >
                    {skill.name}
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        background: skill.color + "20",
                        color: skill.color,
                        padding: "5px 10px",
                        fontSize: isMobile ? "8px" : "10px",
                        border: `2px solid ${skill.color}`,
                        fontFamily: "'Press Start 2P', cursive",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <h2
            style={{
              fontSize: isMobile ? "14px" : "20px",
              color: "#333",
              textAlign: "center",
              marginBottom: isMobile ? 20 : 40,
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            CERTIFICATES
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? 15 : 30,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => openModal(cert)}
                style={{
                  background: "#fff",
                  border: "3px solid #333",
                  overflow: "hidden",
                  boxShadow: "4px 4px 0 rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "6px 6px 0 rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "4px 4px 0 rgba(0,0,0,0.2)";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: isMobile ? 150 : 200,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      imageRendering: "pixelated",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                </div>
                <div style={{ padding: isMobile ? 12 : 20 }}>
                  <h3
                    style={{
                      fontSize: isMobile ? "10px" : "12px",
                      color: "#333",
                      marginBottom: 10,
                      fontFamily: "'Press Start 2P', cursive",
                      lineHeight: 1.8,
                    }}
                  >
                    {cert.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: isMobile ? "8px" : "10px",
                      color: "#666",
                      fontFamily: "'Press Start 2P', cursive",
                    }}
                  >
                    <span>{cert.issuer}</span>
                    <span style={{ color: "#4A90E2" }}>{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {selectedCertificate && (
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
            padding: isMobile ? 10 : 20,
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
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
                fontSize: isMobile ? "10px" : "12px",
                padding: "8px 12px",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "4px 4px 0 rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "2px 2px 0 rgba(0,0,0,0.3)";
              }}
            >
              ✕
            </button>

            <div
              style={{
                width: "100%",
                maxHeight: isMobile ? 300 : 500,
                overflow: "hidden",
                borderBottom: "4px solid #333",
                background: "#fff",
              }}
            >
              <img
                src={selectedCertificate.fullImage || selectedCertificate.image}
                alt={selectedCertificate.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  imageRendering: "pixelated",
                }}
              />
            </div>

            <div style={{ padding: isMobile ? 15 : 30 }}>
              <h2
                style={{
                  fontSize: isMobile ? "14px" : "20px",
                  color: "#333",
                  marginBottom: 15,
                  fontFamily: "'Press Start 2P', cursive",
                  lineHeight: 1.5,
                }}
              >
                {selectedCertificate.title}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "10px" : "12px",
                  lineHeight: 2,
                  color: "#555",
                  marginBottom: 20,
                  fontFamily: "'Press Start 2P', cursive",
                }}
              >
                {selectedCertificate.description}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: isMobile ? "10px 15px" : "15px 20px",
                  background: "#fff",
                  border: "3px solid #333",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: isMobile ? "8px" : "10px",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <span style={{ color: "#666" }}>
                  Issued by:{" "}
                  <strong style={{ color: "#333" }}>
                    {selectedCertificate.issuer}
                  </strong>
                </span>
                <span style={{ color: "#4A90E2" }}>
                  {selectedCertificate.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
