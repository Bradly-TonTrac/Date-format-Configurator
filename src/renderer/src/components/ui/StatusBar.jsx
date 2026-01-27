import React, { useEffect } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { useStatus } from "../../hooks/useSettings";
import { RiWindowsFill } from "react-icons/ri";
import { TbLockAccess } from "react-icons/tb";
import { SiStatuspal } from "react-icons/si";

const StatusBar = () => {
  const { isAdmin, osInfo, loadAdminStatus, loadosInfomation } = useStatus();

  useEffect(() => {
    loadAdminStatus();
    loadosInfomation();
  }, []);

  // Check if OS is Windows
  const isWindows = osInfo?.operatingSystemName
    ?.toLowerCase()
    .includes("windows");

  return (
    <div className="bg-background rounded shadow-lg  p-2">
      <div className="flex justify-center border border-border rounded bg-primary text-background">
        <h5 className="flex items-center gap-1 font-bold">
          <SiStatuspal />
          Status
          <GrStatusGoodSmall
            className={isAdmin ? "text-green-500" : "text-red-500"}
          />
        </h5>
      </div>

      <div className="border rounded mt-1">
        <h5 className="flex items-center gap-2">
          <span className="font-extrabold flex items-center gap-1">
            <RiWindowsFill /> OS:
          </span>
          {osInfo?.operatingSystemVersion || ""}
          {isWindows && <IoMdDoneAll className="text-green-500 ml-2" />}
        </h5>

        <h3 className="flex items-center gap-2">
          <TbLockAccess />
          <span className="font-extrabold">Permissions:</span>
          {isAdmin ? (
            <>
              Administrator
              <MdAdminPanelSettings className="text-primary" />
              {/* Optional extra info for admins */}
              <span className="ml-2 text-sm text-green-500">(Full Access)</span>
            </>
          ) : (
            "Standard User"
          )}
        </h3>
      </div>
    </div>
  );
};

export default StatusBar;
