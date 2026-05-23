'use client';

import { useEffect, useRef, useState, type JSX } from 'react';

import { Search } from 'lucide-react';

import type { FilterState } from '@/types/models';

/**
 * Props for SearchInput component.
 *
 * @interface SearchInputProps
 * @property {FilterState} filters - Current filter state.
 * @property {(filters: FilterState | ((prev: FilterState) => FilterState)) => void} updateFilters - Function to update filters.
 * @property {() => void} [onSearchChange] - Optional callback when search changes.
 */
interface SearchInputProps {
  filters: FilterState;
  updateFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  onSearchChange?: () => void;
}

/**
 * Search input component with debounced search.
 *
 * @param {FilterState} filters - Current filter state.
 *
 * @returns {JSX.Element} Search input component.
 *
 * @property {(filters: FilterState) => void} updateFilters - Function to update filters.
 */
export function SearchInput({ filters, updateFilters, onSearchChange }: SearchInputProps): JSX.Element {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Handles search input changes with debounce.
   *
   * @param {string} value - Search value.
   */
  function handleSearchChange(value: string) {
    setLocalSearch(value);
    onSearchChange?.();

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateFilters((previousFilters) => ({ ...previousFilters, search: value }));
    }, 300);
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" id="search-section">
      <Search className="text-text-muted absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
      <input
        id="search-input"
        name="search"
        type="text"
        placeholder="Search models by name or ID..."
        value={localSearch}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="focus:ring-primary w-full border-2 border-black bg-white py-3 pr-4 pl-10 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
      />
    </div>
  );
}
