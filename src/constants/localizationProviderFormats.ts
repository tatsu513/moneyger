import { DateIOFormats } from '@date-io/core/IUtils';
import { DATE_TIME_FORMATS } from '@/constants/datetimeFormats';

export const LOCALIZATION_FORMATS: Readonly<Partial<DateIOFormats>> = {
  normalDate: DATE_TIME_FORMATS.NORMAL_DATE,
  shortDate: DATE_TIME_FORMATS.SHORT_DATE,
  monthAndYear: DATE_TIME_FORMATS.MONTH_AND_YEAR,
  fullDateTime24h: DATE_TIME_FORMATS.FULL_DATE_TIME_24H,
  keyboardDate: DATE_TIME_FORMATS.KEY_BOARD_DATE,
  keyboardDateTime24h: DATE_TIME_FORMATS.KEY_BOARD_DATE_TIME_24H,
  month: DATE_TIME_FORMATS.MONTH,
  year: DATE_TIME_FORMATS.YEAR,
};
