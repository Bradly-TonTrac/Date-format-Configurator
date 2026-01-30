import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { TbSettingsCheck, TbPoint } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold 2xl:text-tt-base",
  output: "ml-1 font-extralight 2xl:text-tt-base",
};

const DesiredSettings = () => {
  const {
    loadDesiredSettings,
    desiredShortDate,
    desiredLongDate,
    shortPrev,
    longPrev,
    checkStatus,
  } = useStatus();

  // Track whether the settings have been applied or not
  const [status, setStatus] = useState(false);

  // Load desired settings on component mount
  useEffect(() => {
    loadDesiredSettings();
  }, [loadDesiredSettings]);

  // Check if settings are applied and update status for text color
  useEffect(() => {
    const fetchStatus = async () => {
      const result = await checkStatus();
      setStatus(result);
    };
    fetchStatus();
  }, [checkStatus]);

  return (
    <div className="rounded shadow-lg bg-clip-padding p-3 2xl:p-5">
      {/* Header */}
      <h3 className="flex justify-center border border-primary rounded text-tt-base text-back 2xl:py-1">
        <div className="flex items-center gap-2">
          <TbSettingsCheck />
          <span className={style.subject}>DESIRED SETTINGS</span>
        </div>
      </h3>

      {/* Desired Settings Details */}
      <div className="p-2 bg-background-light rounded mt-1 2xl:p-4 2xl:mt-2">
        {/* Short Date */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>SHORT DATE:</span>
          <span
            className={`${style.output} ${
              status ? "text-text-light" : "text-destructive"
            }`}
          >
            {desiredShortDate}
          </span>
        </div>

        {/* Long Date */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>LONG DATE :</span>
          <span
            className={`${style.output} ${
              status ? "text-text-light" : "text-destructive"
            }`}
          >
            {desiredLongDate}
          </span>
        </div>

        {/* Preview Short Date */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>PREVIEW (short) :</span>
          <span
            className={`${style.output} ${
              status ? "text-text-light" : "text-destructive"
            }`}
          >
            {shortPrev}
          </span>
        </div>

        {/* Preview Long Date */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>PREVIEW (long) :</span>
          <span
            className={`${style.output} ${
              status ? "text-text-light" : "text-destructive"
            }`}
          >
            {longPrev}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesiredSettings;
