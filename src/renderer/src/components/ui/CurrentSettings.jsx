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
    <div className=" bg-background shadow-lg mb-3 rounded p-2">
      <h3 className="font-extrabold border border-border text-border rounded flex justify-center bg-primary ">
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Current Settings
        </div>
      </h3>
      <h3>
        <span className="font-extrabold">Short date: </span>
        {shortDate}
      </h3>
      <h3>
        <span className="font-extrabold">Long date:</span>
        {longDate}
      </h3>
      <h3>
        <span className="font-extrabold"> Last Read:</span>
        {lastRead}
      </h3>
    </div>
  );
};

export default CurrentSettings;
