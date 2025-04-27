export default function formatNum(number: number): string {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
}
