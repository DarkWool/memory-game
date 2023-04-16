import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/Tooltip.css";

export function Tooltip({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const wrapperRef = useRef(null);
  let timer = useRef(null);

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const wrapper = wrapperRef.current;

    if (isVisible) {
      const resizeTooltip = () => {
        clearTimeout(timer);
        timer = setTimeout(() => placeTooltip(), 100);
      };

      const placeTooltip = () => {
        console.log("RESIZED -----%%%%%------");
        const windowInnerWidth = window.innerWidth;
        const windowInnerHeight = window.innerHeight;

        tooltip.classList.add("tooltip-out-of-screen");

        // Get appropiate dimensions of the tooltip element and the button which causes it to be visible
        const { width: tooltipWidth, height: tooltipHeight } =
          tooltip.getBoundingClientRect();
        const { top, left, width, height } = wrapper.getBoundingClientRect();

        let x = left - tooltipWidth / 2 + width / 2;
        const y = top - tooltipHeight < 0 ? top + height : top - tooltipHeight;

        // If the tooltip can't be centered due to insufficient viewport width
        // you have to adjust it and stick it to the right side
        const widthNeeded = x + tooltipWidth;
        if (widthNeeded > windowInnerWidth) x += windowInnerWidth - widthNeeded;

        tooltip.style.transform = `translate(${x}px, ${y}px)`;
        tooltip.style.top = "0px";
        tooltip.style.left = "0px";
        tooltip.classList.remove("tooltip-out-of-screen");
      };

      placeTooltip();
      window.addEventListener("resize", resizeTooltip);

      return () => {
        window.removeEventListener("resize", resizeTooltip);
      };
    }
  }, [isVisible]);

  console.log("*--- Rendered");
  const tooltipMarkup = (
    <div
      className="tooltip"
      ref={tooltipRef}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="tooltip_content">
        <div style={{ fill: "white", flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
          </svg>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          iaculis urna nec dictum viverra. Nulla vestibulum diam id nunc
          consectetur elementum. Vestibulum posuere ante vitae maximus placerat.
          Phasellus eleifend eu massa vel lacinia. Sed sed posuere tellus, et
          luctus metus. Integer accumsan quis lectus nec rhoncus. Ut malesuada
          commodo urna ut auctor. Fusce hendrerit lectus id cursus mollis.
        </div>
      </div>

      <div className="tooltip_arrow down"></div>
    </div>
  );

  function handleOnMouseEnter() {
    setIsVisible(true);
  }

  function handleOnMouseLeave(e) {
    const related = e.relatedTarget;
    if (related && related.closest && related.closest(".tooltip")) return;

    setIsVisible(false);
  }

  return (
    <>
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        ref={wrapperRef}
      >
        {children}
      </div>
      {isVisible && createPortal(tooltipMarkup, document.body)}
    </>
  );
}
