import fs from "fs";
import path from "path";
import { app } from "electron";

//Logger function event 
export const logEvent = (level, message) => {
  const appDataPath = app.getPath("appData");
  const appDir = path.join(appDataPath, "DateFormatConfigurator");
  const appFolderPath = path.join(appDir, "logs");
  const appFilePath = path.join( appFolderPath, "DateFormatConfigurator.log");

  try {
    if (!fs.existsSync(appFolderPath)) {
      fs.mkdirSync(appFolderPath, { recursive: true });
    }

    const log = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    fs.appendFileSync(appFilePath, log, "utf-8");
    return { success: true, message: "Log entry added" };
  } catch (error) {
    return { success: false, message: "Log entry failed" };
  }
};
