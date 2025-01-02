import UserSettingsForm from "@/components/settings/user-settings";
import { fetchSession } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ProtectedRoute from "./protected-route";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const session = await fetchSession();
      if (!session || !session.user) {
        navigate("/signin");
        return;
      }
    };

    checkUser();
  });

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center">
        <UserSettingsForm />
      </div>
    </ProtectedRoute>
  );
};

export default Settings;
