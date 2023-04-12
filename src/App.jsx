import { useState } from "react";
import { MenuScreen } from "./components/MenuScreen";
import { GameScreen } from "./components/GameScreen";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  function handleGameStart() {
    setIsGameStarted(true);
  }

  return (
    <>
      {isGameStarted ? (
        <GameScreen />
      ) : (
        <MenuScreen onGameStart={handleGameStart} />
      )}
    </>
  );
}

export default App;
