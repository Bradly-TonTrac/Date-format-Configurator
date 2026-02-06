import React, { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import SettingsPanel from "../ui/SettingsPanel";

const DesiredSettings = () => {
  const {
    desiredShortDate,
    desiredLongDate,
    shortPrev,
    longPrev,
    loadDesiredSettings,
    checkStatus,
  } = useStatus();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    loadDesiredSettings();
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
      title="DESIRED SETTINGS"
      iconType="desired"
      shortDate={desiredShortDate}
      longDate={desiredLongDate}
      shortPrev={shortPrev}
      longPrev={longPrev}
      status={status}
    />
  );
};

export default DesiredSettings;
