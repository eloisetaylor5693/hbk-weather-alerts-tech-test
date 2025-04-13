import { BasicWeatherAlert } from "@/types/BasicWeatherAlert";
import { createColumnHelper } from "@tanstack/react-table";

const GridColumns = (data: BasicWeatherAlert[]) => {
  const columnHelper = createColumnHelper<BasicWeatherAlert>();

  return [
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
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ];
};

export default GridColumns;
