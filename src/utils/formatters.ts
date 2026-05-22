/**
 * Formats a cost value to USD currency string.
 *
 * @param {number} cost - Cost value in dollars.
 *
 * @returns {string} Formatted cost string (e.g., "$0.01").
 */
export const formatCost = (cost: number): string => `$${cost.toFixed(2)}`;

/**
 * Formats large numbers with K/M suffixes for readability.
 *
 * @param {number} num - Number to format.
 *
 * @returns {string} Formatted number string (e.g., "1.5M", "500K").
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
};

/**
 * Extracts year from a date string.
 *
 * @param {string} dateStr - Date string (e.g., "2024-01-15").
 *
 * @returns {number} Year as number or 0 if invalid.
 */
export const extractYear = (dateStr: string): number => {
  if (!dateStr || dateStr === 'N/A') return 0;
  const parsedYear = parseInt(dateStr.split('-')[0], 10);
  return Number.isNaN(parsedYear) ? 0 : parsedYear;
};
