import React from "react";
import { TbPoint } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbSettingsCheck } from "react-icons/tb";

const style = {
  subject: "text-tt-sm font-semibold 2xl:text-tt-base",
  output: "ml-1 font-extralight 2xl:text-tt-base",
};

const SettingsPanel = ({
  title,
  iconType = "current",
  shortDate,
  longDate,
  shortPrev,
  longPrev,
  lastRead,
  status = false,
}) => {
  const Icon = iconType === "desired" ? TbSettingsCheck : IoSettingsOutline;

  const renderField = (label, value) =>
    value !== undefined && (
      <h3 className="mt-1" key={label}>
        <div className="flex items-center">
          <TbPoint />
          <span className={style.subject}>{label} :</span>
          <span
            className={`${style.output} ${status ? "text-success" : "text-destructive"}`}
          >
            {value}
          </span>
        </div>
      </h3>
    );

  return (
    <div className="rounded shadow-lg bg-clip-padding p-3 2xl:p-5">
      <h3 className="flex justify-center border border-primary rounded text-tt-base bg-background-light text-back 2xl:py-1">
        <div className="flex items-center gap-2">
          <Icon />
          <span className={style.subject}>{title}</span>
        </div>
      </h3>

      <div className="p-2 bg-background-light rounded mt-1 2xl:p-4 2xl:mt-2">
        {renderField("SHORT DATE", shortDate)}
        {renderField("LONG DATE", longDate)}
        {renderField("PREVIEW (short)", shortPrev)}
        {renderField("PREVIEW (long)", longPrev)}
        {renderField("LAST READ", lastRead)}
      </div>
    </div>
  );
};

export default SettingsPanel;
