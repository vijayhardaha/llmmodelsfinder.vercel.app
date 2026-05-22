import type { JSX } from 'react';

import { Combobox } from '@/components/ui/Combobox';

/**
 * Props for SearchableSelect component.
 *
 * @interface SearchableSelectProps
 * @property {string[]} options - Select options.
 * @property {string} value - Current value.
 * @property {(value: string) => void} onValueChange - Value change callback.
 * @property {string} [label] - Optional label text.
 * @property {string} [placeholder] - Optional placeholder text.
 */
interface SearchableSelectProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

/**
 * Searchable select component wrapper
 *
 * @param {object} props - Component props
 * @param {string[]} props.options - Select options
 * @param {string} props.value - Current value
 * @param {(value: string) => void} props.onValueChange - Value change callback
 * @param {string} props.label - Label text
 * @param {string} props.placeholder - Placeholder text
 *
 * @returns {JSX.Element} Searchable select element
 */
export function SearchableSelect({
  options,
  value,
  onValueChange,
  label,
  placeholder = 'Select...',
}: SearchableSelectProps): JSX.Element {
  const comboboxOptions = [{ value: '', label: 'All' }, ...options.map((opt) => ({ value: opt, label: opt }))];

  return (
    <div className="space-y-2">
      {label && <label className="uppercase-label block text-black">{label}</label>}
      <Combobox options={comboboxOptions} value={value} onValueChange={onValueChange} placeholder={placeholder} />
    </div>
  );
}
