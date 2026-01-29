import { React, useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

const MidStyle = {
  notifications: "flex items-center gap-1 text-tt-sm ",
};

//looking for true or false
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
      <div className="animate-pulse border-b border-t border-border">
        Checking settings Status...
      </div>
    );
  }

  return (
    <div className="flex justify-center border-b border-t border-primary">
      {upToDate ? (
        <span className={MidStyle.notifications}>
          <span className="text-success">Up-to-date</span>
          <BsCheckCircleFill className="text-success" />
        </span>
      ) : (
        <span className={MidStyle.notifications}>
          <IoWarningOutline className="text-primary" />
          <span className="text-destructive">Apply Settings required</span>
        </span>
      )}
    </div>
  );
};

export default SettingsStatus;
