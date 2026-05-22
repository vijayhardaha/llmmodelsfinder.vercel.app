'use client';

import { useMemo, type ComponentProps, type JSX } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils';

/**
 * A range slider component built on top of Radix UI's Slider primitive.
 *
 * Supports both controlled (`value`) and uncontrolled (`defaultValue`) modes.
 * Automatically determines the number of thumbs based on the provided values.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes for the root element.
 * @param {number[]} [props.defaultValue] - Default values for uncontrolled mode.
 * @param {number[]} [props.value] - Current values for controlled mode.
 * @param {number} [props.min] - Minimum allowed value.
 * @param {number} [props.max] - Maximum allowed value.
 *
 * @returns {JSX.Element} The rendered slider component.
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>): JSX.Element {
  const _values = useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn('relative flex w-full touch-none items-center select-none', className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-2 w-full grow overflow-hidden border-2 border-black bg-white"
      >
        <SliderPrimitive.Range data-slot="slider-range" className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="shadow-neo-sm hover:bg-primary focus-visible:ring-primary block h-5 w-5 cursor-pointer border-2 border-black bg-white transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
