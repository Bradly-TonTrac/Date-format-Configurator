import React from "react";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";
import { BsFolderCheck } from "react-icons/bs";

const Style = {
  buttons:
    " font-extrabold hover:bg-background pt-1 pb-1 p-2 pl-12 pr-12 rounded text-text border border-primary",
};

const ActionButtons = () => {
  const {
    isAdmin,
    applySettings,
    restoreSettings,
    getDiagnostics,
    isLoading,
    loadingAction,
    hasApplied,
    isCopied,
  } = useStatus();

  const handleApply = async () => {
    try {
      await applySettings();
      console.log("Apply Settings Test Passed"); // temporarily for the building processes
    } catch (error) {
      console.log("Cant Apply Settings"); // temporarily for the building processes
    }
  };

  const handleRestoreSettings = async () => {
    try {
      await restoreSettings();
      console.log("Restore settings test passed"); // temporarily for the building processes
    } catch (error) {
      console.log("Failed to restore settings"); // temporarily for the building processes
    }
  };

  const handleGetDiagnostics = async () => {
    try {
      await getDiagnostics();
      console.log("GetDiagnostics Test Passed"); // temporarily for the building processes
    } catch (error) {
      console.log("Failed to apply getDiagnostics button"); // temporarily for the building processes
    }
  };

  return (
    <div className="flex justify-center gap-3 text-background">
      <WindowButton
        label="Apply Settings"
        onClick={handleApply}
        disabled={isLoading || hasApplied || !isAdmin} // disabled if not admin
        className={`${Style.buttons} ${
          isLoading || hasApplied || !isAdmin
            ? "opacity-50 cursor-not-allowed"
            : ""
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

      <WindowButton
        label="Copy"
        onClick={handleGetDiagnostics}
        disabled={isLoading} // stays enabled even for non-admin
        className={`${Style.buttons} ${
          isLoading && loadingAction === "diagnostics"
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {loadingAction === "diagnostics" ? (
          "Copying..."
        ) : isCopied ? (
          <BsFolderCheck />
        ) : (
          "Copy DX"
        )}
      </WindowButton>
    </div>
  );
};

export default ActionButtons;
