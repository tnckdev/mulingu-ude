import UserSettingsForm from "@/components/settings/user-settings";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUserSettings } from "@/lib/settings";
import { fetchSession } from "@/utils/auth";
import { selectUser, setUser } from "@/utils/redux/slices/userSlice";
import { Session, UserSettings } from "@/utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Welcome = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    const loadUser = async () => {
      const session: Session = await fetchSession();
      if (!session) {
        navigate("/signin");
        return;
      }

      dispatch(setUser(session.user));
    };
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="flex flex-col items-center justify-center">
      <h1>{`Welcome, ${user?.name}`}!</h1>
      {newUser && <UserSettingsForm />}
    </div>
  );
};

export default Welcome;
