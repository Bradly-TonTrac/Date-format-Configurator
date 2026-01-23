import { ipcMain, BrowserWindow } from "electron";
import os from "os";
import tontracSettings from "./globals.js";
import { app } from "electron";
import { logEvent } from "./lib/Logger/index.js";
import { getCurrentRegistrySettings, applyRegistrySettings } from "./lib/Registry/index.js";
import "./lib/Registry/ipcMainRegistry.js";
import "./lib/Broadcast/ipcMainBroadcast.js";
import { hasBackup, readBackup, deleteBackup, createBackUp } from "./lib/Backup/index.js";
import { IPC_CHANNELS, LOG_LEVELS } from "./constants.js";

// Get Operating system info
ipcMain.handle(IPC_CHANNELS.GET_OS_INFO, () => {
  try {
    const operatingSystemType = os.platform() === "win32";
    const getWindowsVersion = () => {
      const output = os.release();
      const [major, minor, build] = output.split(".").map(Number);

      if (major === 6 && minor === 1) return "Windows 7";
      if (major === 6 && minor === 2) return "Windows 8";
      if (major === 10 && build < 22000) return "Windows 10";
      if (major === 10 && build >= 22000) return "Windows 11";
    };

    logEvent(LOG_LEVELS.INFO, "Fetched OS info");
    return {
      operatingSystemType,
      operatingSystemVersion: getWindowsVersion(),
    };
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to get OS info: ${error.message}`);
    return { success: false, message: error.message };
  }
});

// Write to registry desired settings
ipcMain.handle(IPC_CHANNELS.APPLY_SETTINGS, () => {
  try {
    const currentSettings = getCurrentRegistrySettings();

    const backup = {
      timestamp: new Date().toISOString(),
      settings: currentSettings,
    };

    const backupStatus = createBackUp(backup);

    if (!backupStatus) {
      logEvent(LOG_LEVELS.ERROR, "Backup already exists, cannot apply new settings");
      return { success: false, message: "Backup already exists" };
    }
    logEvent(LOG_LEVELS.INFO, "Backup created successfully");

    applyRegistrySettings(
      tontracSettings.formats.shortDate,
      tontracSettings.formats.longDate,
      tontracSettings.formats.shortTime,
      tontracSettings.formats.longTime,
      tontracSettings.formats.decimal
    );
    logEvent(LOG_LEVELS.INFO, "Applied new registry settings");

    logEvent(LOG_LEVELS.INFO, "Settings applied successfully");
    return { success: true, message: "Settings applied successfully" };
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to apply settings: ${error.message}`);
    return { success: false, message: error.message };
  }
});

ipcMain.handle(IPC_CHANNELS.GET_DESIRED_SETTINGS, () => {
  return tontracSettings;
});

// Restoring previous settings
ipcMain.handle(IPC_CHANNELS.RESTORE_SETTINGS, () => {
  const backupStatus = hasBackup();

  if (!backupStatus) {
    logEvent(LOG_LEVELS.INFO, "Restore attempted but no backup exists");
    return { success: false, message: "No backup exists" };
  }

  try {
    const prevSettings = readBackup();
    logEvent(LOG_LEVELS.INFO, "Read backup file successfully");

    if (!prevSettings) {
      logEvent(LOG_LEVELS.ERROR, "Backup file is invalid or corrupted");
      return { success: false, message: "Failed to read backup" };
    }

    applyRegistrySettings(
      prevSettings.settings.shortDate,
      prevSettings.settings.longDate,
      prevSettings.settings.shortTime,
      prevSettings.settings.longTime,
      prevSettings.settings.decimal
    );

    logEvent(LOG_LEVELS.INFO, "Previous settings applied successfully");

    deleteBackup();
    logEvent(LOG_LEVELS.INFO, "Backup file deleted after successful restore");

    return { success: true, message: "Settings restored successfully" };
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to restore settings: ${error.message}`);
    return { success: false, message: error.message };
  }
});

//Returning log path + current values to json file
ipcMain.handle('get-diagnostics', () => {
  const appDataPath = app.getPath("appData");
  const appDir = path.join(appDataPath, "DateFormatConfigurator");
  const appFolderPath = path.join(appDir, "logs");

  const currentSettings = getCurrentRegistrySettings();

  logEvent("INFO", "Fetched diagnostics");
  return {
    logPath: appFolderPath,
    currentSettings
  };
});

ipcMain.handle('exit-app', () => {
  return app.exit();
});

ipcMain.handle('min-app', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

