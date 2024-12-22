export function formatDate(dateString) {
  // Parse the ISO date string into a Date object
  const date = new Date(dateString);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.getFullYear();

  // Format and return the result
  return `${day} ${month} ${year}`;
}
