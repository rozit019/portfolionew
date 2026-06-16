import React from "react";
import NavigateButton from "./NavigateButton";

const socialLinks = [
  {
    id: "instagram",
    icon: "fa-brands fa-instagram",
    color: "#E4405F",
    url: "https://www.instagram.com/aken4m019/",
    label: "Instagram",
  },
  {
    id: "linkedin",
    icon: "fa-brands fa-linkedin-in",
    color: "#0A66C2",
    url: "https://www.linkedin.com/in/rojit-aryal-b0493a3b8/",
    label: "LinkedIn",
  },
  //   {
  //     id: "spotify",
  //     icon: "fa-brands fa-spotify",
  //     color: "#1DB954",
  //     url: "https://open.spotify.com/user/yourusername",
  //     label: "Spotify",
  //   },
  //   {
  //     id: "tiktok",
  //     icon: "fa-brands fa-tiktok",
  //     color: "#000000",
  //     url: "https://tiktok.com/@yourusername",
  //     label: "TikTok",
  //   },
  {
    id: "github",
    icon: "fa-brands fa-github",
    color: "#333333",
    url: "https://github.com/rozit019",
    label: "GitHub",
  },
];

const responsiveStyles = `
  @media (max-width: 768px) {
    .contact-page { padding: 20px 12px !important; }
    .contact-badge { padding: 12px 20px !important; font-size: 12px !important; gap: 12px !important; margin-bottom: 40px !important; }
    .contact-badge img { width: 36px !important; height: 36px !important; border-width: 2px !important; }
    .social-icons { gap: 20px !important; }
    .social-icon { width: 50px !important; height: 50px !important; border-width: 2px !important; }
    .social-icon i { font-size: 22px !important; }
    .contact-info { font-size: 8px !important; margin-top: 24px !important; margin-bottom: 60px !important; }
    .icon-label { display: none !important; }
  }
  @media (max-width: 480px) {
    .contact-page { padding: 16px 8px !important; }
    .contact-badge { padding: 10px 16px !important; font-size: 10px !important; gap: 10px !important; margin-bottom: 30px !important; }
    .contact-badge img { width: 30px !important; height: 30px !important; }
    .social-icons { gap: 14px !important; }
    .social-icon { width: 44px !important; height: 44px !important; border-width: 2px !important; }
    .social-icon i { font-size: 18px !important; }
    .contact-info { font-size: 7px !important; margin-top: 20px !important; margin-bottom: 40px !important; }
  }
`;

const ContactMe = ({ onNavigate }) => {
  return (
    <>
      <style>{responsiveStyles}</style>
      <div
        className="section-page contact-page"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "40px 20px",
          position: "relative",
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
            transform: "translateY(30%)",
          }}
        />

        {/* Content layer above background - moved up with marginTop */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-80px", // Moves content up
          }}
        >
          <NavigateButton onNavigate={() => onNavigate("/")} />

          {/* Profile Badge - BIGGER and CENTERED */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              className: "contact-badge",
              background: "#333",
              color: "white",
              padding: "20px 35px",
              borderRadius: 50,
              marginBottom: 60,
              width: "fit-content",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 16,
              border: "3px solid #555",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
            }}
          >
            <img
              src="/profile.jpg"
              alt="Profile"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                border: "3px solid #fff",
              }}
            />
            <span>rojitaryal</span>
          </div>

          {/* Social Icons - BIGGER with HOVER EFFECTS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
              className: "social-icons",
            }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.id}
                className="social-icon"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "relative",
                  width: 70,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "3px solid #333",
                  transition: "all 0.3s ease",
                  boxShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.15)";
                  e.currentTarget.style.boxShadow = `0 10px 20px ${social.color}40, 5px 5px 0 rgba(0,0,0,0.3)`;
                  e.currentTarget.style.borderColor = social.color;
                  const label = e.currentTarget.querySelector(".icon-label");
                  if (label) label.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "3px 3px 0 rgba(0,0,0,0.2)";
                  e.currentTarget.style.borderColor = "#333";
                  const label = e.currentTarget.querySelector(".icon-label");
                  if (label) label.style.opacity = "0";
                }}
              >
                <i
                  className={social.icon}
                  style={{
                    fontSize: 32,
                    color: social.color,
                    transition: "all 0.3s ease",
                  }}
                />
                <span
                  className="icon-label"
                  style={{
                    position: "absolute",
                    bottom: -30,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 10,
                    fontFamily: "'Press Start 2P', cursive",
                    color: social.color,
                    whiteSpace: "nowrap",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                >
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Extra Contact Info */}
          <div
            style={{
              className: "contact-info",
              marginTop: 40,
              marginBottom: 100,
              textAlign: "center",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 10,
              color: "#666",
              lineHeight: 2,
            }}
          >
            <p>Email: rojitaryal70@gmail.com</p>
            <p style={{ marginTop: 10 }}>Let's build something together!</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactMe;
