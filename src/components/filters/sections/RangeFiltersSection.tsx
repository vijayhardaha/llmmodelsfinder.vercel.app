import type { JSX } from 'react';

import {
  CONTEXT_WINDOW_DEFAULTS,
  PRICE_RANGE_DEFAULTS,
  YEAR_FILTER_END_OFFSET,
  YEAR_FILTER_START,
} from '@/components/filters/constants/rangeFilters';
import { FilterGroup } from '@/components/filters/FilterGroup';
import { PriceRangeSlider } from '@/components/filters/PriceRangeSlider';
import { SearchableSelect } from '@/components/filters/SearchableSelect';
import type { FilterState } from '@/types/models';

/**
 * Props for RangeFiltersSection component.
 *
 * @interface RangeFiltersSectionProps
 * @property {FilterState} filters - Current filter state.
 * @property {(next: Partial<FilterState>) => void} onFilterChange - Callback for filter changes.
 */
interface RangeFiltersSectionProps {
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
}

/**
 * Range slider filters section.
 *
 * @param {RangeFiltersSectionProps} props - Component props.
 *
 * @returns {JSX.Element} Range filters section.
 */
export function RangeFiltersSection({ filters, onFilterChange }: RangeFiltersSectionProps): JSX.Element {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + YEAR_FILTER_END_OFFSET;
  const yearOptions = Array.from({ length: maxYear - YEAR_FILTER_START + 1 }, (_, index) =>
    String(YEAR_FILTER_START + index)
  );
  const selectedReleaseYear = filters.minReleaseYear && filters.maxReleaseYear ? filters.minReleaseYear : '';
  const selectedKnowledgeYear = filters.minKnowledge && filters.maxKnowledge ? filters.minKnowledge : '';

  return (
    <div className="space-y-3 md:space-y-4">
      <PriceRangeSlider
        min={PRICE_RANGE_DEFAULTS.min}
        max={PRICE_RANGE_DEFAULTS.max}
        step={PRICE_RANGE_DEFAULTS.step}
        minValue={parseFloat(filters.minInputCost) || PRICE_RANGE_DEFAULTS.min}
        maxValue={parseFloat(filters.maxInputCost) || PRICE_RANGE_DEFAULTS.max}
        onMinChange={(value) => onFilterChange({ minInputCost: String(value) })}
        onMaxChange={(value) => onFilterChange({ maxInputCost: String(value) })}
        label="Input Cost ($/M)"
      />
      <PriceRangeSlider
        min={PRICE_RANGE_DEFAULTS.min}
        max={PRICE_RANGE_DEFAULTS.max}
        step={PRICE_RANGE_DEFAULTS.step}
        minValue={parseFloat(filters.minOutputCost) || PRICE_RANGE_DEFAULTS.min}
        maxValue={parseFloat(filters.maxOutputCost) || PRICE_RANGE_DEFAULTS.max}
        onMinChange={(value) => onFilterChange({ minOutputCost: String(value) })}
        onMaxChange={(value) => onFilterChange({ maxOutputCost: String(value) })}
        label="Output Cost ($/M)"
      />
      <PriceRangeSlider
        min={CONTEXT_WINDOW_DEFAULTS.min}
        max={CONTEXT_WINDOW_DEFAULTS.max}
        step={CONTEXT_WINDOW_DEFAULTS.step}
        minValue={parseInt(filters.minContext, 10) || CONTEXT_WINDOW_DEFAULTS.min}
        maxValue={parseInt(filters.maxContext, 10) || CONTEXT_WINDOW_DEFAULTS.max}
        onMinChange={(value) => onFilterChange({ minContext: String(value) })}
        onMaxChange={(value) => onFilterChange({ maxContext: String(value) })}
        label="Context Window"
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <FilterGroup label="Release Year">
          <SearchableSelect
            options={yearOptions}
            value={selectedReleaseYear}
            onValueChange={(value) => onFilterChange({ minReleaseYear: value, maxReleaseYear: value })}
            placeholder="Select year..."
          />
        </FilterGroup>
        <FilterGroup label="Knowledge Year">
          <SearchableSelect
            options={yearOptions}
            value={selectedKnowledgeYear}
            onValueChange={(value) => onFilterChange({ minKnowledge: value, maxKnowledge: value })}
            placeholder="Select year..."
          />
        </FilterGroup>
      </div>
    </div>
  );
}
