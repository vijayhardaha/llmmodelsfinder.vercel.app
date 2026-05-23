'use client';

import { useMemo, useState, type JSX } from 'react';

import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

import { BooleanBadgeCell } from '@/components/table/cells/BooleanBadgeCell';
import { CostCell, CostHeader } from '@/components/table/cells/CostCell';
import { ModalityCell } from '@/components/table/cells/ModalityCell';
import { EMPTY_VALUE } from '@/components/table/constants/table';
import { CopyButton } from '@/components/ui/CopyButton';
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
 * Renders the table thead with sortable header cells.
 *
 * @param {object} params - Function params.
 * @param {typeof table} params.table - TanStack table instance.
 *
 * @returns {JSX.Element} Table header element.
 */
function renderTableHeader({ table }: { table: ReturnType<typeof useReactTable<Model>> }): JSX.Element {
  return (
    <thead id="model-table-thead">
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
  );
}

/**
 * Renders the table tbody with paginated row cells.
 *
 * @param {object} params - Function params.
 * @param {typeof table} params.table - TanStack table instance.
 * @param {number} params.perPage - Results per page.
 * @param {number} params.currentPage - Current page number.
 *
 * @returns {JSX.Element} Table body element.
 */
function renderTableBody({
  table,
  perPage,
  currentPage,
}: {
  table: ReturnType<typeof useReactTable<Model>>;
  perPage: number;
  currentPage: number;
}): JSX.Element {
  return (
    <tbody id="model-table-tbody">
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
  );
}

/**
 * Provider column definition with logo, name, and provider ID.
 *
 * @returns {ColumnDef<Model>} Provider column config.
 */
function providerColumn(): ColumnDef<Model> {
  return {
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
  };
}

/**
 * Model name column definition with name, ID, and copy button.
 *
 * @returns {ColumnDef<Model>} Name column config.
 */
function nameColumn(): ColumnDef<Model> {
  return {
    accessorKey: 'name',
    header: 'Model',
    cell: ({ row }) => (
      <div>
        <div className="font-bold">{row.original.name}</div>
        <div className="text-text-muted inline-flex items-center gap-1 font-mono text-[10px]">
          {row.original.id}
          <CopyButton value={row.original.id} />
        </div>
      </div>
    ),
  };
}

/**
 * Family column definition.
 *
 * @returns {ColumnDef<Model>} Family column config.
 */
function familyColumn(): ColumnDef<Model> {
  return { accessorKey: 'family', header: 'Family' };
}

/**
 * Creates a cost column definition for the given accessor and title.
 *
 * @param {string} accessorKey - The model property key.
 * @param {string} title - Display header title.
 *
 * @returns {ColumnDef<Model>} Cost column config.
 */
function costColumn(accessorKey: keyof Model, title: string): ColumnDef<Model> {
  return {
    accessorKey,
    header: () => <CostHeader title={title} />,
    cell: ({ row }) => <CostCell value={row.original[accessorKey] as number} />,
  };
}

/**
 * Creates a limit column definition for the given accessor and title.
 *
 * @param {string} accessorKey - The model property key.
 * @param {string} title - Display header title.
 *
 * @returns {ColumnDef<Model>} Limit column config.
 */
function limitColumn(accessorKey: keyof Model, title: string): ColumnDef<Model> {
  return {
    accessorKey,
    header: title,
    cell: ({ row }) => renderLimitValue(row.original[accessorKey] as number | null | undefined),
  };
}

/**
 * Creates a boolean badge column definition for the given accessor and title.
 *
 * @param {string} accessorKey - The model property key.
 * @param {string} title - Display header title.
 *
 * @returns {ColumnDef<Model>} Boolean badge column config.
 */
function booleanBadgeColumn(accessorKey: keyof Model, title: string): ColumnDef<Model> {
  return {
    accessorKey,
    header: title,
    cell: ({ row }) => <BooleanBadgeCell value={row.original[accessorKey] as boolean | null | undefined} />,
  };
}

/**
 * Creates a modality column definition for the given accessor and title.
 *
 * @param {string} accessorKey - The model property key.
 * @param {string} title - Display header title.
 *
 * @returns {ColumnDef<Model>} Modality column config.
 */
function modalityColumn(accessorKey: keyof Model, title: string): ColumnDef<Model> {
  return {
    accessorKey,
    header: title,
    cell: ({ row }) => <ModalityCell values={row.original[accessorKey] as string[]} />,
  };
}

/**
 * Creates a simple text column definition for the given accessor and title.
 *
 * @param {string} accessorKey - The model property key.
 * @param {string} title - Display header title.
 *
 * @returns {ColumnDef<Model>} Text column config.
 */
function textColumn(accessorKey: keyof Model, title: string): ColumnDef<Model> {
  return {
    accessorKey,
    header: title,
    cell: ({ row }) => (row.original[accessorKey] as string | null | undefined) || EMPTY_VALUE,
  };
}

/**
 * Returns table columns configuration.
 *
 * @returns {ColumnDef<Model>[]} Model table columns.
 */
function getModelColumns(): ColumnDef<Model>[] {
  return [
    providerColumn(),
    nameColumn(),
    familyColumn(),
    costColumn('inputCost', 'Input Cost'),
    costColumn('outputCost', 'Output Cost'),
    costColumn('cacheReadCost', 'Cache Read Cost'),
    limitColumn('context', 'Context Limit'),
    limitColumn('outputLimit', 'Output Limit'),
    limitColumn('inputLimit', 'Input Limit'),
    booleanBadgeColumn('toolCall', 'Tool Call'),
    booleanBadgeColumn('reasoning', 'Reasoning'),
    modalityColumn('inputModality', 'Input'),
    modalityColumn('outputModality', 'Output'),
    costColumn('reasoningCost', 'Reasoning Cost'),
    costColumn('cacheWriteCost', 'Cache Write Cost'),
    costColumn('audioInputCost', 'Audio Input Cost'),
    costColumn('audioOutputCost', 'Audio Output Cost'),
    booleanBadgeColumn('structuredOutput', 'Structured Output'),
    booleanBadgeColumn('temperature', 'Temperature'),
    booleanBadgeColumn('weights', 'Weights'),
    textColumn('knowledge', 'Knowledge'),
    textColumn('releaseDate', 'Release Date'),
    textColumn('lastUpdated', 'Last Updated'),
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

  const [sorting, setSorting] = useState<SortingState>([{ id: 'provider', desc: false }]);
  const columns = useMemo(() => getModelColumns(), []);

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
    <div id="model-table-wrapper" className="overflow-x-auto border-4 border-black">
      <table id="model-table" className="w-full">
        {renderTableHeader({ table })}
        {renderTableBody({ table, perPage, currentPage })}
      </table>
    </div>
  );
}
