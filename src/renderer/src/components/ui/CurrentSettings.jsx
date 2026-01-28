import React, { useEffect } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPoint } from "react-icons/tb";

//An Object of styles
const styles = {
  dateSpan: "ml-2 font-extralight",
  labelResults: "font-extrabold flex items-center",
  textMargins: "mt-1",
};

const CurrentSettings = () => {
  const { shortDate, longDate, lastRead, loadCurrentDateSettings } =
    useStatus();

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  return (
    <div className="bg-background shadow-lg mb-0 rounded p-2">
      <h3 className="font-extrabold  text-background rounded flex justify-center bg-primary">
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Current Settings
        </div>
      </h3>

      <div className="border border-border mt-1 rounded">
        <h3 className={styles.textMargins}>
          <div className={styles.labelResults}>
            <TbPoint />
            Short date:
            <span className={styles.dateSpan}>{shortDate}</span>
          </div>
        </h3>

        <h3 className={styles.textMargins}>
          <div className={styles.labelResults}>
            <TbPoint />
            Long date:
            <span className={styles.dateSpan}>{longDate}</span>
          </div>
        </h3>

        <h3 className={styles.textMargins}>
          <div className={styles.labelResults}>
            <TbPoint />
            Last Read:
            <span className={styles.dateSpan}>{lastRead}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default CurrentSettings;
