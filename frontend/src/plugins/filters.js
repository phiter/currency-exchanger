export const currency = (value) => {
  if (value === undefined || value === null) return '';

  return Number((value).toFixed(2)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
};

export const date = (timestamp) => new Date(timestamp).toLocaleString();
