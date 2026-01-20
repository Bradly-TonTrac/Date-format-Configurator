import React from "react";

const WindowButton = ({ children, label, onClick, className }) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={className}
      style={{ WebkitAppRegion: "no-drag" }}
    >
      {children}
    </button>
  );
};

export default WindowButton;
