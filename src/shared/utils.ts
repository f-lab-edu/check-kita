export const changedMoneyFormat = (number: number): string => {
  return new Intl.NumberFormat('ko-KR').format(number);
};
