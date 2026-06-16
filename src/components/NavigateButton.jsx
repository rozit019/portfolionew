import React from "react";

const NavigateButton = ({ onNavigate }) => {
  return (
    <button className="navigate-btn" onClick={onNavigate}>
      Back
    </button>
  );
};

export default NavigateButton;
