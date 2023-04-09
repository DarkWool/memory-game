import { useState } from "react";
import { ColorCard } from "./ColorCard";
import { colorsData } from "../colorsData";

function shuffle(array) {
  let shuffledArr = [...array];

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
}

export function GameScreen() {
  const [score, setScore] = useState(0);
  const [clickedColors, setClickedColors] = useState([]);

  console.log(clickedColors);

  function handleColorClick(id, color) {
    console.log(`CLICKED ON: ${color}`);

    if (clickedColors.includes(id)) {
      alert("Game over, item clicked twice");
      return resetGame();
    }

    setScore((s) => s + 1);
    setClickedColors([...clickedColors, id]);
  }

  function resetGame() {
    setScore(0);
    setClickedColors([]);
  }

  const shuffledColors = shuffle(colorsData);

  return (
    <>
      <header>
        <p>
          Score: <span>{score}</span>
        </p>
      </header>
      <section className="game_cards-board">
        {shuffledColors.map((color) => {
          return (
            <ColorCard
              key={color.id}
              color={color}
              onClick={handleColorClick}
            />
          );
        })}
      </section>
    </>
  );
}
