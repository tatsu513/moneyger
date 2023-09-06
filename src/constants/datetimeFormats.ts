export const DATE_TIME_FORMATS = {
  NORMAL_DATE: 'yyyy/MM/dd',
  SHORT_DATE: 'M/d',
  NORMAL_DATE_WITH_DAY: 'yyyy/MM/dd(EEE)',
  MONTH_AND_YEAR: 'yyyy年M月',
  MONTH_AND_YEAR_SLASH: 'yyyy/MM',
  FULL_DATE_TIME_24H: 'yyyy/MM/dd HH:mm',
  KEY_BOARD_DATE: 'yyyy年M月d日',
  KEY_BOARD_DATE_TIME_24H: 'yyyy年M月d日 HH:mm',
  MONTH: 'M月',
  YEAR: 'yyyy年',
  HOUR_MINUTE: 'HH:mm',
  HOUR_MINUTE_SECOND: 'HH:mm:ss',
} as const satisfies Record<string, string>;

export const DURATION_FORMATS = {
  HOUR_MINUTE: 'hh:mm',
} as const satisfies Record<string, string>;
