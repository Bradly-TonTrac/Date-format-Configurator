import { ipcMain } from "electron";
import broadcastIntlChange from "./index.js";
import { logEvent } from "../Logger/index.js";
import { IPC_CHANNELS, LOG_LEVELS } from "../../constants.js";

// Broadcast settings change to Windows
ipcMain.handle(IPC_CHANNELS.BROADCAST_INTL_CHANGE, () => {
  try {
    broadcastIntlChange();
    logEvent(LOG_LEVELS.INFO, "Broadcasted WM_SETTINGCHANGE to Windows");
    return { success: true, message: "Broadcast sent successfully" };
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to broadcast intl change: ${error.message}`);
    return { success: false, message: error.message };
  }
});
