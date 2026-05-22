import type { JSX } from 'react';

import { FilterGroup } from '@/components/filters/FilterGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import type { FilterState } from '@/types/models';

/**
 * Props for BooleanFiltersSection component.
 *
 * @interface BooleanFiltersSectionProps
 * @property {FilterState} filters - Current filter state.
 * @property {(next: Partial<FilterState>) => void} onFilterChange - Callback for filter changes.
 */
interface BooleanFiltersSectionProps {
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
}

/**
 * Boolean/select filter section.
 *
 * @param {BooleanFiltersSectionProps} props - Component props.
 *
 * @returns {JSX.Element} Boolean filters section.
 */
export function BooleanFiltersSection({ filters, onFilterChange }: BooleanFiltersSectionProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      <FilterGroup label="Tool Call">
        <Select
          value={filters.toolCall === null ? 'any' : String(filters.toolCall)}
          onValueChange={(value) => onFilterChange({ toolCall: value === 'any' ? null : value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>
      <FilterGroup label="Reasoning">
        <Select
          value={filters.reasoning === null ? 'any' : String(filters.reasoning)}
          onValueChange={(value) => onFilterChange({ reasoning: value === 'any' ? null : value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>
      <FilterGroup label="Model Plan">
        <Select
          value={filters.free === null ? 'any' : String(filters.free)}
          onValueChange={(value) => onFilterChange({ free: value === 'any' ? null : value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="true">Free</SelectItem>
            <SelectItem value="false">Paid</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>
    </div>
  );
}
