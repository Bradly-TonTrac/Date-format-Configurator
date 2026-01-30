import React from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

/*
 InfoFooter
 Displays an informational message about app restart/logoff requirements.
 */
const InfoFooter = () => {
  return (
    <div>
      {/* Footer info section with icon */}
      <h4 className="border-t border-b border-border bg-primary rounded mt-1 ml-4 mr-4">
        <div className="flex items-center justify-center text-text-secondary bg-background">
          <IoInformationCircleSharp className="text-cyan-400" />
          Some apps require restart/logoff to apply.
        </div>
      </h4>
    </div>
  );
};

export default InfoFooter;
