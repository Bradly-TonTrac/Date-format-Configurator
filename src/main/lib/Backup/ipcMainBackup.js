import { ipcMain } from 'electron'
import { readBackup} from "./index.js";
import { hasBackup } from './index.js';
import { deleteBackup } from './index.js';

//Remove later not needed
ipcMain.handle('get-backup', () => {
    const dataStatus = hasBackup();

    if(!dataStatus) {
        return { success: false, message: "No backup exists" };
    }
    const data = readBackup();
    return data;
});

//Check if backup exists
ipcMain.handle('has-backup', () => {
    return hasBackup();
});

//Remove later not needed
ipcMain.handle('delete-backup', () => {
    return deleteBackup();
});


