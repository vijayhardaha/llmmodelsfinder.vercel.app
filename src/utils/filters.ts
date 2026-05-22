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
 * Checks if a model matches the search query.
 *
 * @param {Model} model - The model to check.
 * @param {string} search - The search query string.
 *
 * @returns {boolean} True if model name or ID includes the search query.
 */
function filterBySearch(model: Model, search: string): boolean {
  const searchLowerValue = search.toLowerCase();
  return model.name.toLowerCase().includes(searchLowerValue) || model.id.toLowerCase().includes(searchLowerValue);
}

/**
 * Checks if a model matches the exact match filters (provider, family, booleans).
 *
 * @param {Model} model - The model to check.
 * @param {FilterState} filters - Filter state.
 *
 * @returns {boolean} True if the model passes all exact match checks.
 */
function filterByExactMatch(model: Model, filters: FilterState): boolean {
  if (filters.provider && model.provider !== filters.provider) return false;
  if (filters.family && model.family !== filters.family) return false;
  if (filters.toolCall !== null && model.toolCall !== filters.toolCall) return false;
  if (filters.reasoning !== null && model.reasoning !== filters.reasoning) return false;
  if (filters.free !== null && model.free !== filters.free) return false;
  if (filters.inputModality && !model.inputModality.includes(filters.inputModality)) return false;
  if (filters.outputModality && !model.outputModality.includes(filters.outputModality)) return false;

  return true;
}

/**
 * Checks if a model's input/output costs fall within the filter ranges.
 *
 * @param {Model} model - The model to check.
 * @param {FilterState} filters - Filter state.
 *
 * @returns {boolean} True if the model passes all cost range checks.
 */
function filterByCost(model: Model, filters: FilterState): boolean {
  if (filters.minInputCost && model.inputCost < parseFloat(filters.minInputCost)) return false;
  if (filters.maxInputCost && model.inputCost > parseFloat(filters.maxInputCost)) return false;
  if (filters.minOutputCost && model.outputCost < parseFloat(filters.minOutputCost)) return false;
  if (filters.maxOutputCost && model.outputCost > parseFloat(filters.maxOutputCost)) return false;

  return true;
}

/**
 * Checks if a model's context window falls within the filter range.
 *
 * @param {Model} model - The model to check.
 * @param {FilterState} filters - Filter state.
 *
 * @returns {boolean} True if the model passes context range checks.
 */
function filterByContext(model: Model, filters: FilterState): boolean {
  if (filters.minContext && model.context < parseInt(filters.minContext, 10)) return false;
  if (filters.maxContext && model.context > parseInt(filters.maxContext, 10)) return false;

  return true;
}

/**
 * Checks if a model's knowledge cutoff year falls within the filter range.
 *
 * @param {Model} model - The model to check.
 * @param {FilterState} filters - Filter state.
 *
 * @returns {boolean} True if the model passes knowledge year range checks.
 */
function filterByKnowledgeYear(model: Model, filters: FilterState): boolean {
  if (!filters.minKnowledge && !filters.maxKnowledge) return true;

  const knowledgeYearValue = extractYear(model.knowledge);

  if (filters.minKnowledge && knowledgeYearValue < parseInt(filters.minKnowledge, 10)) return false;
  if (filters.maxKnowledge && knowledgeYearValue > parseInt(filters.maxKnowledge, 10)) return false;

  return true;
}

/**
 * Checks if a model's release year falls within the filter range.
 *
 * @param {Model} model - The model to check.
 * @param {FilterState} filters - Filter state.
 *
 * @returns {boolean} True if the model passes release year range checks.
 */
function filterByReleaseYear(model: Model, filters: FilterState): boolean {
  if (!filters.minReleaseYear && !filters.maxReleaseYear) return true;

  const releaseYearValue = extractYear(model.releaseDate);

  if (filters.minReleaseYear && releaseYearValue < parseInt(filters.minReleaseYear, 10)) return false;
  if (filters.maxReleaseYear && releaseYearValue > parseInt(filters.maxReleaseYear, 10)) return false;

  return true;
}

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
    if (filters.search && !filterBySearch(modelItem, filters.search)) return false;
    if (!filterByExactMatch(modelItem, filters)) return false;
    if (!filterByCost(modelItem, filters)) return false;
    if (!filterByContext(modelItem, filters)) return false;
    if (!filterByKnowledgeYear(modelItem, filters)) return false;
    if (!filterByReleaseYear(modelItem, filters)) return false;

    return true;
  });
};
