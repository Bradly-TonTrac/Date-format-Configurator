import React from "react";

/*
  Reusable Button Component for window actions
  Prevents dragging in Electron apps via WebkitAppRegion
 */
const WindowButton = ({ children, label, onClick, className, disabled }) => {
  return (
    <button
      aria-label={label} // Accessibility: screen readers
      onClick={onClick} // Click handler
      className={className} // Styling via Tailwind or passed class
      disabled={disabled} // Disable button when needed
      style={{ WebkitAppRegion: "no-drag" }} // Prevent drag over window title bar
    >
      {children}
    </button>
  );
};

export default WindowButton;
