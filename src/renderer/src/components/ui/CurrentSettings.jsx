import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPoint } from "react-icons/tb";

const CurrentSettings = () => {
  const { shortDate, longDate, lastRead, loadCurrentDateSettings } =
    useStatus();

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  return (
    <div className="bg-background shadow-lg mb-0 rounded p-2">
      <h3 className="font-extrabold  text-background rounded flex justify-center bg-primary">
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Current Settings
        </div>
      </h3>

      <div className="border border-border mt-1 rounded">
        <h3 className="mt-1">
          <span className="font-extrabold flex items-center">
            <TbPoint />
            Short date:
            <span className="ml-1 font-extralight">{shortDate}</span>
          </span>
        </h3>

        <h3 className="mt-1">
          <div className="font-extrabold flex items-center">
            <TbPoint />
            Long date:
            <span className="ml-2 font-extralight">{longDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="font-extrabold flex items-center">
            <TbPoint />
            Last Read:
            <span className="ml-2 font-extralight">{lastRead}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default CurrentSettings;
