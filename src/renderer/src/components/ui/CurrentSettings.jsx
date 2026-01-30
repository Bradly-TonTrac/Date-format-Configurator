import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPoint } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold 2xl:text-tt-base",
  output: "ml-1 font-extralight 2xl:text-tt-base",
};

const CurrentSettings = () => {
  const {
    shortDate,
    longDate,
    lastRead,
    loadCurrentDateSettings,
    checkStatus,
  } = useStatus();

  // Determines the text color for settings (green if applied, red if not)
  const [textColor, setTextColor] = useState(false);

  // Load current date settings when component mounts
  useEffect(() => {
    loadCurrentDateSettings();
  }, [loadCurrentDateSettings]);

  // Check if settings have been applied and set the text color accordingly
  useEffect(() => {
    const setColors = async () => {
      const isApplied = await checkStatus();
      setTextColor(isApplied);
    };
    setColors();
  }, [checkStatus]);

  return (
    <div className="rounded bg-background shadow-lg bg-clip-padding p-3 2xl:p-5">
      {/* Header */}
      <h3 className="flex justify-center border border-primary rounded text-tt-base bg-background-light text-back 2xl:py-1">
        <div className="flex items-center gap-2">
          <IoSettingsOutline className={style} />
          <span className={style.subject}>CURRENT SETTING'S</span>
        </div>
      </h3>

      {/* Settings Details */}
      <div className="bg-background-light p-2 shadow-card rounded mt-1 2xl:p-4 2xl:mt-2">
        {/* Short Date */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>SHORT DATE :</span>
          <span
            className={`${style.output} ${
              textColor ? "text-text-light" : "text-destructive"
            }`}
          >
            {shortDate}
          </span>
        </div>

        {/* Long Date */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>LONG DATE :</span>
          <span
            className={`${style.output} ${
              textColor ? "text-text-light" : "text-destructive"
            }`}
          >
            {longDate}
          </span>
        </div>

        {/* Last Read */}
        <div className="flex items-center mt-1">
          <TbPoint />
          <span className={style.subject}>LAST READ :</span>
          <span
            className={`${style.output} ${
              textColor ? "text-text-light" : "text-destructive"
            }`}
          >
            {lastRead}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentSettings;
