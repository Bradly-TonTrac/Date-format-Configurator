import { useEffect } from "react";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";
import { useToastStore } from "../../components/ui/zustand/settingsStore";

const Style = {
  buttons:
    "text-tt-sm text-primary hover:bg-background-light box-border pt-1 pb-1 px-4 rounded border border-primary text-center w-[180px]",
};

const ActionButtons = () => {
  const {
    isAdmin,
    isLoading,
    loadingAction,
    reloadApp,
    checkStatus,
    applySettings,
    restoreSettings,
    getSettingsStatus,
  } = useStatus();

  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    getSettingsStatus();
  }, [getSettingsStatus]);

  const handleAction = async (
    actionFn,
    requiredStatus,
    errorMsg,
    reloadDelay = 1500,
  ) => {
    try {
      const status = await checkStatus();
      if (status === requiredStatus) {
        await actionFn();
        setTimeout(async () => {
          try {
            await reloadApp();
          } catch {
            addToast?.("Failed to reload app", "error");
          }
        }, reloadDelay);
      }
    } catch (error) {
      addToast?.(error?.message || `${errorMsg} failed`, "error");
    }
  };

  return (
    <div className="flex justify-center gap-3 bg-ba text-background mt-3 mb-3">
      <WindowButton
        label="Apply Settings"
        onClick={() => handleAction(applySettings, false, "Apply Settings")}
        disabled={isLoading || !isAdmin}
        className={`${Style.buttons} ${isLoading || !isAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-disabled={isLoading || !isAdmin}
        aria-busy={loadingAction === "apply"}
      >
        {loadingAction === "apply" ? "Applying..." : "Apply"}
      </WindowButton>

      <WindowButton
        label="Restore"
        onClick={() => handleAction(restoreSettings, true, "Restore Settings")}
        disabled={isLoading || !isAdmin}
        className={`${Style.buttons} ${isLoading || !isAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-disabled={isLoading || !isAdmin}
        aria-busy={loadingAction === "restore"}
      >
        {loadingAction === "restore" ? "Restoring..." : "Restore Previous"}
      </WindowButton>
    </div>
  );
};

export default ActionButtons;
