'use client';

import * as React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils';

/**
 * Props for Combobox component.
 *
 * @interface ComboboxProps
 * @property {Array<{value: string, label: string}>} options - Array of options with value and label.
 * @property {string} value - Current selected value.
 * @property {(value: string) => void} onValueChange - Callback when value changes.
 * @property {string} [placeholder] - Placeholder text.
 * @property {string} [searchPlaceholder] - Search input placeholder.
 */
interface ComboboxProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

/**
 * Searchable combobox component.
 *
 * @param {object} props - Component props
 * @param {Array<{value: string, label: string}>} props.options - Array of options with value and label.
 * @param {string} props.value - Current selected value.
 * @param {(value: string) => void} props.onValueChange - Callback when value changes.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.searchPlaceholder] - Search input placeholder.
 *
 * @returns {JSX.Element} Combobox component.
 */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const filtered = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-2 border-black bg-white px-3 py-2 text-sm font-medium text-black"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronsUpDown className="h-4 w-4 flex-shrink-0 opacity-50" />
      </button>

      {open && (
        <div className="shadow-neo-md absolute top-full z-50 mt-1 w-full border-2 border-black bg-white">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b-2 border-black px-3 py-2 text-sm focus:outline-none"
          />
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-text-muted px-3 py-2 text-sm">No results found</div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onValueChange(option.value);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                    value === option.value ? 'bg-primary text-black' : 'text-text hover:bg-background bg-white'
                  )}
                >
                  <Check className={cn('h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  <span className="text-left">{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
