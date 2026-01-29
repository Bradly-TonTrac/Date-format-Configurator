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
          <IoSettingsOutline className={style} />
          <span className={style.subject}>CURRENT SETTING'S</span>
        </div>
      </h3>

      <div className="bg-background-light p-2 shadow-card rounded mt-1">
        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>SHORT DATE :</span>
            <span className={style.output}>{shortDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>LONG DATE :</span>
            <span className={style.output}>{longDate}</span>
          </div>
        </h3>

        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>LAST READ :</span>
            <span className={style.output}>{lastRead}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default CurrentSettings;
