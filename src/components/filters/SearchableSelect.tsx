import type { JSX } from 'react';

import { Combobox } from '@/components/ui/Combobox';

/**
 * Props for SearchableSelect component.
 *
 * @interface SearchableSelectProps
 * @property {string[]} options - Select options.
 * @property {string} value - Current value.
 * @property {(value: string) => void} onValueChange - Value change callback.
 * @property {string} placeholder - Placeholder text.
 * @property {string} id - Id for label association.
 */
interface SearchableSelectProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

/**
 * Searchable select component wrapper
 *
 * @param {object} props - Component props
 * @param {string[]} props.options - Select options
 * @param {string} props.value - Current value
 * @param {(value: string) => void} props.onValueChange - Value change callback
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.id - Id for label association
 *
 * @returns {JSX.Element} Searchable select element
 */
export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  id,
}: SearchableSelectProps): JSX.Element {
  const comboboxOptions = [{ value: '', label: 'All' }, ...options.map((opt) => ({ value: opt, label: opt }))];

  return (
    <div className="space-y-2">
      <Combobox
        id={id}
        options={comboboxOptions}
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
      />
    </div>
  );
}
