import type { JSX } from 'react';

/**
 * Empty-state block for no filtered models.
 *
 * @returns {JSX.Element} No results state.
 */
export function NoResultsState(): JSX.Element {
  return (
    <div id="no-results-state" className="border-4 border-black bg-white p-6 text-center md:p-12">
      <p className="text-text text-base font-bold md:text-lg">No models found matching your filters</p>
      <p className="text-text-muted mt-2 text-xs md:text-sm">Try adjusting your search criteria</p>
    </div>
  );
}
