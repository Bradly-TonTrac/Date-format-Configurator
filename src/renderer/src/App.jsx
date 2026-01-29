import React, { useEffect } from "react";
import TopBar from "./components/ui/TopBar";
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
    <div className="min-h-screen bg-background text-text flex justify-center py-8">
      {/** <TopBar />*/}

      <div className="relative w-[1024px] h-[760px] bg-secondary rounded-xl border border-border p-4 overflow-y-auto">
        <ToastProvider />
        {isAdmin ? <SettingsStatus /> : <ModeBanner />}

        <StatusBar />
        <CurrentSettings />
        <DesiredSettings />
        <ActionButtons />
        <InfoFooter />
      </div>
    </div>
  );
};

export default App;
