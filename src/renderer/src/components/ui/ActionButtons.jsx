import React, { useEffect } from "react";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";

const Style = {
  buttons: "border hover:translate-x-1 p-2 rounded",
};

const ActionButtons = () => {
  const { applySettings, restoreSettings } = useStatus();

  return (
    <div className="flex justify-center gap-3">
      <WindowButton
        label="Apply Settings"
        onClick={applySettings}
        className={Style.buttons}
      >
        Apply
      </WindowButton>
      <WindowButton
        label="Restore"
        onClick={restoreSettings}
        className={Style.buttons}
      >
        Restore Previous
      </WindowButton>
      <WindowButton label="Copy" className={Style.buttons}>
        Copy DX
      </WindowButton>
    </div>
  );
};
export default ActionButtons;
