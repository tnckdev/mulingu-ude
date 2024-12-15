import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import getFlagEmoji from "@/utils/flags";
import { Noun } from "@/utils/types";

// export type DictionaryEntry = {
//   word: string;
//   iso: string;
//   fluency: number;
// };

export const columns: ColumnDef<Noun>[] = [
  { accessorKey: "article", header: "" },
  {
    accessorKey: "word",
    header: ({ column }) => {
      return (
        <div className="flex gap-3">
          <div className="flex flex-col justify-center">
            <p>Word</p>
          </div>
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-5 w-10 bg-transparent text-foreground hover:bg-background"
          >
            {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left font-bold">{row.getValue("word")}</div>;
    },
    sortingFn: "text",
  },
  {
    accessorKey: "iso",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-5 w-10 bg-transparent text-foreground hover:bg-background"
        >
          {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="w-10">{getFlagEmoji(row.getValue("iso"))}</p>;
    },
  },
  {
    accessorKey: "fluency",
    header: "Fluency",
    cell: ({ row }) => {
      return (
        <div className="text-left font-semibold">{row.getValue("fluency")}</div>
      );
    },
  },
];

export default function DictionaryTable() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <DataTable
        columns={columns}
        data={[
          { article: "der", word: "Mann", iso: "DE", fluency: 2.7 },
          { article: "the", word: "man", iso: "US", fluency: 3.4 },
          { article: "den", word: "mann", iso: "NO", fluency: 1.87 },
          { article: "el", word: "hombre", iso: "ES", fluency: 4.2 },
          { article: "le", word: "homme", iso: "FR", fluency: 0.69 },

          { article: "die", word: "Frau", iso: "DE", fluency: 0.42 },
          { article: "the", word: "woman", iso: "US", fluency: 2.2 },
          { article: "den", word: "kvinne", iso: "NO", fluency: 1.6 },
          { article: "la", word: "mujer", iso: "ES", fluency: 3.2 },
          { article: "la", word: "femme", iso: "FR", fluency: 5.0 },

          { article: "der", word: "Apfel", iso: "DE", fluency: 1.3 },
          { article: "the", word: "apple", iso: "US", fluency: 2.4 },
          { article: "det", word: "eple", iso: "NO", fluency: 3.1 },
          { article: "la", word: "manzana", iso: "ES", fluency: 2.1 },
          { article: "la", word: "pomme", iso: "FR", fluency: 2.75 },

          { article: "das", word: "Haus", iso: "DE", fluency: 0.3},
          { article: "the", word: "house", iso: "US", fluency: 4.2 },
          { article: "det", word: "hus", iso: "NO", fluency: 5.0 },
          { article: "la", word: "casa", iso: "ES", fluency: 0.3 },
          { article: "la", word: "maison", iso: "FR", fluency: 0.0 },
        ]}
        className="w-1/2"
      />
    </div>
  );
}
