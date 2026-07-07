// Rounds a value up to a "nice" number (1/2/5 * 10^n) so axis gridlines land
// on clean values regardless of the data's magnitude (tens vs. thousands).
export const niceCeil = (value: number) => {
  if (value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const fraction = value / 10 ** exponent;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * 10 ** exponent;
};

// Nice round ceiling for an axis with `divisions` gridline intervals above 0.
export const niceAxisMax = (maxValue: number, divisions = 4) =>
  niceCeil(Math.max(maxValue, 1) / divisions) * divisions;

export const formatAxisValue = (v: number) => {
  if (v === 0) return "0";
  return v >= 1000 ? `${v / 1000}K` : `${v}`;
};
