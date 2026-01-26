# Date Format Configurator (Electron)

A cross-platform desktop application built with **Electron** and **React** that allows users to view, update, back up, and restore system date format settings.  
The application integrates directly with the **Windows Registry** and broadcasts system setting changes to ensure updates are applied immediately.

---

## 📌 Project Overview

This project was developed as part of a desktop application assignment with the goal of:

- Integrating Electron with native operating system features
- Managing system-level configuration safely
- Implementing IPC communication between frontend and backend
- Packaging the application into a production-ready Windows installer

The application follows a **service-based backend architecture** and separates concerns between:
- Renderer (React frontend)
- Main process (Electron backend)
- OS-level integrations (Registry, Broadcast, Backup, Logging)

---

## 🧱 Architecture

Electron App
│
├── Renderer (React)
│ └── UI & User Interaction
│
├── Preload
│ └── Secure IPC bridge
│
└── Main Process (Backend Services)
├── Registry Service
├── Backup Service
├── Broadcaster Service
├── Logger Service
└── Diagnostics


---

## ⚙️ Core Features

### ✅ Registry Management
- Reads current system date format values from the Windows Registry
- Writes updated date format values safely

### ✅ Backup & Restore
- Automatically creates a backup before applying changes
- Restores previous settings from backup
- Detects whether a backup exists

### ✅ System Broadcast
- Uses `WM_SETTINGCHANGE` to notify Windows that system settings have changed
- Ensures changes take effect immediately without reboot

### ✅ Diagnostics
- Returns current registry values
- Provides path to application log files for troubleshooting

### ✅ Logging
- Centralized logging service
- Logs application events to a persistent file in the system AppData directory

---

## 🖥️ Technologies Used

- **Electron**
- **React**
- **Node.js**
- **IPC (ipcMain / ipcRenderer)**
- **Windows Registry**
- **PowerShell**
- **Squirrel installer**

---

## 📂 Project Structure

project-root/
├── src/
│ ├── main/
│ │ ├── Registry/
│ │ ├── Backup/
│ │ ├── Broadcast/
│ │ ├── Logger/
│ │ └── index.js
│ ├── preload.js
│ └── renderer/
│ └── React application
│
├── build/
│ └── icon.ico
│
├── dist/
│ └── Windows installer output
│
├── package.json
└── README.md


---

## 🔐 IPC Communication

All system-level operations are handled in the **main process** and exposed securely to the frontend via `preload.js`.

Example IPC actions:
- `get-current-settings`
- `apply-settings`
- `restore-settings`
- `has-backup`
- `get-diagnostics`

This ensures:
- No direct access to Node APIs from the renderer
- Improved security and maintainability

---

## 🧪 Testing

Manual testing was performed to verify:
- Registry values are read and written correctly
- Backups are created before changes
- Restore functionality returns system to previous state
- System broadcasts are sent successfully
- Logs are generated correctly

---

## 📦 Packaging

The application is packaged using **Squirrel installer**.

### Build Command


## 📄 Notes
- Full functionality (registry access & broadcasting) is available on **Windows**
- Non-Windows platforms safely no-op system-specific features
- Administrator privileges may be required for registry modification

## 👤 Author
**Backend** : Chris
**Frontend** : Bradly