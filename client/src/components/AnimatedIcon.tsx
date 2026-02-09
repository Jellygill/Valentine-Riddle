/**
 * Wrapper for animatedicons.co embed. Uses pink theme.
 */
import { createElement } from "react";

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
  return createElement("animated-icons", {
    src,
    trigger,
    attributes: JSON.stringify(PINK_ATTRS),
    height,
    width,
    className,
  });
}
