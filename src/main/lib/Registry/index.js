import { execSync } from 'child_process';
import { logEvent } from '../Logger/index.js';
import { REGISTRY_PATH, REGISTRY_VALUES, LOG_LEVELS } from '../../constants.js';

// Helper Function - getting registry value
const getRegistryValue = (valueName) => {
  try {
    const output = execSync(
      `reg query "${REGISTRY_PATH}" /v ${valueName}`,
    ).toString();

    const match = output.match(/REG_SZ\s+(.+)/);
    return match ? match[1].trim() : "";
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to read registry value ${valueName}: ${error.message}`);
    throw error;
  }
};

// Helper Function - writing to registry
const writeRegistryValue = (valueName, value) => {
  try {
    execSync(
      `reg add "${REGISTRY_PATH}" /v ${valueName} /t REG_SZ /d "${value}" /f`,
    );
    logEvent(LOG_LEVELS.INFO, `Registry value ${valueName} set to ${value}`);
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to write registry value ${valueName}: ${error.message}`);
    throw error;
  }
};

// Get current settings from the registry
export const getCurrentRegistrySettings = () => {
  try {
    const settings = {
      readTime: new Date().toISOString(),
      shortDate: getRegistryValue(REGISTRY_VALUES.SHORT_DATE),
      longDate: getRegistryValue(REGISTRY_VALUES.LONG_DATE),
      shortTime: getRegistryValue(REGISTRY_VALUES.SHORT_TIME),
      longTime: getRegistryValue(REGISTRY_VALUES.LONG_TIME),
      decimal: getRegistryValue(REGISTRY_VALUES.DECIMAL),
    };
    logEvent(LOG_LEVELS.INFO, "Successfully fetched current registry settings");
    return settings;
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to get current registry settings: ${error.message}`);
    throw error;
  }
};

// Apply registry settings
export const applyRegistrySettings = (shortDate, longDate, shortTime, longTime, decimal) => {
  try {
    writeRegistryValue(REGISTRY_VALUES.SHORT_DATE, shortDate);
    writeRegistryValue(REGISTRY_VALUES.LONG_DATE, longDate);
    writeRegistryValue(REGISTRY_VALUES.SHORT_TIME, shortTime);
    writeRegistryValue(REGISTRY_VALUES.LONG_TIME, longTime);
    writeRegistryValue(REGISTRY_VALUES.DECIMAL, decimal);
    logEvent(LOG_LEVELS.INFO, "Successfully applied new registry settings");
  } catch (error) {
    logEvent(LOG_LEVELS.ERROR, `Failed to apply registry settings: ${error.message}`);
    throw error;
  }
};
