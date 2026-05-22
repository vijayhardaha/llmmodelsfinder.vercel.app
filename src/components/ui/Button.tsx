import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-none border-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-black bg-black text-white hover:border-primary hover:bg-primary hover:text-black',
        secondary: 'border-primary bg-primary text-black hover:border-black hover:bg-black hover:text-white',
        white: 'border-white bg-white text-black hover:border-primary hover:bg-primary hover:text-black',
        'primary-outlined': 'border-black bg-white text-black hover:border-primary hover:bg-primary hover:text-black',
        'secondary-outlined': 'border-primary bg-white text-primary hover:border-white hover:bg-white hover:text-black',
      },
      size: { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

/**
 * Props for Button component.
 *
 * @interface ButtonProps
 * @property {string} [variant] - Button variant (primary, secondary, white, primary-outlined, secondary-outlined).
 * @property {string} [size] - Button size (sm, md, lg).
 * @property {boolean} [asChild] - Whether to render as a child element.
 * @property {string} [className] - Additional CSS classes.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button component with neo-brutalism design.
 * Supports 4 variants: primary, secondary, primary-outlined, secondary-outlined
 *
 * @param {string} [variant] - Button variant.
 * @param {string} [size] - Button size.
 * @param {boolean} [asChild] - Whether to render as a child element.
 * @param {string} [className] - Additional CSS classes.
 *
 * @returns {JSX.Element} Button component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
