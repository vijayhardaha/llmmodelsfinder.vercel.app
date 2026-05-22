'use client';

import * as React from 'react';
import type { JSX } from 'react';

import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

import { BooleanBadgeCell } from '@/components/table/cells/BooleanBadgeCell';
import { CostCell, CostHeader } from '@/components/table/cells/CostCell';
import { ModalityCell } from '@/components/table/cells/ModalityCell';
import { EMPTY_VALUE } from '@/components/table/constants/table';
import type { Model } from '@/types/models';
import { formatNumber } from '@/utils';

/**
 * Props for ModelTable component.
 *
 * @interface ModelTableProps
 * @property {Model[]} data - Model data to display.
 * @property {number} [perPage] - Results per page.
 * @property {number} [currentPage] - Current page number.
 * @property {(sorting: SortingState) => void} [onSortingChange] - Callback for sorting changes.
 */
interface ModelTableProps {
  data: Model[];
  perPage?: number;
  currentPage?: number;
  onSortingChange?: (sorting: SortingState) => void;
}

/**
 * Sorts provider values with numeric-first ordering.
 *
 * @param {Row<Model>} rowA - First row.
 * @param {Row<Model>} rowB - Second row.
 *
 * @returns {number} Sort result value.
 */
function customProviderSort(rowA: Row<Model>, rowB: Row<Model>): number {
  const providerAValue = String(rowA.getValue('provider'));
  const providerBValue = String(rowB.getValue('provider'));
  const providerAStartsWithNumber = /^\d/.test(providerAValue);
  const providerBStartsWithNumber = /^\d/.test(providerBValue);

  if (providerAStartsWithNumber && !providerBStartsWithNumber) return -1;
  if (!providerAStartsWithNumber && providerBStartsWithNumber) return 1;
  return providerAValue.localeCompare(providerBValue);
}

/**
 * Renders a numeric limit value.
 *
 * @param {number | null | undefined} value - Limit value.
 *
 * @returns {JSX.Element} Limit cell value.
 */
function renderLimitValue(value: number | null | undefined): JSX.Element {
  if (value === null || value === undefined) return <span>{EMPTY_VALUE}</span>;
  return <span className="font-mono">{formatNumber(value)}</span>;
}

/**
 * Returns table columns configuration.
 *
 * @returns {ColumnDef<Model>[]} Model table columns.
 */
