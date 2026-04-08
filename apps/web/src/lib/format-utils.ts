export function parsePrice(priceString: string): number {
  return Number(priceString.replace(/,/g, ''));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatQuantity(amount: number, decimals: number = 6): string {
  if (amount === 0) return '0';
  const factor = Math.pow(10, decimals);
  const rounded = Math.floor(amount * factor) / factor;
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
