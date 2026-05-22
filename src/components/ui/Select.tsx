import * as React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/utils';

/**
 * Select component wrapping Radix UI Select primitive.
 *
 * @returns {JSX.Element} Select component.
 */
const Select = SelectPrimitive.Root;

/**
 * SelectGroup component for grouping select items.
 *
 * @returns {JSX.Element} SelectGroup component.
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * SelectValue component displaying the current value.
 *
 * @returns {JSX.Element} SelectValue component.
 */
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger component for opening the select dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} [props.children] - Child elements.
 *
 * @returns {JSX.Element} SelectTrigger component.
 */
const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 items-center justify-between border-2 border-black bg-white px-3 py-2 text-sm font-medium text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      className || 'w-full'
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectScrollUpButton component for scrolling up in the dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} SelectScrollUpButton component.
 */
const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-pointer justify-center py-1', className)}
    {...props}
  />
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton component for scrolling down in the dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} SelectScrollDownButton component.
 */
const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-pointer justify-center py-1', className)}
    {...props}
  />
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectContent component for the dropdown content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.position] - Positioning strategy (default: 'popper').
 *
 * @returns {JSX.Element} SelectContent component.
 */
const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn('shadow-neo-md relative z-50 max-h-60 min-w-32 border-2 border-black bg-white', className)}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full')}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectItem component for individual select options.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} [props.children] - Child elements.
 *
 * @returns {JSX.Element} SelectItem component.
 */
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'data-[highlighted]:bg-primary flex cursor-pointer items-center gap-2 px-3 py-2 pl-8 text-sm focus:outline-none data-[highlighted]:text-black',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectSeparator component for visual separators in the dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} SelectSeparator component.
 */
const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
