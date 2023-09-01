import { DateTime } from 'luxon';

const getJstDateTimeFromJsDate = (date: Date) => {
  const dateTime = DateTime.fromJSDate(date).plus({ hours: 9 });
  return { dateTime, str: dateTime.toISO() };
};

export default getJstDateTimeFromJsDate;
