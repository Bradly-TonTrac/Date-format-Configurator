import React, { useEffect } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { useStatus } from "../../hooks/useSettings";
import { RiWindowsFill } from "react-icons/ri";
import { TbLockAccess } from "react-icons/tb";
import { SiStatuspal } from "react-icons/si";
import { IoIosWarning } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";

const StatusBar = () => {
  const { isAdmin, osInfo, loadAdminStatus, getOSInfo } = useStatus();

  useEffect(() => {
    loadAdminStatus();
    getOSInfo();
  }, []);

  // Check if OS is Windows
  const isWindows = osInfo?.operatingSystemName
    ?.toLowerCase()
    .includes("windows");

  return (
    <div className="bg-background rounded shadow-lg  p-2">
      <div className="flex justify-center border border-primary rounded bg-background-light text-text">
        <h5 className="flex items-center gap-1 font-bold">
          <SiStatuspal />
          Status
          <GrStatusGoodSmall
            className={isAdmin ? "text-green-500" : "text-red-500"}
          />
        </h5>
      </div>

      <div className="border pl-1 rounded mt-1">
        <h5 className="flex items-center gap-2">
          <div className="font-extrabold flex items-center gap-1">
            <RiWindowsFill /> OS:
          </div>
          {osInfo?.operatingSystemVersion || ""}
          {isWindows && <IoMdDoneAll className="text-green-500 ml-2" />}
        </h5>

        <h3 className="flex items-center gap-1">
          <TbLockAccess />
          <span className="text-tt-base">Permissions:</span>

          <div className="text-tt ">
            {isAdmin ? (
              <div>
                Administrator
                <MdAdminPanelSettings className="text-primary" />
                {/* Optional extra info for admins */}
                <span className="ml-1 text-sm text-green-500">
                  <GiCheckMark />
                </span>
              </div>
            ) : (
              <span className=" flex items-center">
                Standard User
                <IoIosWarning className="text-primary" />
              </span>
            )}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default StatusBar;
