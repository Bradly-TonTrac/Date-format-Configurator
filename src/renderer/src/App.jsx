import React, {useEffect} from "react";
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
    loadosInfomation,
    loadCurrentDateSettings,
    loadDesiredSettings,
  } = useStatus();

  useEffect(() => {
    loadAdminStatus();
    loadosInfomation();
    loadCurrentDateSettings();
    loadDesiredSettings();
  }, []);

  return (
    <div className="min-h-screen text-text border y  bg-background-light">

      {/** <TopBar />*/}
      
      <ToastProvider />
      {!isAdmin && <ModeBanner />}

      <div className=" border border-border ml-1 mt-0 mr-1 p-1 rounded">
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
