/**
 * Base year used for release and knowledge dropdowns.
 */
export const YEAR_FILTER_START = 2015;

/**
 * Number of years to extend beyond the current year for dropdown options.
 */
export const YEAR_FILTER_END_OFFSET = 5;

/**
 * Default price range slider bounds.
 */
export const PRICE_RANGE_DEFAULTS = { min: 0, max: 150, step: 0.1 } as const;

/**
 * Default context window slider bounds.
 */
export const CONTEXT_WINDOW_DEFAULTS = { min: 0, max: 1500000, step: 50000 } as const;
