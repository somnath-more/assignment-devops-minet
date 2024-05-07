export const getProfitOrLossPercentage = (data) => {
  const lowest = Math.min(...data.map((element) => element.amount));
  const first = data[0].amount;
  const last = data[data.length - 1].amount;
  const percentage = ((last - first) / first) * 100;
  return {
    lowest,
    percentage,
  };
};
export const convertToShortFormNumber = (number) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
};
