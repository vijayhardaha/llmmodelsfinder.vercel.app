import type { JSX } from 'react';

import { FilterGroup } from '@/components/filters/FilterGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import type { FilterState } from '@/types/models';
import { booleanDisplay, booleanValue } from '@/utils/filters';

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
 * Props for renderBooleanSelect function.
 *
 * @interface RenderBooleanSelectProps
 * @property {string} value - Current selected value (any, true, false).
 * @property {(value: string) => void} onValueChange - Callback when selection changes.
 * @property {string} [trueLabel='Yes'] - Label for the true/yes option.
 * @property {string} [falseLabel='No'] - Label for the false/no option.
 */
interface RenderBooleanSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  trueLabel?: string;
  falseLabel?: string;
}

/**
 * Renders a reusable boolean select dropdown with Any/Yes/No options.
 *
 * @param {RenderBooleanSelectProps} props - Function props.
 * @param {string} props.value - Current selected value.
 * @param {(value: string) => void} props.onValueChange - Change handler.
 * @param {string} [props.trueLabel] - Label for true.
 * @param {string} [props.falseLabel] - Label for false.
 *
 * @returns {JSX.Element} A select dropdown for boolean filtering.
 */
function renderBooleanSelect({
  value,
  onValueChange,
  trueLabel = 'Yes',
  falseLabel = 'No',
}: RenderBooleanSelectProps): JSX.Element {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Any" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="true">{trueLabel}</SelectItem>
        <SelectItem value="false">{falseLabel}</SelectItem>
      </SelectContent>
    </Select>
  );
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
        {renderBooleanSelect({
          value: booleanDisplay(filters.toolCall),
          onValueChange: (value) => onFilterChange({ toolCall: booleanValue(value) }),
        })}
      </FilterGroup>
      <FilterGroup label="Reasoning">
        {renderBooleanSelect({
          value: booleanDisplay(filters.reasoning),
          onValueChange: (value) => onFilterChange({ reasoning: booleanValue(value) }),
        })}
      </FilterGroup>
      <FilterGroup label="Model Plan">
        {renderBooleanSelect({
          value: booleanDisplay(filters.free),
          onValueChange: (value) => onFilterChange({ free: booleanValue(value) }),
          trueLabel: 'Free',
          falseLabel: 'Paid',
        })}
      </FilterGroup>
    </div>
  );
}
