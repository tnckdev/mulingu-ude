import DictionaryTable from "@/components/dictionary-table";
import ProtectedRoute from "./protected-route";

export default function Dictionary() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col justify-normal w-full">
        <DictionaryTable />
      </div>
    </ProtectedRoute>
  );
}
