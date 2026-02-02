import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

/*
  SettingsStatus
  Displays the current status of application settings.
 */
const style = {
  notifications: "flex items-center gap-1 text-tt-sm",
};

const SettingsStatus = () => {
  const { getSettingsStatus } = useStatus();
  const [upToDate, setUpToDate] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await getSettingsStatus();
      setUpToDate(status);
    };
    checkStatus();
  }, [getSettingsStatus]);

  if (upToDate === null) {
    return (
      <div className="flex justify-center text-primary animate-pulse text-tt-sm border-b border-t border-border">
        Checking settings status...
      </div>
    );
  }

  return (
    <div className="flex justify-center border-b border-t border-primary">
      {upToDate ? (
        <span className={style.notifications}>
          <span className="text-success">Up-to-date</span>
          <BsCheckCircleFill className="text-success" />
        </span>
      ) : (
        <span className={style.notifications}>
          <IoWarningOutline className="text-primary" />
          <span className="text-destructive">Apply Settings required</span>
        </span>
      )}
    </div>
  );
};

export default SettingsStatus;
