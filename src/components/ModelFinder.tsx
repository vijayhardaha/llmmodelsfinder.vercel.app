'use client';

import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';

import { X } from 'lucide-react';

import { defaultFilters } from '@/components/filters/constants/defaultFilters';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { Container } from '@/components/layout/Container';
import { NoResultsState } from '@/components/model-finder/NoResultsState';
import { PaginationControls } from '@/components/model-finder/PaginationControls';
import { ResultsSummaryBar } from '@/components/model-finder/ResultsSummaryBar';
import { ResultsTableSection } from '@/components/model-finder/ResultsTableSection';
import { SearchInput } from '@/components/search/SearchInput';
import { Button } from '@/components/ui/Button';
import { useFilters } from '@/hooks/useFilters';
import type { Model } from '@/types/models';
import { applyFilters, getEndIndex, getStartIndex, getTotalPages } from '@/utils';

/**
 * Props for ModelFinder component.
 *
 * @interface ModelFinderProps
 * @property {Model[]} initialModels - Initial list of models to display.
 */
interface ModelFinderProps {
  initialModels: Model[];
}

/**
 * Main ModelFinder client component.
 *
 * @param {ModelFinderProps} props - Component props.
 *
 * @returns {JSX.Element} ModelFinder component.
 */
export function ModelFinder({ initialModels }: ModelFinderProps): JSX.Element {
  const { filters, updateFilters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [searchResetKey, setSearchResetKey] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Lock body scroll when filter panel is open (below xl)
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showFilters]);

  const filteredModels = useMemo(() => applyFilters(initialModels, filters), [initialModels, filters]);
  const totalPages = getTotalPages(filteredModels.length, perPage);
  const startIndex = getStartIndex(currentPage, perPage);
  const startDisplay = startIndex + 1;
  const endDisplay = getEndIndex(startIndex, perPage, filteredModels.length);

  /**
   * Handles page-size change and resets page to first page.
   *
   * @param {number} nextPerPageValue - New page size.
   */
  const handlePerPageChange = useCallback((nextPerPageValue: number) => {
    setPerPage(nextPerPageValue);
    setCurrentPage(1);
  }, []);

  /**
   * Updates filters and resets pagination to the first page.
   *
   * @param {Parameters<typeof updateFilters>[0]} nextFilters - Next filters or updater.
   */
  const handleFiltersChange = useCallback(
    (nextFilters: Parameters<typeof updateFilters>[0]) => {
      setCurrentPage(1);
      updateFilters(nextFilters);
    },
    [updateFilters]
  );

  /**
   * Clears filters, resets pagination, and remounts the search input.
   */
  const handleClearFilters = useCallback(() => {
    setCurrentPage(1);
    setSearchResetKey((previousKey) => previousKey + 1);
    updateFilters(defaultFilters);
  }, [updateFilters]);

  /**
   * Toggles the filter panel visibility.
   */
  const handleToggleFilters = useCallback(() => {
    setShowFilters((previous) => !previous);
  }, []);

  /**
   * Closes the filter panel.
   */
  const handleCloseFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  const filterPanelContent = (
    <>
      <SearchInput
        key={searchResetKey}
        filters={filters}
        updateFilters={handleFiltersChange}
        onSearchChange={() => setCurrentPage(1)}
      />
      <FilterPanel
        models={initialModels}
        filters={filters}
        updateFilters={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />
    </>
  );

  return (
    <Container>
      {/* Overlay backdrop for filter panel below xl */}
      {showFilters && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm xl:hidden"
          onClick={handleCloseFilters}
        />
      )}

      <div className="relative grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_480px]">
        <div className="space-y-6">
          {filteredModels.length > 0 ? (
            <>
              <ResultsSummaryBar
                startDisplay={startDisplay}
                endDisplay={endDisplay}
                totalCount={filteredModels.length}
                perPage={perPage}
                onPerPageChange={handlePerPageChange}
                onToggleFilters={handleToggleFilters}
                showFilters={showFilters}
              />
              <ResultsTableSection data={filteredModels} perPage={perPage} currentPage={currentPage} />
            </>
          ) : (
            <NoResultsState />
          )}

          {filteredModels.length > 0 && (
            <div className="sticky bottom-0 z-20">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                startDisplay={startDisplay}
                endDisplay={endDisplay}
                totalCount={filteredModels.length}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Right column: sticky in-grid at xl+, fixed overlay below xl */}
        <div
          className={[
            // xl+: in-grid sticky
            'xl:sticky xl:top-4 xl:right-auto xl:block xl:h-fit xl:translate-x-0 xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none',
            // below xl: fixed overlay
            'fixed z-40 bg-white transition-all duration-300 ease-in-out',
            // below md: full-width bottom sheet
            'inset-x-0 bottom-0 max-h-[60vh] overflow-y-auto border-t-4 border-black p-0 shadow-2xl',
            // md to xl: right-side panel
            'md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-115 md:overflow-y-auto md:border-t-0 md:border-l-4 md:border-black md:p-0 md:shadow-2xl',
            showFilters
              ? 'translate-y-0 md:translate-x-0 md:translate-y-0'
              : 'translate-y-full md:translate-x-full md:translate-y-0',
          ].join(' ')}
        >
          {/* Close button row for overlay mode (xl:hidden) */}
          <div className="sticky top-0 z-10 mb-4 flex items-center justify-between border-b-4 border-black bg-white p-6 py-4 xl:hidden">
            <h3 className="font-heading text-lg font-black text-black uppercase">Filters</h3>
            <Button id="btn-close-filters" variant="primary" size="sm" className="h-10" onClick={handleCloseFilters}>
              <X className="h-4 w-4" strokeWidth={3} />
              <span className="hidden md:inline">Close</span>
            </Button>
          </div>
          <div className="p-6 xl:p-0">
            <div className="space-y-6">{filterPanelContent}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
