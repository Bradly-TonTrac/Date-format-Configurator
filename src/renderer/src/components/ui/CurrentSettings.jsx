import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";

const CurrentSettings = () => {
  const { shortDate, longDate, lastRead, loadCurrentDateSettings } =
    useStatus();

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  return (
    <div className="bg-background shadow-lg mb-3 rounded p-2">
      <h3 className="font-extrabold border border-border text-background rounded flex justify-center bg-primary">
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Current Settings
        </div>
      </h3>

      <h3 className="mt-1">
        <span className="font-extrabold">Short date:</span>
        <span className="ml-1">{shortDate}</span>
      </h3>
      <h3 className="mt-1">
        <span className="font-extrabold">Long date:</span>
        <span className="ml-2">{longDate}</span>
      </h3>
      <h3 className="mt-1">
        <span className="font-extrabold">Last Read:</span>
        <span className="ml-2">{lastRead}</span>
      </h3>
    </div>
  );
};

export default CurrentSettings;
