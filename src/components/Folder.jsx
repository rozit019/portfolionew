import React from "react";

const Folder = ({
  label,
  color,
  position,
  scale = 1,
  isHighlighted,
  onClick,
}) => {
  return (
    <div
      className={`folder-container folder-${color} ${isHighlighted ? "folder-highlight" : ""}`}
      style={{
        left: position.x,
        top: position.y,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      onClick={onClick}
    >
      <div className="folder-icon">
        <div className="folder-pages"></div>
      </div>
      <div className="folder-label">{label}</div>
    </div>
  );
};

export default Folder;
