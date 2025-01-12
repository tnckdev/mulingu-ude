import DictionaryTable from "@/components/dictionary/dictionary-table";
import ProtectedRoute from "@/routes/protected-route";

export default function Dictionary() {
  return (
    <ProtectedRoute>
      <DictionaryTable />
    </ProtectedRoute>
  );
}
