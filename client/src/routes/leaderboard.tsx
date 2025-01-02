import SortingButton from "@/components/sorting-button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ProtectedRoute from "./protected-route";

const Leaderbord = () => {
  type User = { rank: number; name: string; points: number };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "rank",
      header: ({ column }) => (
        <SortingButton
          getIsSorted={column.getIsSorted}
          toggleSorting={column.toggleSorting}
        />
      ),
      cell: ({ row }) => (
        <div className="text-left font-bold pl-4">{row.getValue("rank")}</div>
      ),
    },
    {
      accessorKey: "name",

      header: ({ column }) => (
        <div className="flex gap-3 justify-center">
          <div className="flex flex-col justify-center">
            <p>Name</p>
          </div>
          <SortingButton
            getIsSorted={column.getIsSorted}
            toggleSorting={column.toggleSorting}
          />
        </div>
      ),
    },
    {
      accessorKey: "points",
      header: () => <div className="text-right font-bold">Points</div>,
      cell: ({ row }) => (
        <div className="text-right font-bold">{row.getValue("points")}</div>
      ),
    },
  ];

  const data: User[] = [
    { rank: 1, name: "Mats", points: 42000 },
    { rank: 2, name: "Ziad", points: 39999 },
    { rank: 3, name: "Madeleine", points: 27000 },
    { rank: 4, name: "Daniel", points: 18700 },
    { rank: 5, name: "Khaloud", points: 12345 },
    { rank: 6, name: "John Doe", points: 9845 },
    { rank: 7, name: "Jane Doe", points: 7650 },
    { rank: 8, name: "Max Mustermann", points: 5320 },
    { rank: 9, name: "Ola Nordmann", points: 1234 },
    { rank: 10, name: "Erik Mustermann", points: 187 },
  ];

  return (
    <ProtectedRoute>
      <div className="w-full flex justify-center">
        <DataTable
          filterColumn="name"
          filterPlaceholder="Search name..."
          columns={columns}
          data={data}
          className="w-1/2"
        />
      </div>
    </ProtectedRoute>
  );
};

export default Leaderbord;
