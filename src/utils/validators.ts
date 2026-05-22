/**
 * Validates if a value is a valid number.
 *
 * @param {string|number} value - Value to validate.
 *
 * @returns {boolean} True if valid number, false otherwise.
 */
export const isValidNumber = (value: string | number): boolean => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return !Number.isNaN(numericValue) && Number.isFinite(numericValue);
};

/**
 * Validates if a value is a valid positive number.
 *
 * @param {string|number} value - Value to validate.
 *
 * @returns {boolean} True if valid positive number, false otherwise.
 */
export const isValidPositiveNumber = (value: string | number): boolean => {
  return isValidNumber(value) && (typeof value === 'number' ? value >= 0 : parseFloat(value) >= 0);
};

/**
 * Validates if a value is a valid year (1900-2100).
 *
 * @param {string|number} value - Value to validate.
 *
 * @returns {boolean} True if valid year, false otherwise.
 */
export const isValidYear = (value: string | number): boolean => {
  if (!isValidNumber(value)) return false;
  const yearValue = typeof value === 'string' ? parseInt(value, 10) : value;
  return yearValue >= 1900 && yearValue <= 2100;
};

/**
 * Validates if a string is not empty.
 *
 * @param {string} value - Value to validate.
 *
 * @returns {boolean} True if not empty, false otherwise.
 */
export const isNotEmpty = (value: string): boolean => value.trim().length > 0;

/**
 * Validates if a value is a valid boolean.
 *
 * @param {unknown} value - Value to validate.
 *
 * @returns {boolean} True if valid boolean, false otherwise.
 */
export const isValidBoolean = (value: unknown): boolean => {
  return typeof value === 'boolean' || value === 'true' || value === 'false';
};

/**
 * Sanitizes string input to prevent XSS attacks.
 *
 * @param {string} input - Input string to sanitize.
 *
 * @returns {string} Sanitized string.
 */
export const sanitizeInput = (input: string): string => input.replace(/[<>]/g, '').trim().slice(0, 100);
