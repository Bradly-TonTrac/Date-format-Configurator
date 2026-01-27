import React from "react";

//Reusable Button Component
const WindowButton = ({ children, label, onClick, className, disabled }) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={className}
      disabled={disabled}
      style={{ WebkitAppRegion: "no-drag" }}
    >
      {children}
    </button>
  );
};

export default WindowButton;
