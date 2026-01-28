// Registry Constants
export const REGISTRY_PATH = "HKCU\\Control Panel\\International";
export const REGISTRY_VALUES = {
  SHORT_DATE: "sShortDate",
  LONG_DATE: "sLongDate",
  SHORT_TIME: "sShortTime",
  LONG_TIME: "sTimeFormat",
  DECIMAL: "sDecimal",
};

// App Directory Constants
export const APP_DIRECTORY = "DateFormatConfigurator";
export const LOGS_DIRECTORY = "logs";
export const BACKUP_FILE_NAME = "backup.json";
export const LOG_FILE_NAME = "DateFormatConfigurator.log";

// Log Level Constants
export const LOG_LEVELS = {
  INFO: "INFO",
  ERROR: "ERROR",
};

// IPC Channel Names
export const IPC_CHANNELS = {
  GET_OS_INFO: "get-os-info",
  GET_CURRENT_SETTINGS: "get-current-settings",
  APPLY_SETTINGS: "apply-settings",
  RESTORE_SETTINGS: "restore-settings",
  HAS_BACKUP: "has-backup",
  GET_DESIRED_SETTINGS: "get-desired-settings",
  GET_ADMIN_STATUS: "get-admin-status",
  GET_APP_VERSION: "get-app-version",
  BROADCAST_INTL_CHANGE: "broadcast-intl-change",
  EXIT_APP: "exit-app",
  MIN_APP: "min-app",
  COPY_TO_CLIPBOARD: "copy-to-clipboard",
  // COPY_TO_CLIPBOARD: "copy-to-clipboard",
};
