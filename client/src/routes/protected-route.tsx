import { useSession } from "@/components/providers/session-provider";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const callbackUrl = `${location.pathname}`;

    if (!loading && !session) {
      navigate(`/signin?callbackUrl=${callbackUrl}`);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, loading]);

  return (loading || !session) ? <p>Loading...</p> : children;
};

export default ProtectedRoute;
