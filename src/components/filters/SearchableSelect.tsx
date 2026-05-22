import type { JSX } from 'react';

import { Combobox } from '../ui/Combobox';

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
 * @param {object} root0 - Component props
 * @param {string[]} root0.options - Select options
 * @param {string} root0.value - Current value
 * @param {(value: string) => void} root0.onValueChange - Value change callback
 * @param {string} root0.label - Label text
 * @param {string} root0.placeholder - Placeholder text
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
