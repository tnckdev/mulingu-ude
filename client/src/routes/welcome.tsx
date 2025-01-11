import UserSettingsForm from "@/components/settings/user-settings";
import { useAppSelector } from "@/hooks/redux";
import { selectUser, selectUserSettings } from "@/lib/redux/slices/user";
// import { fetchUserSettings } from "@/lib/settings";
import { useEffect, useState } from "react";
import ProtectedRoute from "./protected-route";

const Welcome = () => {
  const user = useAppSelector(selectUser);
  const userSettings = useAppSelector(selectUserSettings);

  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    const checkNewUser = async () => {
      if (!userSettings) {
        setNewUser(true);
      }
    };

    checkNewUser();
  }, [user, userSettings]);

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-5xl font-bold">{`Welcome${!newUser ? " back" : ""}, ${user?.name}!`}</h1>
        {newUser && (
          <div className="w-1/2 flex flex-col items-start gap-5">
            <p>It looks like you're new here. Let's set up your account.</p>
            <UserSettingsForm />
          </div>
        )}

        {/* {newUser && <UserSettingsForm />} */}
      </div>
    </ProtectedRoute>
  );
};

export default Welcome;
