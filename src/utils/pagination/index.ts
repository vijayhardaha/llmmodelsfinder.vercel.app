/**
 * Calculates total pages.
 *
 * @param {number} totalItems - Total item count.
 * @param {number} perPage - Items per page.
 *
 * @returns {number} Total pages.
 */
export const getTotalPages = (totalItems: number, perPage: number): number => {
  return Math.ceil(totalItems / perPage);
};

/**
 * Calculates starting row index for current page.
 *
 * @param {number} currentPage - Current page number.
 * @param {number} perPage - Items per page.
 *
 * @returns {number} Zero-based start index.
 */
export const getStartIndex = (currentPage: number, perPage: number): number => {
  return (currentPage - 1) * perPage;
};

/**
 * Calculates ending row display index for current page.
 *
 * @param {number} startIndex - Zero-based start index.
 * @param {number} perPage - Items per page.
 * @param {number} totalItems - Total item count.
 *
 * @returns {number} One-based end index.
 */
export const getEndIndex = (startIndex: number, perPage: number, totalItems: number): number => {
  return Math.min(startIndex + perPage, totalItems);
};

/**
 * Builds visible page numbers for pagination controls.
 *
 * @param {number} currentPage - Current page number.
 * @param {number} totalPages - Total pages.
 * @param {number} boundaryCount - Number of pages to always show at the start and end.
 * @param {number} siblingCount - Number of pages to show on each side of the current page.
 *
 * @returns {(number | 'ellipsis')[]} Visible page items.
 */
export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  boundaryCount: number = 2,
  siblingCount: number = 1
): Array<number | 'ellipsis'> => {
  if (totalPages <= 0) return [];

  const pageSet = new Set<number>();

  for (let page = 1; page <= Math.min(boundaryCount, totalPages); page += 1) {
    pageSet.add(page);
  }

  for (
    let page = Math.max(1, currentPage - siblingCount);
    page <= Math.min(totalPages, currentPage + siblingCount);
    page += 1
  ) {
    pageSet.add(page);
  }

  for (let page = Math.max(1, totalPages - boundaryCount + 1); page <= totalPages; page += 1) {
    pageSet.add(page);
  }

  const orderedPages = Array.from(pageSet).sort((a, b) => a - b);
  const visibleItems: Array<number | 'ellipsis'> = [];

  orderedPages.forEach((page, index) => {
    const previousPage = orderedPages[index - 1];
    if (index > 0 && previousPage !== undefined && page - previousPage > 1) {
      visibleItems.push('ellipsis');
    }
    visibleItems.push(page);
  });

  return visibleItems;
};
