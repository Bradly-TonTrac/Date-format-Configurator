import fs from 'fs';
import path from  'path';
import { app } from 'electron';

//Fetching the backup file from appData
//Fetching the backup file from appData
export const readBackup = () => {
    try {
        const appDataPath = app.getPath('appData');
        const backupDir = path.join(appDataPath, 'DateFormatConfigurator');
        const backupFilePath = path.join(backupDir, 'backup.json');

        const data = fs.readFileSync(backupFilePath, 'utf-8');
        
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read backup:', error);
        return null;
    }
};

//Checking if backup exists
export const hasBackup = () => {
    const appDataPath = app.getPath('appData');
    const backupDir = path.join(appDataPath, 'DateFormatConfigurator');
    const backupFilePath = path.join(backupDir, 'backup.json');

    if (!fs.existsSync(backupFilePath)) {
        return false;
    }

    return true;
};

//Delete backup from appData
export const deleteBackup = () => {
    const appDataPath = app.getPath('appData');
    const backupDir = path.join(appDataPath, 'DateFormatConfigurator');
    const backupFilePath = path.join(backupDir, 'backup.json');

    fs.rmSync(backupFilePath, { recursive: true, force: true});
    console.log(`Removed directory and its contents: ${backupDir}`);
};