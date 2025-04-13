import { useMemo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { WeatherAlert } from "@/types/WeatherAlert";

const WeatherGrid = ({ data }: { data: WeatherAlert[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<WeatherAlert>();

  const columns = [
    columnHelper.accessor((row) => row.category, {
      id: "Category",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Category</span>,
      footer: (info) => info.column.id,
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.areaDescription, {
      id: "Area",
      cell: (info) => <i>{info.getValue()}</i>,
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.certainty, {
      id: "Certainty",
      cell: (info) => <i>{info.getValue()}</i>,
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
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
                  className={`w-1/${columns.length} p-2 text-left `}
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
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 text-left">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default WeatherGrid;
