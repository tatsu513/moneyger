import { blue, grey, red } from '@/color';

/**
 * 金額の文字色を取得する関数
 * プラス：color: blue[500], bg: blue[100]
 * マイナス：color: red[900], bg: red[100]
 * 0：color: grey[900], bg: grey[100]
 */
const getPriceColorAndBgColor = (price: number) => {
  if (price === 0) {
    return { color: grey[900], bgColor: grey[100] };
  }
  if (price < 0) {
    return { color: red[900], bgColor: red[100] };
  }
  return { color: blue[500], bgColor: blue[100] };
};

export default getPriceColorAndBgColor;
