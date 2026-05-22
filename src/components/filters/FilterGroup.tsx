import type { JSX } from 'react';
import * as React from 'react';

/**
 * Props for FilterGroup component.
 *
 * @interface FilterGroupProps
 * @property {string} label - Filter group label.
 * @property {React.ReactNode} children - Child elements.
 */
interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Filter group wrapper component
 *
 * @param {object} root0 - Component props
 * @param {string} root0.label - Filter group label
 * @param {React.ReactNode} root0.children - Child elements
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
