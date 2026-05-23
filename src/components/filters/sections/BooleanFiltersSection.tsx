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
 * @property {string} trueLabel - Label for the true/yes option.
 * @property {string} falseLabel - Label for the false/no option.
 * @property {string} id - Id for label association.
 */
interface RenderBooleanSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  trueLabel?: string;
  falseLabel?: string;
  id?: string;
}

/**
 * Renders a reusable boolean select dropdown with Any/Yes/No options.
 *
 * @param {RenderBooleanSelectProps} props - Function props.
 * @param {string} props.value - Current selected value.
 * @param {(value: string) => void} props.onValueChange - Change handler.
 * @param {string} props.trueLabel - Label for true.
 * @param {string} props.falseLabel - Label for false.
 * @param {string} props.id - Id for label association.
 *
 * @returns {JSX.Element} A select dropdown for boolean filtering.
 */
function renderBooleanSelect({
  value,
  onValueChange,
  trueLabel = 'Yes',
  falseLabel = 'No',
  id,
}: RenderBooleanSelectProps): JSX.Element {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={`${id}-trigger`}>
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
    <div id="boolean-filters-section" className="grid grid-cols-3 gap-3 md:gap-4">
      <FilterGroup label="Tool Call" id="tool-call-filter">
        {renderBooleanSelect({
          id: 'tool-call-filter',
          value: booleanDisplay(filters.toolCall),
          onValueChange: (value) => onFilterChange({ toolCall: booleanValue(value) }),
        })}
      </FilterGroup>
      <FilterGroup label="Reasoning" id="reasoning-filter">
        {renderBooleanSelect({
          id: 'reasoning-filter',
          value: booleanDisplay(filters.reasoning),
          onValueChange: (value) => onFilterChange({ reasoning: booleanValue(value) }),
        })}
      </FilterGroup>
      <FilterGroup label="Model Plan" id="model-plan-filter">
        {renderBooleanSelect({
          id: 'model-plan-filter',
          value: booleanDisplay(filters.free),
          onValueChange: (value) => onFilterChange({ free: booleanValue(value) }),
          trueLabel: 'Free',
          falseLabel: 'Paid',
        })}
      </FilterGroup>
    </div>
  );
}
