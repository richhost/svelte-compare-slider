export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// https://github.com/chakra-ui/zag/blob/5401dd5bc16e3ff8904e974931cda28ad5986fd4/packages/frameworks/svelte/src/normalize-props.ts#L15
export function toStyleString(
  style: Record<string, number | string | undefined>
) {
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
