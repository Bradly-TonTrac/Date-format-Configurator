import fs from "fs";
import path from "path";
import { app } from "electron";
import { APP_DIRECTORY, LOGS_DIRECTORY, LOG_FILE_NAME, LOG_MAX_BYTES } from "../../constants.js";

// Check if two timestamps fall on the same calendar day
const isSameDay = (dateA, dateB) =>
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

// Build a rotated log file path and avoid name collisions
const getRotatedLogPath = (folderPath, baseName, dateTag) => {
  const ext = path.extname(baseName) || ".log";
  const name = path.basename(baseName, ext);
  let candidate = path.join(folderPath, `${name}-${dateTag}${ext}`);
  let counter = 1;

  while (fs.existsSync(candidate)) {
    candidate = path.join(folderPath, `${name}-${dateTag}-${counter}${ext}`);
    counter += 1;
  }

  return candidate;
};

// Rotate if a new day has started or the log exceeds the size cap
const rotateIfNeeded = (filePath, folderPath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const stats = fs.statSync(filePath);
  const now = new Date();
  const modified = new Date(stats.mtime);
  const needsDailyRotate = !isSameDay(now, modified);
  const needsSizeRotate = stats.size >= LOG_MAX_BYTES;

  if (!needsDailyRotate && !needsSizeRotate) {
    return;
  }

  // Use a date tag like YYYY-MM-DD for rotated file names
  const dateTag = now.toISOString().slice(0, 10);
  const rotatedPath = getRotatedLogPath(folderPath, LOG_FILE_NAME, dateTag);
  fs.renameSync(filePath, rotatedPath);
};

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

    // Ensure log file stays within daily/size limits before writing
    rotateIfNeeded(appFilePath, appFolderPath);

    const log = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    fs.appendFileSync(appFilePath, log, "utf-8");
    return { success: true, message: "Log entry added" };
  } catch (error) {
    return { success: false, message: "Log entry failed" };
  }
};
