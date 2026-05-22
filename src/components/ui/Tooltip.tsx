import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils';

/**
 * TooltipProvider component from Radix UI.
 *
 * @returns {JSX.Element} TooltipProvider component.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Tooltip component wrapper from Radix UI.
 *
 * @returns {JSX.Element} Tooltip component.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * TooltipTrigger component wrapper from Radix UI.
 *
 * @returns {JSX.Element} TooltipTrigger component.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipContent component wrapper from Radix UI.
 *
 * @param {ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>} props - Component props.
 * @param {number} [props.sideOffset] - Distance from trigger (default: 4).
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} TooltipContent component.
 */
const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-none border-2 border-black bg-black px-3 py-1.5 text-xs font-bold text-white',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
