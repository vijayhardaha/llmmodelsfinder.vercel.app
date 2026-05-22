import type { JSX } from 'react';

import { FileText, Image as ImageIcon, Video, FileMusic, FileBox } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

/**
 * Props for ModalityCell component.
 *
 * @interface ModalityCellProps
 * @property {string[]} values - Modality values.
 */
interface ModalityCellProps {
  values: string[];
}

/**
 * Resolves modality icon element by label.
 *
 * @param {string} modality - Modality label.
 *
 * @returns {JSX.Element} Modality icon.
 */
export function getModalityIcon(modality: string): JSX.Element {
  if (modality === 'audio') return <FileMusic className="h-4 w-4 text-black" aria-hidden="true" />;
  if (modality === 'video') return <Video className="h-4 w-4 text-black" aria-hidden="true" />;
  if (modality === 'image') return <ImageIcon className="h-4 w-4 text-black" aria-hidden="true" />;
  if (modality === 'pdf') return <FileBox className="h-4 w-4 text-black" aria-hidden="true" />;

  return <FileText className="h-4 w-4 text-black" aria-hidden="true" />;
}

/**
 * Renders modality chips as icon tooltips.
 *
 * @param {ModalityCellProps} props - Component props.
 * @param {string[]} props.values - Modality values.
 *
 * @returns {JSX.Element} Modality cell.
 */
export function ModalityCell({ values }: ModalityCellProps): JSX.Element {
  return (
    <div className="flex w-10 flex-wrap gap-1.5">
      {values.map((modalityValue) => (
        <Tooltip key={modalityValue}>
          <TooltipTrigger asChild>
            <button className="cursor-pointer">{getModalityIcon(modalityValue)}</button>
          </TooltipTrigger>
          <TooltipContent>{modalityValue}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
