import { useAppDispatch } from "@/hooks/redux";
import { fetchSession } from "@/utils/auth";
import { setUser } from "@/utils/redux/slices/userSlice";
import { Session } from "@/utils/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SessionContextProps {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps>({
  session: null,
  loading: true,
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await fetchSession();
        if (session && session.user) {
          setSession(session);
          dispatch(setUser(session.user));
        }
      } catch (error) {
        console.error("Failed to fetch session", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
