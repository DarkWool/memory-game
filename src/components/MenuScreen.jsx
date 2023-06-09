import { Heading } from "./Heading";
import { Button } from "./Button";
import { Tooltip } from "./Tooltip";
import { colorsData } from "../colorsData";
import { ColorCard } from "./ColorCard";

const menuColors = colorsData.filter(
  (color) => color.id === "c68" || color.id === "c54" || color.id === "c57"
);

export function MenuScreen({ onGameStart }) {
  const tooltipContent = (
    <>
      <div style={{ fill: "white", flexShrink: 0 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
        </svg>
      </div>
      <div>
        <Heading level={2} styles="menu_tooltip-title">
          How to play?
        </Heading>
        <p>
          The goal is to avoid clicking the same color twice. After you click
          one of the colors, they will be shuffled and you need to click on
          another color, but <b>it can't be one that has been clicked before</b>{" "}
          or the <b>game will be over.</b>
        </p>
        <p>
          In <b>expert mode</b> you will have to trust in your eyes more than
          ever for the colors will have no name this time!
        </p>
      </div>
    </>
  );

  return (
    <div className="menu-wrapper">
      <section className="menu">
        <div className="menu_content">
          <div className="d-inline-block">
            <a
              href="https://github.com/DarkWool/memory-game"
              target="_blank"
              className="btn-primary btn-icon m-auto-h"
            >
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                aria-hidden="true"
              >
                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
              </svg>
              DarkWool
            </a>
          </div>

          <div className="menu_content-title">
            <Heading styles="main-title menu_title">
              Remember <br />
              <span className="text-stroke text-transparent">my</span> color
            </Heading>

            <div className="menu_help">
              <Tooltip content={tooltipContent}>
                <Button variant="secondary" styles="btn-circular">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />
                  </svg>
                </Button>
              </Tooltip>
            </div>
          </div>

          <Heading level={2} styles="menu_subtitle">
            Memory Game
          </Heading>
          <div className="menu_game-modes">
            <Button variant="secondary" onClick={() => onGameStart("normal")}>
              PLAY
            </Button>
            <Button variant="secondary" onClick={() => onGameStart("expert")}>
              EXPERT MODE
            </Button>
          </div>
        </div>

        <div className="menu_deco-col">
          <ColorCard color={menuColors[0]} inlineStyles={{ "--order": 0 }} />
          <ColorCard color={menuColors[1]} inlineStyles={{ "--order": 1 }} />
          <ColorCard color={menuColors[2]} inlineStyles={{ "--order": 2 }} />
        </div>
      </section>
    </div>
  );
}
