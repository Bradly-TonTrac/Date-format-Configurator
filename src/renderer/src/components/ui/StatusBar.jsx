import React from "react";
import { TfiCheckBox } from "react-icons/tfi";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { useStatus } from "../../hooks/useSettings";
import { useEffect } from "react";

const StatusBar = () => {
  const { isAdmin, osInfo, loadAdminStatus, loadosInfomation } = useStatus();

  useEffect(() => {
    loadAdminStatus();
    loadosInfomation();
  }, []);

  return (
    <div className=" border border-border bg-background shadow-lg m-4 rounded p-3 ">
      <div className="">
        <h5 className=" flex items-center gap-1 font-bold">
          Status
          <GrStatusDisabledSmall
            className={
              isAdmin
                ? "text-green-500 animate-pulse"
                : "text-red-500 animate-pulse"
            }
          />
        </h5>
      </div>

      <h5 className="flex items-center gap-2">
        <span className="font-extrabold"> OS:</span>
        {osInfo?.operatingSystemVersion || ""}{" "}
      </h5>

      <h3 className="flex items-center">
        <span className="font-extrabold"> Permisions : </span>
        {isAdmin ? "Administartor" : "Standard User"}
        <MdAdminPanelSettings className="text-orange-500" />
      </h3>
    </div>
  );
};

export default StatusBar;
