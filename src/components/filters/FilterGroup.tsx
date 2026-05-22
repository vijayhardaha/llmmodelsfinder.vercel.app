import type { JSX, ReactNode } from 'react';

/**
 * Props for FilterGroup component.
 *
 * @interface FilterGroupProps
 * @property {string} label - Filter group label.
 * @property {ReactNode} children - Child elements.
 */
interface FilterGroupProps {
  label: string;
  children: ReactNode;
}

/**
 * Filter group wrapper component
 *
 * @param {object} props - Component props
 * @param {string} props.label - Filter group label
 * @param {ReactNode} props.children - Child elements
 *
 * @returns {JSX.Element} Filter group element
 */
export function FilterGroup({ label, children }: FilterGroupProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <label className="uppercase-label text-black">{label}</label>
      {children}
    </div>
  );
}
