import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { TbSettingsCheck } from "react-icons/tb";
import { TbPoint } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold",
  output: "ml-1 font-extralight text-text-light",
};

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
          <span className={style.subject}>Desired Settings</span>
        </div>
      </h3>

      <div className="border border-border rounded mt-1">
        <h3 className="mt-1">
          <div className=" flex items-center">
            <TbPoint />
            <span className={style.subject}>Short date:</span>

            <span className={style.output}>{desiredShortDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className=" flex items-center">
            <TbPoint />

            <span className={style.subject}>Long date:</span>

            <span className={style.output}>{desiredLongDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className=" flex items-center">
            <TbPoint />
            <span className={style.subject}>Preview (short):</span>

            <span className={style.output}>{shortPrev}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className=" flex items-center">
            <TbPoint />

            <span className={style.subject}>Preview (long):</span>

            <span className={style.output}>{longPrev}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default DesiredSettings;
