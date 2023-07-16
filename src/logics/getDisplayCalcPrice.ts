const getDisplayCalcPrice = (currentPrice: number, limitPrice: number) => {
  return (currentPrice - limitPrice).toLocaleString();
};

export default getDisplayCalcPrice;
