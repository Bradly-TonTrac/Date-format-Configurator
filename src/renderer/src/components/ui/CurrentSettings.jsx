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
    <div className=" bg-background shadow-lg m-4 rounded p-2">
      <h3 className="font-extrabold flex justify-center ">
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Current Settings
        </div>
      </h3>
      <h3>Short date:{shortDate}</h3>
      <h3>Long date: {longDate}</h3>
      <h3>Last Read: {lastRead}</h3>
    </div>
  );
};

export default CurrentSettings;
