import type { JSX } from 'react';

import { FilterGroup } from '@/components/filters/FilterGroup';
import { SearchableSelect } from '@/components/filters/SearchableSelect';
import type { FilterState } from '@/types/models';

/**
 * Props for SelectFiltersSection component.
 *
 * @interface SelectFiltersSectionProps
 * @property {FilterState} filters - Current filter state.
 * @property {string[]} providers - Provider options.
 * @property {string[]} families - Family options.
 * @property {string[]} inputModalities - Input modality options.
 * @property {string[]} outputModalities - Output modality options.
 * @property {(next: Partial<FilterState>) => void} onFilterChange - Callback for filter changes.
 */
interface SelectFiltersSectionProps {
  filters: FilterState;
  providers: string[];
  families: string[];
  inputModalities: string[];
  outputModalities: string[];
  onFilterChange: (next: Partial<FilterState>) => void;
}

/**
 * Select-based filter section.
 *
 * @param {SelectFiltersSectionProps} props - Component props.
 *
 * @returns {JSX.Element} Select filters section.
 */
export function SelectFiltersSection({
  filters,
  providers,
  families,
  inputModalities,
  outputModalities,
  onFilterChange,
}: SelectFiltersSectionProps): JSX.Element {
  return (
    <div id="select-filters-section" className="grid grid-cols-2 gap-3 md:gap-4">
      <FilterGroup label="Provider" id="provider-filter">
        <SearchableSelect
          id="provider-filter"
          options={providers}
          value={filters.provider}
          onValueChange={(value) => onFilterChange({ provider: value })}
          placeholder="All Providers"
        />
      </FilterGroup>
      <FilterGroup label="Family" id="family-filter">
        <SearchableSelect
          id="family-filter"
          options={families}
          value={filters.family}
          onValueChange={(value) => onFilterChange({ family: value })}
          placeholder="All Families"
        />
      </FilterGroup>
      <FilterGroup label="Input Type" id="input-type-filter">
        <SearchableSelect
          id="input-type-filter"
          options={inputModalities}
          value={filters.inputModality}
          onValueChange={(value) => onFilterChange({ inputModality: value })}
          placeholder="All Input Types"
        />
      </FilterGroup>
      <FilterGroup label="Output Type" id="output-type-filter">
        <SearchableSelect
          id="output-type-filter"
          options={outputModalities}
          value={filters.outputModality}
          onValueChange={(value) => onFilterChange({ outputModality: value })}
          placeholder="All Output Types"
        />
      </FilterGroup>
    </div>
  );
}
