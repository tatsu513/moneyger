import { DateTime } from 'luxon';

const dateTimeToStringDate = (dateTime: DateTime) => {
  const val = dateTime.toISO();
  if (val == null) {
    throw new Error('dateTimeからStringへ変換できませんでした');
  }
  return val;
};

export default dateTimeToStringDate;
