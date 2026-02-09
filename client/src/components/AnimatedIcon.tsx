/**
 * Wrapper for animatedicons.co embed. Uses pink theme.
 * Auto-plays animation on load by triggering a click after mount.
 */
import { createElement, useRef, useEffect } from "react";

const PINK_ATTRS = {
  variationThumbColour: "#EC4899",
  variationName: "Two Tone",
  variationNumber: 2,
  numberOfGroups: 2,
  backgroundIsGroup: false,
  strokeWidth: 1,
  defaultColours: {
    "group-1": "#000000",
    "group-2": "#EC4899",
    background: "#FFFFFF",
  },
};

type AnimatedIconProps = {
  src: string;
  width?: number;
  height?: number;
  trigger?: "click" | "hover";
  className?: string;
};

export function AnimatedIcon({
  src,
  width = 120,
  height = 120,
  trigger = "click",
  className = "",
}: AnimatedIconProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const icon = wrapper.querySelector("animated-icons") as HTMLElement | null;
    if (icon) {
      const t = setTimeout(() => icon.click(), 150);
      return () => clearTimeout(t);
    }
  }, [src]);

  return createElement(
    "div",
    { ref: wrapperRef, className: "inline-block", style: { lineHeight: 0 } },
    createElement("animated-icons", {
      src,
      trigger,
      attributes: JSON.stringify(PINK_ATTRS),
      height,
      width,
      className,
    })
  );
}
