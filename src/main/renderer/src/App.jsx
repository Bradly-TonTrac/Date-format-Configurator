import React from "react";
import ActionButtons from "./components/ui/ActionButtons";
import CurrentSettings from "./components/ui/CurrentSettings";
import DesiredSettings from "./components/ui/DesiredSettings";
import StatusBar from "./components/ui/StatusBar";

const App = () => {
  return (
    <div className="flex justify-center bg-background-light text-text">
      <StatusBar />
      <CurrentSettings />
      <DesiredSettings />
      <ActionButtons />
    </div>
  );
};

export default App;
