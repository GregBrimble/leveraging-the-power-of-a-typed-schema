const optionalCallback = <T>(callback?: (value?: T) => void, value?: T) => {
  if (callback !== undefined) callback(value);
};

export const safelyOnChange = <U, T>(
  value: U,
  onChange?: (value?: T) => void,
  converter: (value: U) => T = value => (value as unknown) as T
) => {
  if (value === undefined) optionalCallback(onChange, undefined);
  let convertedValue;
  try {
    convertedValue = converter(value);
  } catch {}
  optionalCallback(onChange, convertedValue);
};
