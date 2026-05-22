import type { JSX } from 'react';

/**
 * Loading skeleton component for table
 *
 * @returns {JSX.Element} Table skeleton element
 */
export function TableSkeleton(): JSX.Element {
  return (
    <div className="space-y-3 border-4 border-black bg-white p-4">
      {/* Header skeleton */}
      <div className="flex gap-2 border-b-4 border-black p-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-surface-alt h-4 flex-1 animate-pulse" />
        ))}
      </div>

      {/* Row skeletons */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-2 border-b-2 border-black p-3">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="bg-surface-alt h-4 flex-1 animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}
