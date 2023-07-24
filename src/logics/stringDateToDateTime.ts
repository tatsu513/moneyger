import { DateTime } from 'luxon';

const stringDateToDateTime = (date: string) => {
  const dateTime = DateTime.fromISO(date);
  // TODO: 変換失敗時のエラー処理を追加
  return dateTime;
};

export default stringDateToDateTime;
