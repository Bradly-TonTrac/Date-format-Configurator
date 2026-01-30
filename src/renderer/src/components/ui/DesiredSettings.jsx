import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { TbSettingsCheck } from "react-icons/tb";
import { TbPoint } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold 2xl:text-tt-base",
  output: "ml-1 font-extralight text-text-light 2xl:text-tt-base",
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
    <div className="rounded shadow-lg bg-clip-padding p-3 2xl:p-5">
      <h3 className="flex justify-center border border-primary rounded text-tt-base text-back 2xl:py-1">
        <div className="flex items-center gap-2">
          <TbSettingsCheck />
          <span className={style.subject}>DESIRED SETTINGS</span>
        </div>
      </h3>

      <div className="p-2 bg-background-light rounded mt-1 2xl:p-4 2xl:mt-2">
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

            <span className={style.subject}>LONG DATE :</span>

            <span className={style.output}>{desiredLongDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className=" flex items-center">
            <TbPoint />
            <span className={style.subject}>PREVIEW (short) :</span>

            <span className={style.output}>{shortPrev}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className=" flex items-center">
            <TbPoint />

            <span className={style.subject}>PREVIEW (long) :</span>

            <span className={style.output}>{longPrev}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default DesiredSettings;
