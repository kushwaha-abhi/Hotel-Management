export const formatPrice = (price) => {
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
  return amount;
};
