import { ipcMain } from "electron";
import { getCurrentRegistrySettings } from "./index.js";
import { logEvent } from "../Logger/index.js";
import { IPC_CHANNELS, LOG_LEVELS } from "../../constants.js";

// Get current settings from the registry
ipcMain.handle(IPC_CHANNELS.GET_CURRENT_SETTINGS, () => {
  try {
    const settings = getCurrentRegistrySettings();
    logEvent(LOG_LEVELS.INFO, "Fetched current OS settings via IPC");
    return settings;
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to get current settings: ${error.message}`);
    return { success: false, message: error.message };
  }
});
