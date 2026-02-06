import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import SettingsPanel from "../ui/SettingsPanel";

const CurrentSettings = () => {
  const {
    shortDate,
    longDate,
    lastRead,
    loadCurrentDateSettings,
    checkStatus,
  } = useStatus();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await checkStatus();
      setStatus(result);
    };
    fetchStatus();
  }, []);

  return (
    <SettingsPanel
      title="CURRENT SETTINGS"
      iconType="current"
      shortDate={shortDate}
      longDate={longDate}
      lastRead={lastRead}
      status={status}
    />
  );
};

export default CurrentSettings;
