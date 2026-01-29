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

    /*
    const getStatus = async () => {
      const status = await window.api.getSettingsStatus();
      console.log(status);
    }*/
  }, []);

  return (
    <div className="min-h-screen text-text border y  bg-background">
      {/** <TopBar />*/}

      <ToastProvider />
      {!isAdmin && <ModeBanner />}

      <div className=" border-l border-r border-border ml-1 mt-0 mr-1 p-1">
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
