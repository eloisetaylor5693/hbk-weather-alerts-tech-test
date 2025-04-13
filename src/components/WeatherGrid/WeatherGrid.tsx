import { useState } from "react";

import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { BasicWeatherAlert } from "@/types/BasicWeatherAlert";
import { useRouter } from "next/router";
import GridColumns from "./GridColumns";

const WeatherGrid = ({ data }: { data: BasicWeatherAlert[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const router = useRouter();

  const columns = GridColumns(data);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  const handleRowClick = (rowData: BasicWeatherAlert) => {
    const encodedUrl = encodeURIComponent(rowData.id);
    router.push(`/alert/${encodedUrl}`);
  };

  return (
    <div>
      <table className="table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`w-1/${columns.length} p-2 text-left align-text-top`}
                >
                  <span
                    onClick={header.column.getToggleSortingHandler()}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        : ""
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </span>

                  {header.column.getCanFilter() && (
                    <div key={header.id} className="filter mr-2 mb-2">
                      <input
                        type="text"
                        className="p-1 border rounded"
                        placeholder={`Filter ${header.id}...`}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => handleRowClick(row.original)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="align-top  p-2 text-wrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherGrid;
