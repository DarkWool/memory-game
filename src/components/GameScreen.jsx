import { useState, useMemo } from "react";
import { ColorCard } from "./ColorCard";
import { colorsData } from "../colorsData";
import { GameHeader } from "./GameHeader";

function shuffle(array) {
  let shuffledArr = [...array];

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
}

const scorePerLevel = [5, 12, 22, 34, 49];

export function GameScreen() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [clickedColors, setClickedColors] = useState([]);

  function handleColorClick(id) {
    if (clickedColors.includes(id)) {
      alert("Game over, item clicked twice");
      return resetGame();
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

  function resetGame() {
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
  }, [level]);
  // Re-shuffle the level colors / cards so they are on different position each time
  const shuffledColors = shuffle(levelColors);

  return (
    <>
      <GameHeader score={score} level={level} />
      <section className="game_cards-board">
        {shuffledColors.map((color) => {
          return (
            <ColorCard
              key={color.id}
              color={color}
              onClick={() => {
                console.log(`-- ${color.name}`);
                handleColorClick(color.id);
              }}
            />
          );
        })}
      </section>
    </>
  );
}
