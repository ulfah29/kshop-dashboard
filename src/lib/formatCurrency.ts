export const formatCurrency = (amount, currency) => {
  //for idr no decimal, others decimal 1,00
  const fractionRules = currency === 'IDR' ? 0 : 2;
  const localeRules = currency === 'IDR' ? 'id-ID' : 'en-US'

  const amountFormatted = new Intl.NumberFormat(localeRules, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionRules,
  }).format(amount);

  return amountFormatted;
}

// formatCurrency(1234.56);              // "$1,234.56"
// formatCurrency(1234.56, 'IDR', 'id-ID'); // "Rp 1.234,56"
// formatCurrency(99.9, 'EUR', 'de-DE'); // "99,90 €"