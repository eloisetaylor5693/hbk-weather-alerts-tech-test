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

const WeatherGrid = ({ data }: { data: BasicWeatherAlert[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<BasicWeatherAlert>();

  const columns = [
    columnHelper.accessor((row) => row.event, {
      id: "Event",
      cell: (info) => <i>{info.getValue()}</i>,
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.areaDescription, {
      id: "Area",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.severity, {
      id: "Severity",
      cell: (info) => <i>{info.getValue()}</i>,
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.urgency, {
      id: "Urgency",
      cell: (info) => <i>{info.getValue()}</i>,
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.effective, {
      id: "Effective",
      cell: (info) => {
        const dateString = info.getValue();
        const date = new Date(dateString);
        return <span suppressHydrationWarning>{date.toLocaleString()}</span>;
      },
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor((row) => row.certainty, {
      id: "Certainty",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.response, {
      id: "Response",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.instruction, {
      id: "Instruction",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableColumnFilter: false,
    }),
  ];

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

  return (
    <div>
      <table className="table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`w-1/${columns.length} p-2 text-left`}
                    onClick={header.column.getToggleSortingHandler()}
                >
                  <span>
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
                    <div
                      key={header.id}
                      className="filter inline-block mr-2 mb-2"
                    >
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
            <tr key={row.id}>
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
