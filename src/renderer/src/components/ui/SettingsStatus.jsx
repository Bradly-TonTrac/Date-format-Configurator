import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

/*
  SettingsStatus
  Displays the current status of application settings.
  Shows a loading indicator while checking, then displays either:
  - "Up-to-date" with a green check icon
  - "Apply Settings required" with a warning icon
 */
const MidStyle = {
  notifications: "flex items-center gap-1 text-tt-sm",
};

const SettingsStatus = () => {
  const { getSettingsStatus } = useStatus();
  const [upToDate, setUpToDate] = useState(null); // null indicates loading state

  // Fetch settings status on mount
  useEffect(() => {
    const checkStatus = async () => {
      const status = await getSettingsStatus();
      setUpToDate(status);
    };
    checkStatus();
  }, [getSettingsStatus]);

  // Loading state while status is being fetched
  if (upToDate === null) {
    return (
      <div className="flex justify-center text-primary animate-pulse text-tt-sm border-b border-t border-border">
        Checking settings status...
      </div>
    );
  }

  // Display the status once loaded
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
