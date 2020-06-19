// eslint-disable-next-line import/prefer-default-export
export const currency = (value) => {
  if (value === undefined || value === null) return '';

  return Number((value).toFixed(2)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
};
