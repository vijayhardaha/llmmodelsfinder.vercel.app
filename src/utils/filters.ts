import type { FilterState, Model } from '@/types/models';

import { extractYear } from './formatters';

/**
 * Converts a select value to a boolean or null for filtering.
 *
 * @param {string} value - The string value ('true', 'false', or 'any').
 *
 * @returns {boolean | null} `true` for 'true', `false` for 'false', `null` for 'any'.
 */
export const booleanValue = (value: string): boolean | null => (value === 'any' ? null : value === 'true');

/**
 * Converts a boolean or null filter value to a display string.
 *
 * @param {boolean | null} value - The filter value.
 *
 * @returns {string} `'true'` for true, `'false'` for false, `'any'` for null.
 */
export const booleanDisplay = (value: boolean | null): string => (value === null ? 'any' : String(value));

/**
 * Applies filters to a models array based on filter state.
 *
 * @param {Model[]} models - Array of models to filter.
 * @param {FilterState} filters - Filter state object.
 *
 * @returns {Model[]} Filtered models array.
 */
export const applyFilters = (models: Model[], filters: FilterState): Model[] => {
  return models.filter((modelItem) => {
    if (filters.search) {
      const searchLowerValue = filters.search.toLowerCase();
      const hasSearchMatch =
        modelItem.name.toLowerCase().includes(searchLowerValue)
        || modelItem.id.toLowerCase().includes(searchLowerValue);
      if (!hasSearchMatch) return false;
    }

    if (filters.provider && modelItem.provider !== filters.provider) return false;
    if (filters.family && modelItem.family !== filters.family) return false;
    if (filters.toolCall !== null && modelItem.toolCall !== filters.toolCall) return false;
    if (filters.reasoning !== null && modelItem.reasoning !== filters.reasoning) return false;
    if (filters.free !== null && modelItem.free !== filters.free) return false;
    if (filters.inputModality && !modelItem.inputModality.includes(filters.inputModality)) return false;
    if (filters.outputModality && !modelItem.outputModality.includes(filters.outputModality)) return false;
    if (filters.minInputCost && modelItem.inputCost < parseFloat(filters.minInputCost)) return false;
    if (filters.maxInputCost && modelItem.inputCost > parseFloat(filters.maxInputCost)) return false;
    if (filters.minOutputCost && modelItem.outputCost < parseFloat(filters.minOutputCost)) return false;
    if (filters.maxOutputCost && modelItem.outputCost > parseFloat(filters.maxOutputCost)) return false;
    if (filters.minContext && modelItem.context < parseInt(filters.minContext, 10)) return false;
    if (filters.maxContext && modelItem.context > parseInt(filters.maxContext, 10)) return false;

    if (filters.minKnowledge) {
      const knowledgeYearValue = extractYear(modelItem.knowledge);
      if (knowledgeYearValue < parseInt(filters.minKnowledge, 10)) return false;
    }

    if (filters.maxKnowledge) {
      const knowledgeYearValue = extractYear(modelItem.knowledge);
      if (knowledgeYearValue > parseInt(filters.maxKnowledge, 10)) return false;
    }

    if (filters.minReleaseYear) {
      const releaseYearValue = extractYear(modelItem.releaseDate);
      if (releaseYearValue < parseInt(filters.minReleaseYear, 10)) return false;
    }

    if (filters.maxReleaseYear) {
      const releaseYearValue = extractYear(modelItem.releaseDate);
      if (releaseYearValue > parseInt(filters.maxReleaseYear, 10)) return false;
    }

    return true;
  });
};
