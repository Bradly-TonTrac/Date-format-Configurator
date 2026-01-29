import React from "react";
import { VscChromeMinimize, VscClose } from "react-icons/vsc";
import WindowButton from "./WindowButton";
import { useStatus } from "../../hooks/useSettings";

//Tailwindcss object instead of repeating them all over the app
const Style = {
  buttons: "hover:bg-zinc-700 rounded  pl-2 pr-2",
};

const TopBar = () => {
  const { getWindowExit, getWindowMin } = useStatus();

  return (
    <header
      className="flex  justify-between p-2 pb-0 border-b border-primary items-center cursor-pointer"
      style={{ WebkitAppRegion: "drag" }} // Enables the bar to be drag
    >
      <div className="flex justify-between gap-1 items-center ">
        <img src="/" alt="" />
        <h4 className="text-tt-base">Date Format Configurator</h4>
        <h6 className="text-text-secondary text-tt-xs ">v1.0.0</h6>
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
