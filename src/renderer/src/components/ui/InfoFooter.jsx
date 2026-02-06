import React from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

const InfoFooter = () => (
  <div className="mt-1 mx-4 rounded border-t border-b border-border bg-primary">
    <div className="flex items-center justify-center gap-2 p-2 text-text-secondary bg-background">
      <IoInformationCircleSharp className="text-cyan-400" />
      Some apps require restart/logoff to apply.
    </div>
  </div>
);

export default InfoFooter;
