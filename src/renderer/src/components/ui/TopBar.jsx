import React from "react";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";

const Style = {
  buttons: "hover:bg-zinc-700 rounded  pl-2 pr-2",
};

const TopBar = () => {
  const { getWindowExit, getWindowMin } = useStatus();

  return (
    <header
      className="flex justify-between p-2 border-b border-border cursor-pointer"
      style={{ WebkitAppRegion: "drag" }} // Enables the bar to be dragable
    >
      <div className="flex justify-between gap-3 ">
        <img src="/" alt="loggo" />
        <h4>Date Format Configurator</h4>
        <h6 className="text-text-secondary ">v1.0.0</h6>
      </div>

      {/*Top Bar Icons */}
      <div className="flex justify-between">
        <WindowButton
          label="Minimize"
          className={Style.buttons}
          onClick={getWindowMin}
        >
          <VscChromeMinimize />
        </WindowButton>


        <WindowButton
          className=" hover:bg-red-600 rounded  pl-2 pr-2"
          label="Close"
          onClick={getWindowExit}
        >
          <VscClose className="text-xl" />
        </WindowButton>
      </div>
    </header>
  );
};

export default TopBar;
