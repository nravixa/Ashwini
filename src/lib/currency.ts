export const CURRENCY_SYMBOL = "₹";

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "number" ? price : parseFloat(price) || 0;
  // Format with the currency symbol
  return `${CURRENCY_SYMBOL}${numPrice.toLocaleString("en-IN")}`;
}
