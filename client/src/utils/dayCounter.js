export const dayCounter = (checkInDate, checkOutDate) => {
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  const diffTime = Math.abs(endDate - startDate);

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays);
  return diffDays;
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export const formatPrice = (price) => {
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
  return amount;
};
