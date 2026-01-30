import React, { useEffect } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
//import { MdAdminPanelSettings } from "react-icons/md";
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
    <div className="bg-background rounded shadow-lg p-2 2xl:p-4">
      <div className="flex justify-center border border-primary rounded bg-background-light text-text 2xl:py-1">
        <h5 className="flex items-center gap-1 text-tt-base 2xl:text-tt-lg">
          <SiStatuspal
            className={isAdmin ? "text-success" : "text-destructive"}
          />
          <span className="text-tt-sm font-semibold 2xl:text-tt-base">STATUS</span>

          <GrStatusGoodSmall
            className={
              isAdmin
                ? "text-success text-tt-xs"
                : "text-destructive text-tt-xs "
            }
          />
        </h5>
      </div>

      <div className="bg-background-light shadow-card rounded p-2 mt-1 2xl:p-4 2xl:mt-2 ">
        <h5 className="flex items-center gap-1">
          <div className="text-tt-base flex items-center gap-1 2xl:text-tt-lg">
            <RiWindowsFill />
            <span className="text-tt-sm font-semibold 2xl:text-tt-base"> OS :</span>
          </div>
          <span className="font-extralight text-text-light 2xl:text-tt-base">
            {osInfo?.operatingSystemVersion || ""}
            {isWindows && <IoMdDoneAll className="text-success ml-1" />}
          </span>
          <span className="text-success">(Supported)</span>
        </h5>

        <h3 className="flex items-center gap-1 2xl:text-tt-base">
          <SiSpringsecurity />
          <span className="font-semibold">
            <span className="text-tt-sm font-semibold 2xl:text-tt-base"> PERMISSION'S :</span>
          </span>

          <span className="text-tt flex items-center gap-1 text-text-light ">
            {isAdmin ? (
              <span className="font-extralight text-text-light flex items-center gap-1 translate+y">
                Administrator
                <span className=" text-sm text-success">
                  <GiCheckMark />
                </span>
              </span>
            ) : (
              <span className="font-extralight text-text-light flex items-center gap-1 ">
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
