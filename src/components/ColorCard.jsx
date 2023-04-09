import "../styles/ColorCard.css";

export function ColorCard({ color, onClick }) {
  return (
    <button
      type="button"
      className={`color-card ${color.styles}`}
      onClick={(e) => onClick(color.id, color.name)}
    >
      <div className="color-card_bg"></div>
      <div className="color-card_content">{color.name}</div>
    </button>
  );
}
