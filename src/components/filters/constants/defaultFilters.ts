import type { FilterState } from '@/types/models';

/**
 * Default filter state used for reset action.
 */
export const defaultFilters: FilterState = {
  search: '',
  provider: '',
  family: '',
  toolCall: null,
  reasoning: null,
  inputModality: '',
  outputModality: '',
  free: null,
  minInputCost: '',
  maxInputCost: '',
  minOutputCost: '',
  maxOutputCost: '',
  minContext: '',
  maxContext: '',
  minKnowledge: '',
  maxKnowledge: '',
  minReleaseYear: '',
  maxReleaseYear: '',
};
