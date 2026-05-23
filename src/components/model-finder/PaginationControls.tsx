import type { JSX } from 'react';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { getVisiblePages } from '@/utils';

/**
 * Props for PaginationControls component.
 *
 * @interface PaginationControlsProps
 * @property {number} currentPage - Current page number.
 * @property {number} totalPages - Total pages.
 * @property {number} startDisplay - Starting result index.
 * @property {number} endDisplay - Ending result index.
 * @property {number} totalCount - Total result count.
 * @property {(page: number) => void} onPageChange - Callback for page change.
 */
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  startDisplay: number;
  endDisplay: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

/**
 * Props for PaginationButton sub-component.
 *
 * @interface PaginationButtonProps
 * @property {(page: number) => void} onPageChange - Callback for page change.
 * @property {number | 'ellipsis'} pageItem - Page number or ellipsis indicator.
 * @property {number} currentPage - Current page number.
 */
interface PaginationButtonProps {
  pageItem: number | 'ellipsis';
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Renders a single page button or ellipsis.
 *
 * @param {PaginationButtonProps} props - Component props.
 *
 * @returns {JSX.Element} Page button or ellipsis span.
 */
function PageButton({ pageItem, currentPage, onPageChange }: PaginationButtonProps): JSX.Element {
  if (pageItem === 'ellipsis') {
    return <span className="px-2 text-xs font-bold text-white/70">...</span>;
  }

  return (
    <button
      id={`page-btn-${pageItem}`}
      onClick={() => onPageChange(pageItem)}
      className={`flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center border-2 px-1 text-xs font-bold tracking-wider uppercase transition-all ${
        currentPage === pageItem
          ? 'border-primary bg-primary text-black'
          : 'hover:border-primary hover:bg-primary border-white bg-black text-white hover:text-black'
      }`}
    >
      {pageItem}
    </button>
  );
}

/**
 * Bottom sticky pagination controls.
 *
 * @param {PaginationControlsProps} props - Component props.
 *
 * @returns {JSX.Element} Pagination controls.
 */
export function PaginationControls({
  currentPage,
  totalPages,
  startDisplay,
  endDisplay,
  totalCount,
  onPageChange,
}: PaginationControlsProps): JSX.Element {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      id="pagination-controls"
      className="flex flex-col gap-3 bg-black px-4 py-2 text-white md:flex-row md:items-center md:justify-between md:gap-4"
    >
      <div className="hidden text-xs font-semibold md:block md:text-sm">
        Showing <span className="text-primary">{startDisplay}</span>-<span className="text-primary">{endDisplay}</span>{' '}
        of <span className="text-primary">{totalCount}</span> models
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
        <Button
          id="btn-first-page"
          variant="white"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          aria-label="First"
          className="min-w-8 px-1"
        >
          <ChevronsLeft className="h-4 w-4" role="img" />
        </Button>

        <Button
          id="btn-prev-page"
          variant="white"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={isFirstPage}
          aria-label="Previous"
          className="min-w-8 px-1"
        >
          <ChevronLeft className="h-4 w-4" role="img" />
        </Button>

        <div className="flex items-center gap-1 md:gap-2">
          {visiblePages.map((pageItem, index) => (
            <PageButton
              key={pageItem === 'ellipsis' ? `ellipsis-${index}` : pageItem}
              pageItem={pageItem}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          ))}
        </div>

        <Button
          id="btn-next-page"
          variant="white"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={isLastPage}
          aria-label="Next"
          className="min-w-8 px-1"
        >
          <ChevronRight className="h-4 w-4" role="img" />
        </Button>

        <Button
          id="btn-last-page"
          variant="white"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          aria-label="Last"
          className="min-w-8 px-1"
        >
          <ChevronsRight className="h-4 w-4" role="img" />
        </Button>
      </div>
    </nav>
  );
}
