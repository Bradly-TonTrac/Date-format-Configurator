import React, { useEffect } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { useStatus } from "../../hooks/useSettings";
import { RiWindowsFill } from "react-icons/ri";
//import { TbLockAccess } from "react-icons/tb";
import { SiStatuspal } from "react-icons/si";
import { IoIosWarning } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";
import { SiSpringsecurity } from "react-icons/si";

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
        <h5 className="flex items-center gap-1 text-tt-base">
          <SiStatuspal
            className={isAdmin ? "text-success" : "text-destructive"}
          />
          Status
          <GrStatusGoodSmall
            className={isAdmin ? "text-success" : "text-destructive"}
          />
        </h5>
      </div>

      <div className="border rounded p-2 mt-1 ">
        <h5 className="flex items-center gap-2">
          <div className="text-tt-base flex items-center gap-1">
            <RiWindowsFill /> OS :
          </div>
          <span className="text-text-light">
            {osInfo?.operatingSystemVersion || ""}
            {isWindows && <IoMdDoneAll className="text-success ml-2" />}
          </span>
          <span className="text-success">(Supported)</span>
        </h5>

        <h3 className="flex items-center gap-1">
          <SiSpringsecurity />
          <span className="font-semibold">PERMISSION :</span>

          <span className="text-tt flex items-center gap-1 text-text-light ">
            {isAdmin ? (
              <span className="flex items-center gap-1 translate+y">
                Administrator
                <span className=" text-sm text-success">
                  <GiCheckMark />
                </span>
              </span>
            ) : (
              <span className=" flex items-center gap-1 ">
                Standard User
                <IoIosWarning className="text-primary" />
              </span>
            )}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default StatusBar;
