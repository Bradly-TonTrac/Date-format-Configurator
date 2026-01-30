import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPoint } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold 2xl:text-tt-base",
  output: "ml-1 font-extralight  2xl:text-tt-base",
};

const CurrentSettings = () => {
  const {
    shortDate,
    longDate,
    lastRead,
    loadCurrentDateSettings,
    checkStatus,
  } = useStatus();

  const [textColor, setTextColor] = useState(false);

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  useEffect(() => {
    const setColors = async () => {
      const resultsColor = await checkStatus();
      setTextColor(resultsColor);
    };
    setColors();
  }, []);

  return (
    <div className="rounded bg-background shadow-lg bg-clip-padding p-3 2xl:p-5">
      <h3 className="flex justify-center border border-primary rounded text-tt-base bg-background-light text-back 2xl:py-1">
        <div className="flex items-center gap-2">
          <IoSettingsOutline className={style} />
          <span className={style.subject}>CURRENT SETTING'S</span>
        </div>
      </h3>

      <div className="bg-background-light p-2 shadow-card rounded mt-1 2xl:p-4 2xl:mt-2">
        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>SHORT DATE :</span>
            <span
              className={`${style.output} ${textColor ? "text-text-light" : "text-destructive"}`}
            >
              {shortDate}
            </span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>LONG DATE :</span>
            <span
              className={`${style.output} ${textColor ? "text-text-light" : "text-destructive"}`}
            >
              {longDate}
            </span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>LAST READ :</span>
            <span
              className={`${style.output} ${textColor ? "text-text-light" : "text-destructive"}`}
            >
              {lastRead}
            </span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default CurrentSettings;
