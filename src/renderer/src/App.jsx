import React, { useEffect } from "react";
//import TopBar from "./components/ui/TopBar";
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

  useEffect(() => {
    loadAdminStatus();
    getOSInfo();
    loadCurrentDateSettings();
    loadDesiredSettings();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      {/** <TopBar />*/}

      <div className="relative w-full max-w-none px-8 py-10">
        <ToastProvider />
        {isAdmin ? <SettingsStatus /> : <ModeBanner />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <StatusBar />
          </div>
          <CurrentSettings />
          <DesiredSettings />
          <div className="lg:col-span-2">
            <ActionButtons />
          </div>
          <div className="lg:col-span-2">
            <InfoFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
