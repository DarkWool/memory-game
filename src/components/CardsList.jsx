import { useState } from "react";
import { ColorCard } from "./ColorCard";

export function CardsList({ cards, cardsVariant, onCardClick }) {
  return (
    <>
      <section className="game_cards-board">
        {cards.map((color) => {
          return (
            <ColorCard
              key={color.id}
              color={color}
              variant={cardsVariant}
              onClick={() => {
                console.log(`-- ${color.name}`);
                onCardClick(color.id);
              }}
            />
          );
        })}
      </section>
    </>
  );
}
