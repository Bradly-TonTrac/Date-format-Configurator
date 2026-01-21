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
    <div className=" bg-background shadow-lg m-4 bg-clip-padding p-3 cut-corners ">
      <h3 className="flex justify-center font-extrabold">
        <div className="flex items-center gap-2">
          <TbSettingsCheck />
          Desired Settings
        </div>
      </h3>
      <h3> Short date:{desiredShortDate} </h3>
      <h3>Long date:{desiredLongDate}</h3>
      <h3>Preview (short): {shortPrev} </h3>
      <h3> Preview (long): {longPrev}</h3>
    </div>
  );
};

export default DesiredSettings;
