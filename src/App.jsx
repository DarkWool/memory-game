import { useState } from "react";
import { MenuScreen } from "./components/MenuScreen";
import { GameScreen } from "./components/GameScreen";
import colorNamesImg from "./assets/images/color-names-1x.png";

function App() {
  const [gameMode, setGameMode] = useState(null);

  const handleChangeGameMode = (mode) => {
    console.log(mode);
    mode ? setGameMode(mode) : setGameMode(null);
  };

  return (
    <>
      {gameMode ? (
        <GameScreen gameMode={gameMode} onBackToMenu={handleChangeGameMode} />
      ) : (
        <MenuScreen onGameStart={handleChangeGameMode} />
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
