import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { execSync } from 'child_process';
import './ipcMainHandler';
import './lib/Backup/ipcMainBackup';
import './lib/Registry/ipcMainRegistry';
import './lib/Broadcast/ipcMainBroadcast';
import { logEvent } from './lib/Logger/index.js';
import { IPC_CHANNELS, LOG_LEVELS } from './constants.js';
import { useCopyDox } from './ipcMainHandler';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const iconPath = MAIN_WINDOW_VITE_DEV_SERVER_URL 
  ? path.join(__dirname, '../../src/resources/tontrac-logo.png')  // Add 'src' to the path
  : path.join(process.resourcesPath, 'tontrac-logo.png');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 528,
    frame: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
 mainWindow.webContents.openDevTools();

 // Inject CSS to add border below menu bar
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.webContents.insertCSS(`
  //     body {
  //       border-top: 1px solid red;
  //     }
  //   `);
  // });
};

//Create tool menu for copying diagnostics to clipboard
const menu = Menu.buildFromTemplate([
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Copy Dox',
        click: () => {
          useCopyDox();
        }
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  logEvent(LOG_LEVELS.INFO, 'Application started');
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    logEvent(LOG_LEVELS.INFO, 'Application closed');
    app.quit();
  }
});

// Check if app is opened with administrative rights
const checkAdminStatus = () => {
  try {
    execSync('net session', { stdio: 'ignore' });
    logEvent(LOG_LEVELS.INFO, 'Admin status verified: Running with administrator privileges');
    return true;
  } catch {
    logEvent(LOG_LEVELS.INFO, 'Admin status verified: Running without administrator privileges');
    return false;
  }
};

// Handling the checking of admin status
ipcMain.handle(IPC_CHANNELS.GET_ADMIN_STATUS, async () => {
  const status = checkAdminStatus();
  return status;
});

// Get application version
ipcMain.handle(IPC_CHANNELS.GET_APP_VERSION, () => {
  const version = app.getVersion();
  logEvent(LOG_LEVELS.INFO, `Fetched app version: ${version}`);
  return version;
});

