export const parseDashedDate = (date) => {
  const curDate = new Date(date);

  const curYear = curDate.getFullYear();
  const month = String(curDate.getMonth() + 1);
  const day = String(curDate.getDate());

  return `${curYear}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`;
};
