import moment from "moment";

const getDate = (date: Date) => dateToString(date, "YYYY-MM-DD");

const getTime = (date: Date) => dateToString(date, "HH:mm");

const getTimeZone = (date: Date): string => dateToString(date, "Z");

export const deconstructDate = (
  date: Date
): { date: string; time: string; timeZone: string } => {
  console.log(date, getDate(date));
  return {
    date: getDate(date),
    time: getTime(date),
    timeZone: getTimeZone(date)
  };
};

export const constructDate = (
  date: string,
  time?: string,
  timeZone?: string
) => {
  let dateString = date;
  if (time !== undefined) {
    if (timeZone === undefined) {
      dateString = `${date}T${time}`;
    } else {
      dateString = `${date}T${time}${timeZone}`;
    }
  }
  return dateFromString(dateString);
};

export const dateFromString = (value: string): Date => {
  return new Date(value);
};

export const dateToString = (value: Date, format?: string): string => {
  const date = moment(value);
  if (format) return date.format(format);

  return date.fromNow();
};
