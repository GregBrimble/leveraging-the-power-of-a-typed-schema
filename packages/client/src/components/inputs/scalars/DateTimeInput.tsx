import React, { useState, useEffect } from "react";
import TimeZoneInput from "../TimeZoneInput";
import { deconstructDate, constructDate } from "../../../utils/date";
import { safelyOnChange } from "../../../utils/input";

interface DateTimeInputProps {
  defaultValue?: Date;
  onChange?: (value?: Date) => void;
  includeTime?: boolean;
  collapsedTimeZone?: boolean;
}

// TODO: Fix time when includeTime = false
const DateTimeInput: React.FC<DateTimeInputProps> = ({
  defaultValue,
  onChange,
  includeTime = true,
  collapsedTimeZone: initCollapsedTimeZone = true
}) => {
  let defaultDate: string | undefined;
  let defaultTime: string | undefined;
  let defaultTimeZone: string | undefined;
  if (defaultValue !== undefined) {
    const { date, time, timeZone } = deconstructDate(defaultValue);
    defaultDate = date;
    defaultTime = time;
    defaultTimeZone = timeZone;
  }
  defaultTimeZone = defaultTimeZone || "+00:00";

  const [collapsedTimeZone, setCollapsedTimeZone] = useState(
    initCollapsedTimeZone
  );
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [timeZone, setTimeZone] = useState(defaultTimeZone);
  const [timeZoneInput, setTimeZoneInput] = useState(
    <TimeZoneInput defaultValue={defaultTimeZone} onChange={setTimeZone} />
  );

  useEffect(() => {
    let value;
    if (date !== undefined && !includeTime) {
      value = constructDate(date);
    }
    if (date !== undefined && time !== undefined && timeZone !== undefined) {
      value = constructDate(date, time, timeZone);
    }
    safelyOnChange(value, onChange);
  }, [date, time, timeZone]);

  useEffect(() => {
    if (date !== undefined && time !== undefined) {
      if (collapsedTimeZone) {
        const valueWithoutTimezone = constructDate(date, time);
        const defaultTimeZone = deconstructDate(valueWithoutTimezone).timeZone;
        setTimeZone(defaultTimeZone);
        setTimeZoneInput(
          <TimeZoneInput
            defaultValue={defaultTimeZone}
            onChange={setTimeZone}
            autoFocus
          />
        );
      }
    }
  }, [date, time, collapsedTimeZone]);

  return (
    <div>
      <input
        type="date"
        className="form-input"
        defaultValue={date}
        onChange={e => setDate(e.target.value)}
      />
      {includeTime ? (
        <>
          <input
            type="time"
            className="form-input"
            defaultValue={time}
            onChange={e => setTime(e.target.value)}
          />
          {collapsedTimeZone ? (
            <button onClick={() => setCollapsedTimeZone(false)}>
              Time zone
            </button>
          ) : (
            timeZoneInput
          )}
        </>
      ) : (
        undefined
      )}
    </div>
  );
};

export default DateTimeInput;
