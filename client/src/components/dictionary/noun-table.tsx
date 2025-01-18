// import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { BasicNoun } from "@/utils/types";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
// import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const BasicNounTable = ({ data }: { data: BasicNoun[] }) => {
  const columns: ColumnDef<BasicNoun>[] = [
    {
      accessorKey: "singular",
      header: "Singular",
      cell: ({ row }) => {
        return (
          <div className="text-left font-bold">{row.getValue("singular")}</div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "plural",
      header: "Plural",
      cell: ({ row }) => {
        return (
          <div className="text-left font-bold">{row.getValue("plural")}</div>
        );
      },
      size: 100,
    },
    // {
    //   accessorKey: "BasicNounGroupId",
    //   header: "Group",
    //   cell: ({ row }) => {
    //     const BasicNounGroupId = row.getValue("BasicNounGroupId") as string;

    //     return (
    //       <div className="text-left font-bold">
    //         <Button
    //           onClick={() => navigate(`/dictionary/${BasicNounGroupId}`)}
    //           className="aspect-square"
    //         >
    //           <ArrowRight />
    //         </Button>
    //       </div>
    //     );
    //   },
    //   size: 20,
    // },
  ];

  //   const navigate = useNavigate();

  type Filter = "singular" | "plural";
  const filters: Filter[] = ["singular", "plural"];
  const [filter, setFilter] = useState<Filter>("singular");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    defaultColumn: {
      size: 200,
    },
  });

  useEffect(() => {
    table.setColumnFilters([{ id: filter, value: "" }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      <p>Search</p>
      <div className="flex items-center w-full border rounded-xl p-2">
        <Input
          placeholder={`Search ${filter}...`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
        />
      </div>
      <p>Numerus</p>
      <div className="flex border rounded-xl p-2 w-full">
        {filters.map((f) => (
          <Button
            key={f}
            className="w-full"
            variant={f === filter ? "default" : "outline"}
            onClick={() => {
              setFilter(f);
            }}
          >
            {f.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <DataTable table={table} className="w-full" />
    </>
  );
};

export default BasicNounTable;
