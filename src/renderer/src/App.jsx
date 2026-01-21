import React from "react";
import TopBar from "./components/ui/TopBar";
import StatusBar from "./components/ui/StatusBar";
import CurrentSettings from "./components/ui/CurrentSettings";
import DesiredSettings from "./components/ui/DesiredSettings";
import ActionButtons from "./components/ui/ActionButtons";
const App = () => {
  return (
    <div className="min-h-screen text-text bg-background-light">
      <TopBar />
      <StatusBar />
      <CurrentSettings />
      <DesiredSettings />
      <ActionButtons />
    </div>
  );
};

export default App;
