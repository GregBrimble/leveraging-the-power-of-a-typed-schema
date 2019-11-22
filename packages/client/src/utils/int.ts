import { floatFromString, floatToString } from "./float";

export const intFromString = (value: string): number => floatFromString(value, 0);
export const intToString = (value: number): string =>
  floatToString(value, 0);
