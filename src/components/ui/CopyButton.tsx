'use client';

import { useCallback, useState, type JSX } from 'react';

import copy from 'copy-to-clipboard';
import { Check, Copy } from 'lucide-react';

/**
 * Props for CopyButton component.
 *
 * @interface CopyButtonProps
 * @property {string} value - The text value to copy to clipboard.
 * @property {string} [className] - Additional CSS classes for the button.
 */
interface CopyButtonProps {
  value: string;
  className?: string;
}

/**
 * A button that copies the given value to clipboard when clicked.
 * Shows a copy icon by default and switches to a check icon briefly after copying.
 *
 * @param {CopyButtonProps} props - Component props.
 * @param {string} props.value - The text value to copy to clipboard.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} Copy button with visual feedback.
 */
export function CopyButton({ value, className = '' }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copy(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  return (
    <button
      id="btn-copy"
      type="button"
      onClick={handleCopy}
      className={`inline-flex cursor-pointer items-center justify-center p-0.5 text-black opacity-50 transition-opacity hover:opacity-100 ${className}`}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}
