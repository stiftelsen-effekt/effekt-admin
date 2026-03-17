import React, { HTMLAttributes, useMemo, useState } from "react";
import {
  ColumnDef,
  PaginationState,
  Row,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IPagination } from "../../../../models/types";

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export interface EffektTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data?: TData[];
  className?: string;
  loading?: boolean;
  noDataText?: string;
  showPagination?: boolean;
  showPageSizeOptions?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  manualPagination?: boolean;
  manualSorting?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  initialSorting?: SortingState;
  getRowProps?: (row: Row<TData>, rowIndex: number) => HTMLAttributes<HTMLDivElement>;
}

const resolveUpdater = <T,>(updater: Updater<T>, currentValue: T): T => {
  if (typeof updater === "function") {
    return (updater as (old: T) => T)(currentValue);
  }

  return updater;
};

const getColumnSizeStyle = (size?: number): React.CSSProperties => {
  if (size === undefined) {
    return {};
  }

  return {
    width: `${size}px`,
    minWidth: `${size}px`,
    flex: `0 0 ${size}px`,
  };
};

const collectExplicitColumnSizes = <TData,>(
  columnDefs: ColumnDef<TData, unknown>[],
  sizeMap: Record<string, number> = {},
): Record<string, number> => {
  for (const columnDef of columnDefs) {
    const childColumns = "columns" in columnDef ? columnDef.columns : undefined;

    if (childColumns) {
      collectExplicitColumnSizes(childColumns, sizeMap);
      continue;
    }

    if (!Object.prototype.hasOwnProperty.call(columnDef, "size")) {
      continue;
    }

    const explicitSize = columnDef.size;

    if (explicitSize === undefined) {
      continue;
    }

    const columnId =
      columnDef.id ??
      ("accessorKey" in columnDef && typeof columnDef.accessorKey === "string"
        ? columnDef.accessorKey
        : undefined);

    if (columnId) {
      sizeMap[columnId] = explicitSize;
    }
  }

  return sizeMap;
};

export const paginationFromApiState = (
  pagination: Pick<IPagination, "page" | "limit">,
): PaginationState => ({
  pageIndex: pagination.page,
  pageSize: pagination.limit,
});

export const sortingFromApiState = (sort?: IPagination["sort"]): SortingState =>
  sort ? [{ id: sort.id, desc: sort.desc }] : [];

export const sortingToApiState = (
  sorting: SortingState,
  fallback: IPagination["sort"],
): IPagination["sort"] => {
  const currentSort = sorting[0];

  if (!currentSort) {
    return fallback;
  }

  return {
    id: String(currentSort.id),
    desc: Boolean(currentSort.desc),
  };
};

export const EffektTable = <TData,>({
  columns,
  data,
  className,
  loading = false,
  noDataText = "No rows found",
  showPagination = true,
  showPageSizeOptions = true,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  manualPagination = false,
  manualSorting = false,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  initialSorting = [],
  getRowProps,
}: EffektTableProps<TData>) => {
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [internalSorting, setInternalSorting] = useState<SortingState>(initialSorting);

  const resolvedPagination = pagination ?? internalPagination;
  const resolvedSorting = sorting ?? internalSorting;
  const explicitColumnSizes = useMemo(() => collectExplicitColumnSizes(columns), [columns]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      pagination: resolvedPagination,
      sorting: resolvedSorting,
    },
    pageCount,
    manualPagination,
    manualSorting,
    enableSortingRemoval: false,
    onPaginationChange: (updater) => {
      const nextPagination = resolveUpdater(updater, resolvedPagination);

      if (onPaginationChange) {
        onPaginationChange(nextPagination);
      } else {
        setInternalPagination(nextPagination);
      }
    },
    onSortingChange: (updater) => {
      const nextSorting = resolveUpdater(updater, resolvedSorting);

      if (onSortingChange) {
        onSortingChange(nextSorting);
      } else {
        setInternalSorting(nextSorting);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;
  const visibleColumns = table.getVisibleFlatColumns();
  const pageIndex = resolvedPagination.pageIndex;
  const totalPages = table.getPageCount();
  const padRowCount = Math.max(resolvedPagination.pageSize - rows.length, 0);
  const rootClassName = ["ReactTable", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className="rt-table" role="table">
        <div className="rt-thead -header" role="rowgroup">
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              className="rt-tr"
              role="row"
              key={headerGroup.id}
              style={{ width: "100%", minWidth: "100%" }}
            >
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                const headerClassName = [
                  "rt-th",
                  canSort ? "-cursor-pointer" : undefined,
                  sorted === "asc" ? "-sort-asc" : undefined,
                  sorted === "desc" ? "-sort-desc" : undefined,
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    className={headerClassName}
                    key={header.id}
                    role="columnheader"
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    style={getColumnSizeStyle(explicitColumnSizes[header.column.id])}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="rt-tbody" role="rowgroup">
          {rows.map((row, rowIndex) => {
            const rowProps = getRowProps?.(row, rowIndex) ?? {};
            const { className: rowClassName, style: rowStyle, ...restRowProps } = rowProps;

            return (
              <div className="rt-tr-group" key={row.id}>
                <div
                  className={["rt-tr", rowClassName].filter(Boolean).join(" ")}
                  style={{ width: "100%", minWidth: "100%", ...(rowStyle ?? {}) }}
                  {...restRowProps}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      className="rt-td"
                      key={cell.id}
                      role="cell"
                      style={getColumnSizeStyle(explicitColumnSizes[cell.column.id])}
                    >
                      {flexRender(
                        cell.column.columnDef.cell ??
                          ((context) => context.getValue() as React.ReactNode),
                        cell.getContext(),
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {Array.from({ length: padRowCount }, (_, padRowIndex) => (
            <div className="rt-tr-group" key={`pad-row-${padRowIndex}`}>
              <div className="rt-tr -padRow" style={{ width: "100%", minWidth: "100%" }}>
                {visibleColumns.map((column) => (
                  <div
                    className="rt-td"
                    key={`pad-cell-${padRowIndex}-${column.id}`}
                    role="cell"
                    style={getColumnSizeStyle(explicitColumnSizes[column.id])}
                  >
                    &nbsp;
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!loading && rows.length === 0 && <div className="rt-noData">{noDataText}</div>}

      <div className={`-loading${loading ? " -active" : ""}`}>
        <div>Loading...</div>
      </div>

      {showPagination && (
        <div className="-pagination pagination-bottom">
          <div className="-previous">
            <button
              className="-btn"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              type="button"
            >
              Previous
            </button>
          </div>

          <div className="-center">
            <span className="-pageInfo">
              Page {Math.min(pageIndex + 1, Math.max(totalPages, 1))} of {Math.max(totalPages, 1)}
            </span>

            {showPageSizeOptions && (
              <span className="-pageSizeOptions">
                <span className="select-wrap">
                  <select
                    onChange={(event) => table.setPageSize(Number(event.target.value))}
                    value={resolvedPagination.pageSize}
                  >
                    {pageSizeOptions.map((pageSizeOption) => (
                      <option key={pageSizeOption} value={pageSizeOption}>
                        Show {pageSizeOption}
                      </option>
                    ))}
                  </select>
                </span>
              </span>
            )}
          </div>

          <div className="-next">
            <button
              className="-btn"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
