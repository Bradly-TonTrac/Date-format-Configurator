import { ipcMain } from 'electron';
import { execSync } from 'child_process';
import os from 'os'

//Initializing settings with required formats by tontrac app
const settings = require('./globals.js');

//Get Operating system info
ipcMain.handle('get-os-info', () => {
  try {
    const operatingSystemType = os.platform() === 'win32';
    const getWindowsVersion = () => {
      const output = os.release();
      const [major, minor, build] = output.split('.').map(Number);

      if(major === 6 && minor === 1) return 'Windows 7';
      if(major === 6 && minor === 2) return 'Windows 8';
      if(major === 10 && build < 22000) return 'Windows 10';
      if(major === 10 && build >= 22000) return 'Windows 11';
    }
    return {
      operatingSystemType,
      operatingSystemVersion: getWindowsVersion(),
    }
  } catch(error) {
      consol.error("failed to get OS info",error)
  }
});

//Get current settings from the registry
ipcMain.handle('get-current-settings', () => {
  try {
    const getRegistryValue = (valueName) => {
      const output = execSync(
        `reg query "HKCU\\Control Panel\\International" /v ${valueName}`
      ).toString();

      const match = output.match(/REG_SZ\s+(.+)/);
      return match ? match[1].trim() : '';
    };

    return{
        shortDate: getRegistryValue('sShortDate'),
        longDate: getRegistryValue('sLongDate'),
        shortTime: getRegistryValue('sShortTime'),
        longTime: getRegistryValue('sTimeFormat'),
        decimal: getRegistryValue('sDecimal'),
    };
  } catch(error) {
    console.error("failed to get current settings",error);
  }
});

//Helper function - writing to registry
const applySettings = (valueName, value) => {
  execSync(
    `reg add "HKCU\\Control Panel\\International" /v ${valueName} /t REG_SZ /d ${value} /f`
  );
}

//Write to registry desired settings
ipcMain.handle('apply-settings', () => {
  try {
    applySettings('sShortDate', settings.formats.shortDate);
    applySettings('sLongDate', settings.formats.longDate);
    applySettings('sShortTime', settings.formats.shortTime);
    applySettings('sTimeFormat', settings.formats.longTime);
    applySettings('sDecimal', settings.formats.decimal);
  } catch(error) {
    console.error('Failed to apply settings');
  }
})