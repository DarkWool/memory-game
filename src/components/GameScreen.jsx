import { useState, useMemo } from "react";
import { CardsList } from "./CardsList";
import { colorsData } from "../colorsData";
import { GameHeader } from "./GameHeader";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { shuffle } from "../utils/shuffle";
import sadFace from "../assets/disappointed-face.png";

const scorePerLevel = [5, 12, 22, 34, 49];

export function GameScreen({ mode }) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedColors, setClickedColors] = useState([]);

  function handleCardClick(id) {
    if (isGameOver || clickedColors.includes(id)) {
      return handleGameOver();
    }

    setScore((s) => s + 1);

    if (!updateLevel()) setClickedColors([...clickedColors, id]);
  }

  function updateLevel() {
    const nextScore = score + 1;
    const scoreNeeded = scorePerLevel[level - 1];
    if (nextScore === scoreNeeded) {
      // Start the next level by resetting the clicked colors
      setClickedColors([]);
      setLevel((l) => l + 1);
      return true;
    }
  }

  function handleGameOver() {
    if (score > bestScore) setBestScore(score);

    setIsGameOver(true);
  }

  function handleResetGame() {
    setIsGameOver(false);
    setLevel(1);
    setScore(0);
    setClickedColors([]);
  }

  // Get a random array from data for the current level
  const levelColors = useMemo(() => {
    const index = level - 1;
    const numberOfCards =
      index === 0
        ? scorePerLevel[0]
        : scorePerLevel[index] - scorePerLevel[index - 1];

    return shuffle(colorsData).slice(0, numberOfCards);
  }, [level, isGameOver]);
  // Re-shuffle the level colors / cards so they are on different position each time
  const shuffledColors = shuffle(levelColors);

  return (
    <>
      <GameHeader bestScore={bestScore} score={score} level={level} />
      <CardsList
        cards={shuffledColors}
        cardsVariant={mode}
        onCardClick={handleCardClick}
      />

      <Modal isVisible={isGameOver} styles="game-over">
        <div>
          <img src={sadFace} alt="Sad face" className="game-over_status-face" />
        </div>
        <div>
          <h2 className="game-over_title">
            You have <span className="title-underline">LOST!</span>
          </h2>
          <p>
            {" "}
            Vivamus pulvinar neque in ante pharetra rutrum. Mauris eget
            elementum turpis. Fusce sollicitudin faucibus massa, in tincidunt
            augue vestibulum non. Sed eget mi eu lacus pharetra pulvinar. Proin
            venenatis sagittis arcu, in dignissim enim vulputate ut. Vivamus
            porttitor, quam quis dictum suscipit, lacus purus pretium ipsum, vel
            lacinia nisi lectus vel elit. Donec nec sapien ex. Fusce sagittis,
            nulla eu faucibus porta, leo quam ornare lectus, nec euismod mauris
            justo in turpis. Vestibulum maximus et mi in pulvinar.
          </p>

          <div className="game-over_btns-container">
            <Button
              variant="accent"
              styles="text-transform-upper"
              onClick={handleResetGame}
            >
              Play again
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
