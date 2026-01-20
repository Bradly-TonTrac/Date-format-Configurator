import React from "react";
import { TfiCheckBox } from "react-icons/tfi";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";

const StatusBar = () => {
  return (
    <div className=" border border-border bg-background shadow-lg m-4 rounded p-3 ">
      <div className="">
        <h5 className="text-primary flex items-center font-bold">
          Status
          <GrStatusDisabledSmall className="text-green-500 animate-pulse" />
        </h5>
      </div>

      <h5 className="flex items-center gap-2">
        OS: Windows 11 <TfiCheckBox className="text-green-500" />
      </h5>

      <h3 className="flex items-center">
        Permisions: Standard User
        <MdAdminPanelSettings className="text-orange-500" />
      </h3>
    </div>
  );
};

export default StatusBar;
