import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils';

/**
 * Slider component wrapping Radix UI Slider primitive.
 *
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes.
 * @param {number[]} [props.value] - Controlled slider value.
 * @param {number[]} [props.defaultValue] - Uncontrolled default value.
 *
 * @returns {JSX.Element} Slider component.
 */
const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const thumbCount = value?.length ?? defaultValue?.length ?? 1;
  const minStepsBetweenThumbs = props.minStepsBetweenThumbs ?? (thumbCount > 1 ? 1 : 0);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full items-center select-none', className)}
      value={value}
      defaultValue={defaultValue}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden border-2 border-black bg-white">
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="shadow-neo-sm hover:bg-primary focus-visible:ring-primary block h-5 w-5 cursor-pointer border-2 border-black bg-white transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
