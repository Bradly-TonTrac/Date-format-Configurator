import React from "react";
import WindowButton from "./WindowButton";

const Style = {
  buttons: "border hover:translate-x-1 p-2 rounded",
};

const ActionButtons = () => {
  return (
    <div className="flex justify-center gap-3">
      <WindowButton label="Apply Settings" className={Style.buttons}>
        Apply
      </WindowButton>
      <WindowButton label="Restore" className={Style.buttons}>
        Restore Previous
      </WindowButton>
      <WindowButton label="Copy" className={Style.buttons}>
        Copy DX
      </WindowButton>
    </div>
  );
};
export default ActionButtons;
