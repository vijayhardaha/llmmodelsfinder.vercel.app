import type { JSX, ReactNode } from 'react';

/**
 * Props for Container component.
 *
 * @interface ContainerProps
 * @property {ReactNode} children - Child elements.
 * @property {string} [className] - Additional CSS classes.
 */
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container component with max-width 8xl and padding.
 *
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} Container component
 */
export function Container({ children, className = '' }: ContainerProps): JSX.Element {
  return <div className={`mx-auto px-4 md:px-6 ${className}`}>{children}</div>;
}
