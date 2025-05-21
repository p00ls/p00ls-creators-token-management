import {colorMap} from './colorMap';

export type Color = keyof typeof colorMap;

export type ColorSet<T extends Color> = Extract<Color, T>;

export interface PropsWithColor {
  color: Color;
}

export function arePropsWithColor(props: unknown): props is PropsWithColor {
  return (props as PropsWithColor).color !== undefined;
}
