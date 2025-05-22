export const Numbers = {
  formatNumber,
};

interface FormatOptions {
  compact?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

function formatNumber(number: number, options: FormatOptions = {}): string {
  const {
    compact = false,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;
  if (number === 0) {
    return '0';
  }
  const minimalNumber = getMinimalNumber();
  return number < minimalNumber
    ? `< ${minimalNumber}`
    : getAmountWithNotation();

  function getMinimalNumber() {
    return maximumFractionDigits === 0 ? 0 : 1 / 10 ** maximumFractionDigits;
  }

  function getAmountWithNotation() {
    return new Intl.NumberFormat('en-US', {
      notation: compact ? 'compact' : 'standard',
      minimumFractionDigits,
      maximumFractionDigits,
    } as Intl.NumberFormatOptions).format(number);
  }
}
