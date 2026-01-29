import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { TbSettingsCheck } from "react-icons/tb";
import { TbPoint } from "react-icons/tb";

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
    <div className="rounded bg-background shadow-lg bg-clip-padding p-3">
      <h3 className="flex justify-center border border-primary rounded text-tt-base bg-background-light text-back">
        <div className="flex items-center gap-2">
          <TbSettingsCheck />
          Desired Settings
        </div>
      </h3>

      <div className="border border-border rounded mt-1">
        <h3 className="mt-1">
          <div className="font-extrabold flex items-center">
            <TbPoint />
            Short date:
            <span className="ml-2 font-extralight">{desiredShortDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="font-extrabold flex items-center">
            <TbPoint />
            Long date:
            <span className="ml-2 font-extralight">{desiredLongDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="font-extrabold flex items-center">
            <TbPoint />
            Preview (short):
            <span className="ml-2 font-extralight">{shortPrev}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="font-extrabold flex items-center">
            <TbPoint />
            Preview (long):
            <span className="ml-2 font-extralight">{longPrev}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default DesiredSettings;
