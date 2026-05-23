import type { JSX, ReactNode } from 'react';

/**
 * Props for FilterGroup component.
 *
 * @interface FilterGroupProps
 * @property {string} label - Filter group label.
 * @property {ReactNode} children - Child elements.
 * @property {string} id - Id for label association.
 */
interface FilterGroupProps {
  label: string;
  children: ReactNode;
  id?: string;
}

/**
 * Filter group wrapper component
 *
 * @param {object} props - Component props
 * @param {string} props.label - Filter group label
 * @param {ReactNode} props.children - Child elements
 * @param {string} props.id - Id for label association
 *
 * @returns {JSX.Element} Filter group element
 */
export function FilterGroup({ label, children, id }: FilterGroupProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${id}-trigger`} className="uppercase-label text-black">
        {label}
      </label>
      {children}
    </div>
  );
}
