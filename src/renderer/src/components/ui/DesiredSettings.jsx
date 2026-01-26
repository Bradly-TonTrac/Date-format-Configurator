import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { TbSettingsCheck } from "react-icons/tb";

const DesiredSettings = () => {
  const {
    loadDesiredSettings,
    desiredShortDate,
    desiredLongDate,
    shortPrev,
    longPrev,
  } = useStatus();

  useEffect(() => {
    loadDesiredSettings();
  }, []);

  return (
    <div className=" rounded bg-background shadow-lg mb-2 bg-clip-padding p-3  ">
      <h3 className="flex justify-center border border-border rounded font-extrabold bg-primary text-border">
        <div className="flex items-center gap-2">
          <TbSettingsCheck />
          Desired Settings
        </div>
      </h3>
      <h3>
        <span className="font-extrabold"> Short date: </span>
        {desiredShortDate}
      </h3>
      <h3>
        <span className="font-extrabold"> Long date: </span>
        {desiredLongDate}
      </h3>
      <h3>
        <span className="font-extrabold"> Preview (short): </span>
        {shortPrev}
      </h3>
      <h3>
        <span className="font-extrabold"> Preview (long): </span>
        {longPrev}
      </h3>
    </div>
  );
};

export default DesiredSettings;
