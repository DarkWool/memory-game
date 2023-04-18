import { useState } from "react";
import { MenuScreen } from "./components/MenuScreen";
import { GameScreen } from "./components/GameScreen";
import colorNamesImg from "./assets/color-names-1x.png";

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
      <img
        src={colorNamesImg}
        alt="Multiple color names like Cyan, Green, Purple, Blue, etc..."
        className="root_deco-img"
      />
    </>
  );
}

export default App;
