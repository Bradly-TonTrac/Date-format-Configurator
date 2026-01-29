import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPoint } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold",
  output: "ml-1 font-extralight text-text-light",
};

const CurrentSettings = () => {
  const { shortDate, longDate, lastRead, loadCurrentDateSettings } =
    useStatus();

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  return (
    <div className="rounded bg-background shadow-lg bg-clip-padding p-3">
      <h3 className="flex justify-center border border-primary rounded text-tt-base bg-background-light text-back">
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Current Settings
        </div>
      </h3>

      <div className="border border-border rounded mt-1">
        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>Short date:</span>
            <span className={style.output}>{shortDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>Long date:</span>
            <span className={style.output}>{longDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>Last Read:</span>
            <span className={style.output}>{lastRead}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default CurrentSettings;
