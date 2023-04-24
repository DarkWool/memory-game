import { ColorCard } from "./ColorCard";

export function CardsList({ cards, onCardClick }) {
  return (
    <>
      <section className="game_cards-board">
        {cards.map((color) => {
          return (
            <ColorCard
              key={color.id}
              color={color}
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
