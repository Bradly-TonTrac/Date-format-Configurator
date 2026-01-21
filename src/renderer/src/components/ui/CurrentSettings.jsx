import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";

const CurrentSettings = () => {
  const { shortDate, longDate, lastRead, loadCurrentDateSettings } =
    useStatus();

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  return (
    <div className=" border-border bg-background shadow-lg m-4 rounded p-3 cut-corners">
      <h3 className="text-center font-extrabold">Current Settings</h3>
      <h3>Short date:{shortDate}</h3>
      <h3>Long date: {longDate}</h3>
      <h3>Last Read: {lastRead}</h3>
    </div>
  );
};

export default CurrentSettings;
