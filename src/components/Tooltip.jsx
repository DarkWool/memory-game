import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/Tooltip.css";

export function Tooltip({ children, content }) {
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

  function handleOnMouseEnter() {
    setIsVisible(true);
  }

  function handleOnMouseLeave(e) {
    const related = e.relatedTarget;
    if (related && related.closest && related.closest(".tooltip")) return;

    setIsVisible(false);
  }

  console.log("*--- Rendered");

  const tooltipMarkup = (
    <div
      className="tooltip"
      ref={tooltipRef}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="tooltip_content">{content}</div>
      <div className="tooltip_arrow down"></div>
    </div>
  );

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
