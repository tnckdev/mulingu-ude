import { RatingEntry } from "@/lib/ratings";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

const LeaderboardTable = ({ data }: { data: RatingEntry[] }) => {
  const columns: ColumnDef<RatingEntry>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => (
        <div className="text-left font-bold pl-4">{row.getValue("rank")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="text-left font-bold pl-4">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="text-right font-bold">{row.getValue("rating")}</div>
      ),
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

  return <DataTable table={table} className="w-full"/>;
};

export default LeaderboardTable;
