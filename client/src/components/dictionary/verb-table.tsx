import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { StandardVerb } from "@/utils/types";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  //   getSortedRowModel,
  //   SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const VerbTable = ({ data }: { data: StandardVerb[] }) => {
  const columns: ColumnDef<StandardVerb>[] = [
    {
      accessorKey: "infinitive",
      header: "Infinitive",
      cell: ({ row }) => {
        return (
          <div className="text-left font-bold">
            {row.getValue("infinitive")}
          </div>
        );
      },
      size: 100,
    },
  ];

  //   type Filter = "singular" | "plural";
  //   const filters: Filter[] = ["singular", "plural"];
  //   const [filter, setFilter] = useState<Filter>("plural");

  //   const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      //   sorting,
      columnFilters,
      pagination,
    },
    defaultColumn: {
      size: 200,
    },
  });

  return (
    <>
      <p>Search</p>
      <div className="flex items-center w-full border rounded-xl p-2">
        <Input
          placeholder="Search infinitive..."
          value={
            (table.getColumn("infinitive")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("infinitive")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <DataTable table={table} className="w-full" />
    </>
  );
};

export default VerbTable;
