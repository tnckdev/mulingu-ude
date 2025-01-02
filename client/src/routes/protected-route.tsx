import { useSession } from "@/components/session-provider";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/signin");
      return;
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
