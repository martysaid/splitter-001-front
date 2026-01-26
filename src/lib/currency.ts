export function formatCurrency(amount: number, precision: number = 2): string {
  return `$${amount.toFixed(precision)}`;
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function centsToDollars(cents: number): number {
  return cents / 100;
}
