const numberFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || amount === "") {
    return "Negotiable";
  }

  const value = Number(amount);
  if (!Number.isFinite(value)) {
    return "Negotiable";
  }

  return `PKR ${numberFormatter.format(value)}`;
};
