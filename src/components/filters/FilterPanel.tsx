'use client';

import type { JSX } from 'react';

import { BooleanFiltersSection } from '@/components/filters/sections/BooleanFiltersSection';
import { RangeFiltersSection } from '@/components/filters/sections/RangeFiltersSection';
import { SelectFiltersSection } from '@/components/filters/sections/SelectFiltersSection';
import { Button } from '@/components/ui/Button';
import type { FilterState, Model } from '@/types/models';

/**
 * Props for FilterPanel component.
 *
 * @interface FilterPanelProps
 * @property {Model[]} models - List of models for filter options.
 * @property {FilterState} filters - Current filter state.
 * @property {(filters: FilterState | ((prev: FilterState) => FilterState)) => void} updateFilters - Function to update filters.
 * @property {() => void} onClearFilters - Callback to clear all filters.
 */
interface FilterPanelProps {
  models: Model[];
  filters: FilterState;
  updateFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  onClearFilters: () => void;
}

/**
 * Extracts sorted unique provider values.
 *
 * @param {Model[]} models - Model list.
 *
 * @returns {string[]} Provider options.
 */
function getProviderOptions(models: Model[]): string[] {
  return Array.from(new Set(models.map((modelItem) => modelItem.provider))).sort();
}

/**
 * Extracts sorted unique family values.
 *
 * @param {Model[]} models - Model list.
 *
 * @returns {string[]} Family options.
 */
function getFamilyOptions(models: Model[]): string[] {
  return Array.from(new Set(models.map((modelItem) => modelItem.family))).sort();
}

/**
 * Extracts sorted unique input modality values.
 *
 * @param {Model[]} models - Model list.
 *
 * @returns {string[]} Input modality options.
 */
function getInputModalityOptions(models: Model[]): string[] {
  return Array.from(new Set(models.flatMap((modelItem) => modelItem.inputModality))).sort();
}

/**
 * Extracts sorted unique output modality values.
 *
 * @param {Model[]} models - Model list.
 *
 * @returns {string[]} Output modality options.
 */
function getOutputModalityOptions(models: Model[]): string[] {
  return Array.from(new Set(models.flatMap((modelItem) => modelItem.outputModality))).sort();
}

/**
 * Filter panel component combining all filter controls.
 *
 * @param {FilterPanelProps} props - Component props.
 *
 * @returns {JSX.Element} Filter panel component.
 */
export function FilterPanel({ models, filters, updateFilters, onClearFilters }: FilterPanelProps): JSX.Element {
  const providers = getProviderOptions(models);
  const families = getFamilyOptions(models);
  const inputModalities = getInputModalityOptions(models);
  const outputModalities = getOutputModalityOptions(models);

  /**
   * Merges partial filter updates into current state.
   *
   * @param {Partial<FilterState>} nextFilterPatch - Partial filter updates.
   */
  function handleFilterChange(nextFilterPatch: Partial<FilterState>) {
    updateFilters((previousFilters) => ({ ...previousFilters, ...nextFilterPatch }));
  }

  return (
    <div className="bg-surface-alt border-b-4 border-black p-4 md:p-6">
      <div className="space-y-3 pb-6 md:space-y-4">
        <SelectFiltersSection
          filters={filters}
          providers={providers}
          families={families}
          inputModalities={inputModalities}
          outputModalities={outputModalities}
          onFilterChange={handleFilterChange}
        />
        <BooleanFiltersSection filters={filters} onFilterChange={handleFilterChange} />
        <RangeFiltersSection filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="bg-surface-alt mb:bottom-4 pt-3 md:sticky md:pt-4">
        <Button variant="primary" size="md" className="w-full" onClick={onClearFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
