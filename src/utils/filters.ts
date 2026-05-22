import type { FilterState, Model } from '@/types/models';

import { extractYear } from './formatters';

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

/**
 * Parses URL search parameters into a filter state object.
 *
 * @param {URLSearchParams} searchParams - URL search parameters.
 *
 * @returns {FilterState} Filter state object.
 */
export const parseUrlParams = (searchParams: URLSearchParams): FilterState => ({
  search: searchParams.get('search') || '',
  provider: searchParams.get('provider') || '',
  family: searchParams.get('family') || '',
  toolCall: searchParams.get('toolCall') ? searchParams.get('toolCall') === 'true' : null,
  reasoning: searchParams.get('reasoning') ? searchParams.get('reasoning') === 'true' : null,
  inputModality: searchParams.get('inputModality') || '',
  outputModality: searchParams.get('outputModality') || '',
  free: searchParams.get('free') ? searchParams.get('free') === 'true' : null,
  minInputCost: searchParams.get('minInputCost') || '',
  maxInputCost: searchParams.get('maxInputCost') || '',
  minOutputCost: searchParams.get('minOutputCost') || '',
  maxOutputCost: searchParams.get('maxOutputCost') || '',
  minContext: searchParams.get('minContext') || '',
  maxContext: searchParams.get('maxContext') || '',
  minKnowledge: searchParams.get('minKnowledge') || '',
  maxKnowledge: searchParams.get('maxKnowledge') || '',
  minReleaseYear: searchParams.get('minReleaseYear') || '',
  maxReleaseYear: searchParams.get('maxReleaseYear') || '',
});

/**
 * Builds URL search parameters from a filter state object.
 *
 * @param {FilterState} filters - Filter state object.
 *
 * @returns {URLSearchParams} URL search parameters.
 */
export const buildUrlParams = (filters: FilterState): URLSearchParams => {
  const urlParams = new URLSearchParams();

  if (filters.search) urlParams.set('search', filters.search);
  if (filters.provider) urlParams.set('provider', filters.provider);
  if (filters.family) urlParams.set('family', filters.family);
  if (filters.toolCall !== null) urlParams.set('toolCall', String(filters.toolCall));
  if (filters.reasoning !== null) urlParams.set('reasoning', String(filters.reasoning));
  if (filters.inputModality) urlParams.set('inputModality', filters.inputModality);
  if (filters.outputModality) urlParams.set('outputModality', filters.outputModality);
  if (filters.free !== null) urlParams.set('free', String(filters.free));
  if (filters.minInputCost) urlParams.set('minInputCost', filters.minInputCost);
  if (filters.maxInputCost) urlParams.set('maxInputCost', filters.maxInputCost);
  if (filters.minOutputCost) urlParams.set('minOutputCost', filters.minOutputCost);
  if (filters.maxOutputCost) urlParams.set('maxOutputCost', filters.maxOutputCost);
  if (filters.minContext) urlParams.set('minContext', filters.minContext);
  if (filters.maxContext) urlParams.set('maxContext', filters.maxContext);
  if (filters.minKnowledge) urlParams.set('minKnowledge', filters.minKnowledge);
  if (filters.maxKnowledge) urlParams.set('maxKnowledge', filters.maxKnowledge);
  if (filters.minReleaseYear) urlParams.set('minReleaseYear', filters.minReleaseYear);
  if (filters.maxReleaseYear) urlParams.set('maxReleaseYear', filters.maxReleaseYear);

  return urlParams;
};
