import { clsx, type ClassValue } from 'clsx';

/**
 * Merges class names using clsx utility.
 *
 * @param {...ClassValue[]} inputs - Class names to merge.
 *
 * @returns {string} Merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
