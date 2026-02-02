import { useEffect, useState } from "react";
import { useStatus } from "../../hooks/useSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { TbPoint } from "react-icons/tb";

// Tailwind class shortcuts for consistent styling
const style = {
  subject: "text-tt-sm font-semibold 2xl:text-tt-base",
  output: "ml-1 font-extralight 2xl:text-tt-base",
};

/*
  CurrentSettings
  Displays the current date settings and last read timestamp.
  Uses useStatus hook to load data and determine display color based on status.
*/
const CurrentSettings = () => {
  const {
    shortDate,
    longDate,
    lastRead,
    loadCurrentDateSettings,
    checkStatus,
  } = useStatus();

  // Text color state: true = normal (success), false = warning (destructive)
  const [textColor, setTextColor] = useState(false);

  // Load current settings once on component mount
  useEffect(() => {
    loadCurrentDateSettings();
  }, []);

  // Check the status to determine if settings are valid or need attention
  useEffect(() => {
    const setColors = async () => {
      const resultsColor = await checkStatus();
      setTextColor(resultsColor);
    };
    setColors();
  }, []);

  return (
    <div className="rounded bg-background shadow-lg bg-clip-padding p-3 2xl:p-5">
      {/* Header */}
      <h3 className="flex justify-center border border-primary rounded text-tt-base bg-background-light text-back 2xl:py-1">
        <div className="flex items-center gap-2">
          <IoSettingsOutline /> {/* Icon for settings */}
          <span className={style.subject}>CURRENT SETTING'S</span>
        </div>
      </h3>

      {/* Body: Display each setting with conditional text color */}
      <div className="bg-background-light p-2 shadow-card rounded mt-1 2xl:p-4 2xl:mt-2">
        {/* SHORT DATE */}
        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>SHORT DATE :</span>
            <span
              className={`${style.output} ${
                textColor ? "text-success" : "text-destructive"
              }`}
            >
              {shortDate}
            </span>
          </div>
        </h3>

        {/* LONG DATE */}
        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>LONG DATE :</span>
            <span
              className={`${style.output} ${
                textColor ? "text-success" : "text-destructive"
              }`}
            >
              {longDate}
            </span>
          </div>
        </h3>

        {/* LAST READ */}
        <h3 className="mt-1">
          <div className="flex items-center">
            <TbPoint />
            <span className={style.subject}>LAST READ :</span>
            <span
              className={`${style.output} ${
                textColor ? "text-success" : "text-destructive"
              }`}
            >
              {lastRead}
            </span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default CurrentSettings;
