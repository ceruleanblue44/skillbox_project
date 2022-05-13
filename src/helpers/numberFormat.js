export default function numberFormat(value) {
  return typeof value === 'number' ? new Intl.NumberFormat('ru-RU').format(value) : '';
}
