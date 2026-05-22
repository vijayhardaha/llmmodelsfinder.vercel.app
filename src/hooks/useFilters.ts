'use client';

import { useCallback, useState } from 'react';

import type { FilterState } from '@/types/models';

/**
 * Initial filter state with default empty values.
 *
 * @constant {FilterState}
 */
const initialFilters: FilterState = {
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

/**
 * Hook return shape for filter state management.
 *
 * @type {UseFiltersResult}
 * @property {FilterState} filters - Current filter state.
 * @property {(filters: FilterState | ((prev: FilterState) => FilterState)) => void} updateFilters - Function to update filters.
 * @property {() => void} clearFilters - Function to clear all filters.
 */
export interface UseFiltersResult {
  filters: FilterState;
  updateFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  clearFilters: () => void;
}

/**
 * Hook for managing filter state.
 *
 * @returns {object} Filter state and update functions.
 *
 * @property {FilterState} filters - Current filter state.
 * @property {(filters: FilterState | ((prev: FilterState) => FilterState)) => void} updateFilters - Function to update filters.
 * @property {() => void} clearFilters - Function to clear all filters.
 */
export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  /**
   * Updates filters state.
   *
   * @param {FilterState} newFilters - New filter state.
   */
  const updateFilters = useCallback((newFilters: FilterState | ((prev: FilterState) => FilterState)) => {
    setFilters((prev) => (typeof newFilters === 'function' ? newFilters(prev) : newFilters));
  }, []);

  /**
   * Clears all filters and resets to initial state.
   */
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return { filters, updateFilters, clearFilters };
}
