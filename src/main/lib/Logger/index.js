import fs from "fs";
import path from "path";
import { app } from "electron";
import { APP_DIRECTORY, LOGS_DIRECTORY, LOG_FILE_NAME } from "../../constants.js";

// Logger function event
export const logEvent = (level, message) => {
  const appDataPath = app.getPath("appData");
  const appDir = path.join(appDataPath, APP_DIRECTORY);
  const appFolderPath = path.join(appDir, LOGS_DIRECTORY);
  const appFilePath = path.join(appFolderPath, LOG_FILE_NAME);

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
