import UserSettingsForm from "@/components/settings/user-settings";
import { fetchSession } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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
    <div className="flex items-center justify-center">
      <UserSettingsForm />
    </div>
  );
};

export default Settings;
