'use client';

import { useCallback, useMemo, useState, type JSX } from 'react';

import { defaultFilters } from '@/components/filters/constants/defaultFilters';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { Container } from '@/components/layout/Container';
import { NoResultsState } from '@/components/model-finder/NoResultsState';
import { PaginationControls } from '@/components/model-finder/PaginationControls';
import { ResultsSummaryBar } from '@/components/model-finder/ResultsSummaryBar';
import { ResultsTableSection } from '@/components/model-finder/ResultsTableSection';
import { SearchInput } from '@/components/search/SearchInput';
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

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_480px]">
        <div className="space-y-6">
          {filteredModels.length > 0 ? (
            <>
              <ResultsSummaryBar
                startDisplay={startDisplay}
                endDisplay={endDisplay}
                totalCount={filteredModels.length}
                perPage={perPage}
                onPerPageChange={handlePerPageChange}
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

        <div className="h-fit xl:sticky xl:top-4">
          <div className="space-y-6">
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
          </div>
        </div>
      </div>
    </Container>
  );
}
