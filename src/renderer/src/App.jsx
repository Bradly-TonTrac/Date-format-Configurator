import React, { useEffect } from "react";
import StatusBar from "./components/ui/StatusBar";
import CurrentSettings from "./components/ui/CurrentSettings";
import DesiredSettings from "./components/ui/DesiredSettings";
import ActionButtons from "./components/ui/ActionButtons";
import { useStatus } from "./hooks/useSettings";
import InfoFooter from "./components/ui/InfoFooter";
import ToastProvider from "./components/ui/ToastProvider";
import ModeBanner from "./components/ui/ModeBanner";
import SettingsStatus from "./components/ui/SettingsStatus";

const App = () => {
  const {
    isAdmin,
    loadAdminStatus,
    getOSInfo,
    loadCurrentDateSettings,
    loadDesiredSettings,
  } = useStatus();

  // Initial load: fetch admin status, OS info, and settings
  useEffect(() => {
    loadAdminStatus();
    getOSInfo();
    loadCurrentDateSettings();
    loadDesiredSettings();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="relative w-full max-w-none px-8 py-10">
        {/* Toast notifications container */}
        <ToastProvider />

        {/* Display settings status if admin, else show warning banner */}
        {isAdmin ? <SettingsStatus /> : <ModeBanner />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Full-width status bar */}
          <div className="lg:col-span-2">
            <StatusBar />
          </div>

          {/* Settings panels */}
          <CurrentSettings />
          <DesiredSettings />

          {/* Full-width action buttons */}
          <div className="lg:col-span-2">
            <ActionButtons />
          </div>

          {/* Full-width footer info */}
          <div className="lg:col-span-2">
            <InfoFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
