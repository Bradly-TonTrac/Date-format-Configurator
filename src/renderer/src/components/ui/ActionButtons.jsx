import { useEffect } from "react";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";

// Reusable Tailwind class for buttons
const Style = {
  buttons:
    "text-tt-sm text-primary hover:bg-background-light box-border pt-1 pb-1 px-4 rounded border border-primary text-center w-[180px]",
};

/*
  ActionButtons
  Displays Apply and Restore buttons for system settings.
  Handles async operations, loading states, and admin permissions.
*/

const ActionButtons = () => {
  const {
    isAdmin,
    applySettings,
    restoreSettings,
    isLoading,
    loadingAction,
    reloadApp,
    getSettingsStatus,
    checkStatus,
  } = useStatus();

  // Fetch current settings status when component mounts
  useEffect(() => {
    getSettingsStatus();
  }, []);

  /*
    handleApply
    Applies the settings if they are not already up-to-date,
    then reloads the app after a short delay.
  */
  const handleApply = async () => {
    try {
      const status = await checkStatus();
      if (!status) {
        await applySettings();
        setTimeout(async () => {
          await reloadApp();
        }, 1500);
      } else {
        return; // No previous settings to restore, do nothing
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreSettings = async () => {
    try {
      const status = await checkStatus();
      if (status) {
        await restoreSettings();
        setTimeout(async () => {
          await reloadApp();
        }, 1500);
      } else {
        return;
      }
    } catch (error) {
      console.error(error); // Log error if operation fails
    }
  };

  return (
    <div className="flex justify-center gap-3 bg-ba text-background mt-3 mb-3">
      <WindowButton
        label="Apply Settings"
        onClick={handleApply}
        disabled={isLoading || !isAdmin}
        className={`${Style.buttons} ${
          isLoading || !isAdmin ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loadingAction === "apply" ? "Applying.." : "Apply"}
      </WindowButton>

      <WindowButton
        label="Restore"
        onClick={handleRestoreSettings}
        disabled={isLoading || !isAdmin}
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
0;
