export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  })
    .format(amount)
    .replace("NGN", "₦");
}

export function splitAmountEqually(totalAmount: number, count: number): number {
  return Math.floor((totalAmount / count) * 100) / 100;
}
