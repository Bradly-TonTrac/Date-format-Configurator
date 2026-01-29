import React, { useEffect } from "react";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";
//import { BsFolderCheck } from "react-icons/bs";

const Style = {
  buttons:
    "text-tt-sm text-primary hover:bg-background-light box-border pt-1 pb-1 px-4 rounded border border-primary text-center w-[180px]",
};

const ActionButtons = () => {
  const {
    isAdmin,
    applySettings,
    restoreSettings,
    isLoading,
    loadingAction,
    reloadApp,
    //hasApplied, ***To be removed
    getSettingsStatus,
  } = useStatus();

  useEffect(() => {
    getSettingsStatus();
  }, []);

  const handleApply = async () => {
    try {
      await applySettings();
      await reloadApp();
      console.log("Apply Settings Test Passed"); // temporarily for the building processes
    } catch (error) {
      console.log("Cant Apply Settings"); // temporarily for the building processes
    }
  };

  const handleRestoreSettings = async () => {
    try {
      await restoreSettings();
      await reloadApp();
      console.log("Restore settings test passed"); // temporarily for the building processes
    } catch (error) {
      console.log("Failed to restore settings"); // temporarily for the building processes
    }
  };

  return (
    <div className="flex justify-center gap-3 text-background">
      <WindowButton
        label="Apply Settings"
        onClick={handleApply}
        disabled={isLoading || !isAdmin} // disabled if not admin
        className={`${Style.buttons} ${
          isLoading || !isAdmin ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loadingAction === "apply" ? "Applying.." : "Apply"}
      </WindowButton>

      <WindowButton
        label="Restore"
        onClick={handleRestoreSettings}
        disabled={isLoading || !isAdmin} // disabled if not admin
        className={`${Style.buttons} ${
          isLoading || !isAdmin ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loadingAction === "restore" ? "Restoring..." : "Restore Previous"}
      </WindowButton>
    </div>
  );
};

export default ActionButtons;
