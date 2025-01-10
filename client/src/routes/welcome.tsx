import UserSettingsForm from "@/components/settings/user-settings";
import { useAppSelector } from "@/hooks/redux";
import { fetchSession } from "@/lib/auth";
import { selectUser } from "@/lib/redux/slices/user";
import { fetchUserSettings } from "@/lib/settings";
import { Session, UserSettings } from "@/utils/types";
import { useEffect, useState } from "react";
import ProtectedRoute from "./protected-route";

const Welcome = () => {
  const user = useAppSelector(selectUser);

  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    const checkNewUser = async () => {
      const session: Session = await fetchSession();
      if (!session || !session.user) {
        return;
      }

      const userSettings: UserSettings = await fetchUserSettings(session.user);
      if (!userSettings) {
        setNewUser(true);
      }
    };

    checkNewUser();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center">
        <h1>{`Welcome, ${user?.name}`}!</h1>
        {newUser && <UserSettingsForm />}
      </div>
    </ProtectedRoute>
  );
};

export default Welcome;
