import type { Style, InitProps } from "./types.js";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function createComparison(initProps?: InitProps) {
  const props = $state({
    orientation: initProps?.orientation ?? "horizontal",
    position: initProps?.position ?? 50,
  });

  let position = $state(props.position);

  const rootStyle: Style = $derived({
    touchAction: props.orientation === "horizontal" ? "pan-y" : "pan-x",
    position: "relative",
    overflow: "hidden",
    cursor: props.orientation === "horizontal" ? "ew-resize" : "ns-resize",
  });

  let root = $state<HTMLElement | null>(null);

  const setPosition = (event: PointerEvent) => {
    if (!root) return;
    const bounds = root.getBoundingClientRect();

    const max =
      props.orientation === "horizontal" ? root.offsetWidth : root.offsetHeight;
    const value =
      props.orientation === "horizontal" ? event.clientX : event.clientY;
    const offset =
      props.orientation === "horizontal" ? bounds.left : bounds.top;

    position = clamp(((value - offset) / max) * 100, 0, 100);
  };

  const rootProps = $derived({
    style: toStyleString(rootStyle as Record<string, number | string>),
    onpointerdown: (event: PointerEvent) => {
      event.preventDefault();

      if (!event.currentTarget) return;
      root = event.currentTarget as HTMLElement;

      setPosition(event);
      const target = event.target as HTMLElement;
      target.setPointerCapture(event.pointerId);

      target.onpointermove = (e) => {
        setPosition(e);
      };
      target.onpointerup = () => {
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
        }
        target.onpointermove = null;
        target.onpointerup = null;
        root = null;
      };
    },
  });

  const panelAProps = $derived({
    style: toStyleString({
      clipPath:
        props.orientation === "horizontal"
          ? `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`
          : `polygon(0 0, 100% 0, 100% ${position}%, 0 ${position}%)`,
    }),
  });
  const panelBProps = $derived({
    style: toStyleString({
      clipPath:
        props.orientation === "horizontal"
          ? `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`
          : `polygon(0 ${position}%, 100% ${position}%, 100% 100%, 0 100%)`,
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
    }),
  });

  const handleProps = $derived({
    style: toStyleString({
      position: "absolute",
      top: props.orientation === "horizontal" ? 0 : `${position}%`,
      left: props.orientation === "horizontal" ? `${position}%` : 0,
      display: "flex",
      width: props.orientation === "horizontal" ? undefined : "100%",
      height: props.orientation === "horizontal" ? "100%" : undefined,
      flexDirection: props.orientation === "horizontal" ? "column" : "row",
      alignItems: "center",
      transform: `translate(${props.orientation === "horizontal" ? "-50" : "0"}%, ${props.orientation === "vertical" ? "-50" : "0"}%)`,
    }),
    "aria-label": "Drag to move",
    role: "slider",
    "aria-valuenow": position,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-orientation": props.orientation,
  });

  return {
    rootProps,
    get panelAProps() {
      return panelAProps;
    },
    get panelBProps() {
      return panelBProps;
    },
    get position() {
      return position;
    },
    get handleProps() {
      return handleProps;
    },
  };
}

// https://github.com/chakra-ui/zag/blob/5401dd5bc16e3ff8904e974931cda28ad5986fd4/packages/frameworks/svelte/src/normalize-props.ts#L15
function toStyleString(style: Record<string, number | string | undefined>) {
  let string = "";

  for (let key in style) {
    /**
     * Ignore null and undefined values.
     */
    const value = style[key];
    if (value === null || value === undefined) continue;

    /**
     * Convert camelCase to kebab-case except for CSS custom properties.
     */
    if (!key.startsWith("--"))
      key = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    string += `${key}:${value};`;
  }

  return string;
}
