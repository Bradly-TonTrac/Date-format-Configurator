import React from "react";
import { IoWarning } from "react-icons/io5";

/*
 ModeBanner
 Displays a banner warning that administrator privileges are required.
 */
const ModeBanner = () => {
  return (
    <div className="flex items-center gap-2 justify-center border-b border-primary">
      <IoWarning className="text-primary animate-bounce" />
      <h2 className="text text-tt-xs animate-pulse">
        Administrator privileges required │ Right-click the app → Run as
        administrator
      </h2>
    </div>
  );
};

export default ModeBanner;
