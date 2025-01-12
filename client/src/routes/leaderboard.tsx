import LeaderboardBox from "@/components/leaderboard/leaderboard-box";
import ProtectedRoute from "@/routes/protected-route";

const Leaderbord = () => {
  return (
    <ProtectedRoute>
      <LeaderboardBox />
    </ProtectedRoute>
  );
};

export default Leaderbord;
