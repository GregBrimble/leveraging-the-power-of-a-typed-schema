export const floatFromString = (value: string, fractionDigits?: number) => {
  let floatValue: string | number = parseFloat(value);
  if (fractionDigits !== undefined)
    floatValue = floatValue.toFixed(fractionDigits);

  return Number(floatValue);
};

export const floatToString = (value: number, fractionDigits?: number) => {
  // TODO: Fix floating point errors
  let floatValue = Number(value);
  if (fractionDigits !== undefined) return floatValue.toFixed(fractionDigits);

  return floatValue.toString();
};
