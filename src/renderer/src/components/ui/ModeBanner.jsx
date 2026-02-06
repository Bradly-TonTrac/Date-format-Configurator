import React from "react";
import { IoWarning } from "react-icons/io5";

const ModeBanner = () => (
  <div className="flex items-center justify-center gap-2 border-b border-primary p-2 2xl:p-3">
    <IoWarning className="text-primary animate-bounce" />
    <h2 className="text-tt-xs animate-pulse 2xl:text-tt-sm">
      Administrator privileges required │ Right-click the app → Run as
      administrator
    </h2>
  </div>
);

export default ModeBanner;
