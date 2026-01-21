import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";

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
    <div className="  border-border bg-background shadow-lg m-4 bg-clip-padding p-3 cut-corners ">
      <h3  className="text-center font-extrabold">Desired Settings</h3>
      <h3> Short date:{desiredShortDate} </h3>
      <h3>Long date:{desiredLongDate}</h3>
      <h3>Preview (short): {shortPrev} </h3>
      <h3> Preview (long): {longPrev}</h3>
    </div>
  );
};

export default DesiredSettings;
