import React from "react";
import { TfiCheckBox } from "react-icons/tfi";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { GrStatusGoodSmall } from "react-icons/gr";

import { MdAdminPanelSettings } from "react-icons/md";
import { useStatus } from "../../hooks/useSettings";
import { useEffect } from "react";
import { RiWindowsFill } from "react-icons/ri";
import { TbLockAccess } from "react-icons/tb";
import { SiStatuspal } from "react-icons/si";

const StatusBar = () => {
  const { isAdmin, osInfo, loadAdminStatus, loadosInfomation } = useStatus();

  useEffect(() => {
    loadAdminStatus();
    loadosInfomation();
  }, []);

  return (
    <div className=" bg-background  rounded shadow-lg mb-2  p-2 ">
      <div className=" flex justify-center border  rounded text">
        <h5 className=" flex items-center gap-1 font-bold ">
          <SiStatuspal />
          Status
          <GrStatusGoodSmall
            className={isAdmin ? "text-green-500 " : "text-red-500 "}
          />
        </h5>
      </div>

      <h5 className="flex items-center gap-2 ">
        <span className="font-extrabold">
          <div className="flex items-center gap-1">
            <RiWindowsFill />
            OS:
          </div>
        </span>
        {osInfo?.operatingSystemVersion || ""}
      </h5>

      <h3 className="flex items-center">
        <div className="flex items-center gap-1">
          <TbLockAccess />
          <span className="font-extrabold">Permisions: </span>
        </div>
        {isAdmin ? "Administartor" : "Standard User"}
        <MdAdminPanelSettings className="text-primary" />
      </h3>
    </div>
  );
};

export default StatusBar;
