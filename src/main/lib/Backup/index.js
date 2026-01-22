import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { APP_DIRECTORY, BACKUP_FILE_NAME, LOG_LEVELS } from '../../constants.js';
import { logEvent } from '../Logger/index.js';

// Fetching the backup file from appData
export const readBackup = () => {
  try {
    const appDataPath = app.getPath('appData');
    const backupDir = path.join(appDataPath, APP_DIRECTORY);
    const backupFilePath = path.join(backupDir, BACKUP_FILE_NAME);

    const data = fs.readFileSync(backupFilePath, 'utf-8');

    return JSON.parse(data);
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to read backup: ${error.message}`);
    return null;
  }
};

// Checking if backup exists
export const hasBackup = () => {
  const appDataPath = app.getPath('appData');
  const backupDir = path.join(appDataPath, APP_DIRECTORY);
  const backupFilePath = path.join(backupDir, BACKUP_FILE_NAME);

  if (!fs.existsSync(backupFilePath)) {
    return false;
  }

  return true;
};

// Delete backup from appData
export const deleteBackup = () => {
  const appDataPath = app.getPath('appData');
  const backupDir = path.join(appDataPath, APP_DIRECTORY);
  const backupFilePath = path.join(backupDir, BACKUP_FILE_NAME);

  fs.rmSync(backupFilePath, { recursive: true, force: true });
  logEvent(LOG_LEVELS.INFO, `Backup file removed: ${backupFilePath}`);
};

// Create backup
export const createBackUp = (currentSettings) => {
  const appDataPath = app.getPath('appData');
  const backupDir = path.join(appDataPath, APP_DIRECTORY);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backupFilePath = path.join(backupDir, BACKUP_FILE_NAME);

  if (fs.existsSync(backupFilePath)) {
    logEvent(LOG_LEVELS.INFO, "Attempted to create backup. Backup already exists.");
    return null;
  }

  fs.writeFileSync(backupFilePath, JSON.stringify(currentSettings, null, 2));
  logEvent(LOG_LEVELS.INFO, `Backup file created: ${backupFilePath}`);
  return true;
};