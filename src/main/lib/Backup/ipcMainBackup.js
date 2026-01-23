import { ipcMain } from 'electron';
import { readBackup, hasBackup, deleteBackup } from "./index.js";
import { IPC_CHANNELS, LOG_LEVELS } from "../../constants.js";
import { logEvent } from "../Logger/index.js";

// Check if backup exists
ipcMain.handle(IPC_CHANNELS.HAS_BACKUP, () => {
  try {
    const backupExists = hasBackup();
    logEvent(LOG_LEVELS.INFO, `Checked backup existence: ${backupExists}`);
    return backupExists;
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to check backup: ${error.message}`);
    return false;
  }
});


