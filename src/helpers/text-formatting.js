import camelCase from 'camelcase';

export const toCamelCase = (text) => camelCase(text);
export const applyCurrency = (value) => (typeof value === 'number' ? value.toLocaleString('en-PH', {
  style: 'currency',
  currency: 'PHP',
  currencySign: 'accounting',
}) : null);
