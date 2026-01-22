import { ipcMain } from "electron";
import { execSync } from "child_process";
import os from "os";
import tontracSettings from "./globals.js";
import fs from "fs";
import { app } from "electron";
import path from "path";
import broadcastIntlChange from "./lib/Broadcast/index.js";
import { hasBackup } from "./lib/Backup/index.js";
import { readBackup } from "./lib/Backup/index.js";
import { deleteBackup } from "./lib/Backup/index.js";
import { logEvent } from "./lib/Logger/index.js";

//Get Operating system info
ipcMain.handle("get-os-info", () => {
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

    logEvent("INFO", "Fetched OS info");

    return {
      operatingSystemType,
      operatingSystemVersion: getWindowsVersion(),
    };
  } catch (error) {
    consol.error("Failed to get OS info", error);
  }
});

//Helper Function - getting current system settings
const getCurrentRegistrySettings = () => {
  const getRegistryValue = (valueName) => {
    const output = execSync(
      `reg query "HKCU\\Control Panel\\International" /v ${valueName}`,
    ).toString();

    const match = output.match(/REG_SZ\s+(.+)/);
    return match ? match[1].trim() : "";
  };

  return {
    readTime: new Date().toISOString(),
    shortDate: getRegistryValue("sShortDate"),
    longDate: getRegistryValue("sLongDate"),
    shortTime: getRegistryValue("sShortTime"),
    longTime: getRegistryValue("sTimeFormat"),
    decimal: getRegistryValue("sDecimal"),
  };
};

//Get current settings from the registry
ipcMain.handle("get-current-settings", () => {
  try {
    logEvent("INFO", "fetched current OS info");
    return getCurrentRegistrySettings();
  } catch (error) {
    console.error("failed to get get current settings", error);
  }
});

//Helper function - writing to registry
const applySettings = (valueName, value) => {
  execSync(
    `reg add "HKCU\\Control Panel\\International" /v ${valueName} /t REG_SZ /d "${value}" /f`,
  );
};

//Helper Function - create backup
const createBackUp = (currentSettings) => {
  const appDataPath = app.getPath("appData");

  const backupDir = path.join(appDataPath, "DateFormatConfigurator");

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backupFilePath = path.join(backupDir, "backup.json");

  fs.writeFileSync(backupFilePath, JSON.stringify(currentSettings, null, 2));
};

//Write to registry desired settings
ipcMain.handle("apply-settings", () => {
  try {
    const currentSettings = getCurrentRegistrySettings();

    const backup = {
      timestamp: new Date().toISOString(),
      settings: currentSettings,
    };

    createBackUp(backup);
    logEvent("INFO", "Backup created");

    applySettings("sShortDate", tontracSettings.formats.shortDate);
    applySettings("sLongDate", tontracSettings.formats.longDate);
    applySettings("sShortTime", tontracSettings.formats.shortTime);
    applySettings("sTimeFormat", tontracSettings.formats.longTime);
    applySettings("sDecimal", tontracSettings.formats.decimal);
    logEvent("INFO", "Applied new settings");

    //Notifying windows of settings change
    broadcastIntlChange();
    logEvent("INFO", "Broadcasted to windows");

    return { success: true, message: "Settings applied successfully" };
  } catch (error) {
    console.error("Failed to apply settings");
    return { success: false, message: error.message };
  }
});

//Getting desired settings
ipcMain.handle("get-desired-settings", () => {
  return tontracSettings;
});

//Restoring previous settings
ipcMain.handle("restore-settings", () => {
  const backupStatus = hasBackup();

  if (!backupStatus) {
    console.log("No backup exists");
    return { success: false, message: "No backup exists" };
  }

  try {
    const prevSettings = readBackup();
    logEvent("INFO", "Read backup");

    if (!prevSettings) {
      return { success: false, message: "Failed to read backup" };
    }

    applySettings("sShortDate", prevSettings.settings.shortDate);
    applySettings("sLongDate", prevSettings.settings.longDate);
    applySettings("sShortTime", prevSettings.settings.shortTime);
    applySettings("sTimeFormat", prevSettings.settings.longTime);
    applySettings("sDecimal", prevSettings.settings.decimal);

    logEvent("INFO", "previous settings applied");

    //Notifying windows of settings change
    broadcastIntlChange();
    logEvent("INFO", "Broadcasted to windows");
    deleteBackup();

    return { success: true, message: "Settings restored successfully" };
  } catch (error) {
    console.error("failed restoring previous settings");
    return { success: false, message: error.message };
  }
});
