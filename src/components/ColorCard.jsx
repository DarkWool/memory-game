import "../styles/ColorCard.css";

export function ColorCard({ color, onClick, inlineStyles }) {
  return (
    <button
      type="button"
      className={`color-card ${color.styles}`}
      onClick={onClick}
      style={inlineStyles}
    >
      <div className="color-card_bg"></div>
      <div className="color-card_content">{color.name}</div>
    </button>
  );
}
