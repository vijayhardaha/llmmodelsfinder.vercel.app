'use client';

import { useEffect, useRef, useState, type JSX } from 'react';

import { Slider } from '@/components/ui/Slider';

/**
 * Props for PriceRangeSlider component.
 *
 * @interface PriceRangeSliderProps
 * @property {number} min - Minimum slider value.
 * @property {number} max - Maximum slider value.
 * @property {number} [step] - Slider step value.
 * @property {(value: number) => void} onMinChange - Callback when min value changes.
 * @property {(value: number) => void} onMaxChange - Callback when max value changes.
 * @property {number} minValue - Current minimum value.
 * @property {number} maxValue - Current maximum value.
 * @property {string} [label] - Label text.
 */
interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  label?: string;
}

/**
 * Price range slider component with min/max inputs.
 *
 * @param {number} min - Minimum slider value.
 *
 * @returns {JSX.Element} Price range slider component.
 *
 * @property {number} max - Maximum slider value.
 * @property {number} [step] - Slider step value.
 * @property {(value: number) => void} onMinChange - Callback when min value changes.
 * @property {(value: number) => void} onMaxChange - Callback when max value changes.
 * @property {number} minValue - Current minimum value.
 * @property {number} maxValue - Current maximum value.
 * @property {string} [label] - Label text.
 */
export function PriceRangeSlider({
  min,
  max,
  step = 0.01,
  onMinChange,
  onMaxChange,
  minValue,
  maxValue,
  label = 'Price Range',
}: PriceRangeSliderProps): JSX.Element {
  const [draftValues, setDraftValues] = useState<[number, number]>([minValue, maxValue]);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setDraftValues([minValue, maxValue]);
  }, [minValue, maxValue]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSliderValueChange = (values: number[]) => {
    setDraftValues([values[0], values[1]]);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onMinChange(values[0]);
      onMaxChange(values[1]);
    }, 120);
  };

  return (
    <div className="space-y-3">
      <label className="uppercase-label block text-black">{label}</label>
      <div className="pointer-events-auto">
        <Slider
          min={min}
          max={max}
          step={step}
          value={draftValues}
          onValueChange={handleSliderValueChange}
          onValueCommit={(values) => {
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }
            setDraftValues([values[0], values[1]]);
            onMinChange(values[0]);
            onMaxChange(values[1]);
          }}
          className="w-full"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={draftValues[0]}
          onChange={(e) => {
            const nextMin = parseFloat(e.target.value) || min;
            setDraftValues([nextMin, draftValues[1]]);
            onMinChange(nextMin);
          }}
          placeholder="Min"
          className="flex-1 border-2 border-black bg-white px-2 py-1 text-sm focus:outline-none"
        />
        <span className="text-text-muted flex items-center px-2">-</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={draftValues[1]}
          onChange={(e) => {
            const nextMax = parseFloat(e.target.value) || max;
            setDraftValues([draftValues[0], nextMax]);
            onMaxChange(nextMax);
          }}
          placeholder="Max"
          className="flex-1 border-2 border-black bg-white px-2 py-1 text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
