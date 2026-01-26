const { ipcRenderer, contextBridge } = require('electron');

const WINDOW_API ={ 
    getAdminStatus: () => ipcRenderer.invoke('get-admin-status'),
    getOSInfo: () => ipcRenderer.invoke('get-os-info'),
    getCurrentSettings: () => ipcRenderer.invoke('get-current-settings'),
    applySettings: () => ipcRenderer.invoke('apply-settings'),
    restoreSettings: () => ipcRenderer.invoke('restore-settings'),
    hasBackup: () => ipcRenderer.invoke('has-backup'),
    getDiagnostics: () => ipcRenderer.invoke('get-diagnostics'),
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    getDesiredSettings: () => ipcRenderer.invoke('get-desired-settings'),
    getWindowExit: () => ipcRenderer.invoke('exit-app'),
    getWindowMin: () => ipcRenderer.invoke('min-app'),
    copyToClipboard: (data) => ipcRenderer.invoke('copy-to-clipboard', data),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);