export const booleanFromString = (value: string): boolean =>
  value.toLowerCase() === "true";

export const booleanToString = (value: boolean): string => value.toString();
