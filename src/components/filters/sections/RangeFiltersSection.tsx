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
 * Props for PriceRangeFilter sub-component.
 *
 * @interface PriceRangeFilterProps
 * @property {number} min - Minimum slider value.
 * @property {number} max - Maximum slider value.
 * @property {number} step - Slider step value.
 * @property {number} minValue - Current minimum value.
 * @property {number} maxValue - Current maximum value.
 * @property {(value: number) => void} onMinChange - Callback when min changes.
 * @property {(value: number) => void} onMaxChange - Callback when max changes.
 * @property {string} label - Label for the slider.
 */
interface PriceRangeFilterProps {
  min: number;
  max: number;
  step: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  label: string;
}

/**
 * Renders a single PriceRangeSlider with the given configuration.
 *
 * @param {PriceRangeFilterProps} props - Component props.
 *
 * @returns {JSX.Element} PriceRangeSlider wrapped with filter props.
 */
function PriceRangeFilter({
  min,
  max,
  step,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  label,
}: PriceRangeFilterProps): JSX.Element {
  return (
    <PriceRangeSlider
      min={min}
      max={max}
      step={step}
      minValue={minValue}
      maxValue={maxValue}
      onMinChange={onMinChange}
      onMaxChange={onMaxChange}
      label={label}
    />
  );
}

/**
 * Renders a year select filter for release or knowledge year.
 *
 * @param {object} params - Function params.
 * @param {string[]} params.yearOptions - Available year options.
 * @param {string} params.label - Filter group label.
 * @param {string} params.value - Currently selected year.
 * @param {(value: string) => void} params.onValueChange - Callback when year changes.
 *
 * @returns {JSX.Element} Year select filter group.
 */
function YearSelectFilter({
  yearOptions,
  label,
  value,
  onValueChange,
}: {
  yearOptions: string[];
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}): JSX.Element {
  return (
    <FilterGroup label={label}>
      <SearchableSelect
        options={yearOptions}
        value={value}
        onValueChange={onValueChange}
        placeholder="Select year..."
      />
    </FilterGroup>
  );
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
    <div id="range-filters-section" className="space-y-3 md:space-y-4">
      <PriceRangeFilter
        min={PRICE_RANGE_DEFAULTS.min}
        max={PRICE_RANGE_DEFAULTS.max}
        step={PRICE_RANGE_DEFAULTS.step}
        minValue={parseFloat(filters.minInputCost) || PRICE_RANGE_DEFAULTS.min}
        maxValue={parseFloat(filters.maxInputCost) || PRICE_RANGE_DEFAULTS.max}
        onMinChange={(value) => onFilterChange({ minInputCost: String(value) })}
        onMaxChange={(value) => onFilterChange({ maxInputCost: String(value) })}
        label="Input Cost ($/M)"
      />
      <PriceRangeFilter
        min={PRICE_RANGE_DEFAULTS.min}
        max={PRICE_RANGE_DEFAULTS.max}
        step={PRICE_RANGE_DEFAULTS.step}
        minValue={parseFloat(filters.minOutputCost) || PRICE_RANGE_DEFAULTS.min}
        maxValue={parseFloat(filters.maxOutputCost) || PRICE_RANGE_DEFAULTS.max}
        onMinChange={(value) => onFilterChange({ minOutputCost: String(value) })}
        onMaxChange={(value) => onFilterChange({ maxOutputCost: String(value) })}
        label="Output Cost ($/M)"
      />
      <PriceRangeFilter
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
        <YearSelectFilter
          yearOptions={yearOptions}
          label="Release Year"
          value={selectedReleaseYear}
          onValueChange={(value) => onFilterChange({ minReleaseYear: value, maxReleaseYear: value })}
        />
        <YearSelectFilter
          yearOptions={yearOptions}
          label="Knowledge Year"
          value={selectedKnowledgeYear}
          onValueChange={(value) => onFilterChange({ minKnowledge: value, maxKnowledge: value })}
        />
      </div>
    </div>
  );
}
