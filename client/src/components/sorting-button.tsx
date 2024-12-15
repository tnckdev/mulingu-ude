import { SortDirection } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const SortingButton = ({
  getIsSorted,
  toggleSorting,
}: {
  getIsSorted: () => false | SortDirection;
  toggleSorting: (desc?: boolean, isMulti?: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => toggleSorting(getIsSorted() === "asc")}
      className="h-5 w-10 bg-transparent text-foreground hover:bg-background"
    >
      {getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
    </Button>
  );
};

export default SortingButton;
