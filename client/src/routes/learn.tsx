import LearnArea from "@/components/learn/learn-area";
import ProtectedRoute from "./protected-route";

export default function Learn() {
  return (
    <ProtectedRoute>
      <div className="w-full items-center">
        <LearnArea />
      </div>
    </ProtectedRoute>
  );
}