function getModelColumns(): ColumnDef<Model>[] {
  return [
    {
      accessorKey: 'provider',
      header: 'Provider',
      sortingFn: customProviderSort,
      cell: ({ row }) => (
        <div>
          <div className="font-bold">
            {row.original.providerDoc ? (
              <a
                href={row.original.providerDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-primary inline-flex cursor-pointer items-center gap-0.25 underline"
              >
                <Image
                  src={`https://models.dev/logos/${row.original.providerId}.svg`}
                  width={20}
                  height={20}
                  alt={row.original.provider}
                  className="mr-1 h-4 w-4 shrink-0"
                />
                {row.original.provider}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-black" aria-hidden="true" />
              </a>
            ) : (
              row.original.provider
            )}
          </div>
          <div className="text-text-muted font-mono text-xs">{row.original.providerId}</div>
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Model',
      cell: ({ row }) => (
        <div>
          <div className="font-bold">{row.original.name}</div>
          <div className="text-text-muted font-mono text-[10px]">{row.original.id}</div>
        </div>
      ),
    },
    { accessorKey: 'family', header: 'Family' },
    {
      accessorKey: 'inputCost',
      header: () => <CostHeader title="Input Cost" />,
      cell: ({ row }) => <CostCell value={row.original.inputCost} />,
    },
    {
      accessorKey: 'outputCost',
      header: () => <CostHeader title="Output Cost" />,
      cell: ({ row }) => <CostCell value={row.original.outputCost} />,
    },
    {
      accessorKey: 'cacheReadCost',
      header: () => <CostHeader title="Cache Read Cost" />,
      cell: ({ row }) => <CostCell value={row.original.cacheReadCost} />,
    },
    { accessorKey: 'context', header: 'Context Limit', cell: ({ row }) => renderLimitValue(row.original.context) },
    {
      accessorKey: 'outputLimit',
      header: 'Output Limit',
      cell: ({ row }) => renderLimitValue(row.original.outputLimit),
    },
    { accessorKey: 'inputLimit', header: 'Input Limit', cell: ({ row }) => renderLimitValue(row.original.inputLimit) },
    {
      accessorKey: 'toolCall',
      header: 'Tool Call',
      cell: ({ row }) => <BooleanBadgeCell value={row.original.toolCall} />,
    },
    {
      accessorKey: 'reasoning',
      header: 'Reasoning',
      cell: ({ row }) => <BooleanBadgeCell value={row.original.reasoning} />,
    },
    {
      accessorKey: 'inputModality',
      header: 'Input',
      cell: ({ row }) => <ModalityCell values={row.original.inputModality} />,
    },
    {
      accessorKey: 'outputModality',
      header: 'Output',
      cell: ({ row }) => <ModalityCell values={row.original.outputModality} />,
    },
    {
      accessorKey: 'reasoningCost',
      header: () => <CostHeader title="Reasoning Cost" />,
      cell: ({ row }) => <CostCell value={row.original.reasoningCost} />,
    },
    {
      accessorKey: 'cacheWriteCost',
      header: () => <CostHeader title="Cache Write Cost" />,
      cell: ({ row }) => <CostCell value={row.original.cacheWriteCost} />,
    },
    {
      accessorKey: 'audioInputCost',
      header: () => <CostHeader title="Audio Input Cost" />,
      cell: ({ row }) => <CostCell value={row.original.audioInputCost} />,
    },
    {
      accessorKey: 'audioOutputCost',
      header: () => <CostHeader title="Audio Output Cost" />,
      cell: ({ row }) => <CostCell value={row.original.audioOutputCost} />,
    },
    {
      accessorKey: 'structuredOutput',
      header: 'Structured Output',
      cell: ({ row }) => <BooleanBadgeCell value={row.original.structuredOutput} />,
    },
    {
      accessorKey: 'temperature',
      header: 'Temperature',
      cell: ({ row }) => <BooleanBadgeCell value={row.original.temperature} />,
    },
    { accessorKey: 'weights', header: 'Weights', cell: ({ row }) => <BooleanBadgeCell value={row.original.weights} /> },
    { accessorKey: 'knowledge', header: 'Knowledge', cell: ({ row }) => row.original.knowledge || EMPTY_VALUE },
    { accessorKey: 'releaseDate', header: 'Release Date', cell: ({ row }) => row.original.releaseDate || EMPTY_VALUE },
    { accessorKey: 'lastUpdated', header: 'Last Updated', cell: ({ row }) => row.original.lastUpdated || EMPTY_VALUE },
  ];
}

/**
 * Model table component using TanStack Table.
 *
 * @param {ModelTableProps} props - Component props.
 *
 * @returns {JSX.Element} Model table component.
 */
export function ModelTable({ data, perPage = 15, currentPage = 1, onSortingChange }: ModelTableProps): JSX.Element {
  'use no memo';

  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'provider', desc: false }]);
  const columns = React.useMemo(() => getModelColumns(), []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (sortingUpdater) => {
      const nextSorting = typeof sortingUpdater === 'function' ? sortingUpdater(sorting) : sortingUpdater;
      setSorting(nextSorting);
      onSortingChange?.(nextSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto border-4 border-black">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b-4 border-black bg-black">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="hover:bg-primary cursor-pointer px-4 py-3 text-left text-xs font-black tracking-wider text-white uppercase hover:text-black"
                >
                  <div className="flex items-center gap-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice((currentPage - 1) * perPage, currentPage * perPage)
            .map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-surface-alt border-b-2 border-black transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-surface-alt'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
