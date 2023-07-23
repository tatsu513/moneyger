import { DateTime } from 'luxon';
import { DATE_TIME_FORMATS } from '@/constants/datetimeFormats';

const PrismaDateToFrontendDateStr = (
  prismaDate: string,
  format: string = DATE_TIME_FORMATS.NORMAL_DATE,
) => {
  const dateTime = DateTime.fromISO(prismaDate);
  if (!dateTime.isValid) {
    throw new Error('Datetime型へ変換できませんでした。');
  }
  return dateTime.toFormat(format);
};

export default PrismaDateToFrontendDateStr;
