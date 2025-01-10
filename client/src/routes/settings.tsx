import UserSettingsForm from "@/components/settings/user-settings";
import ProtectedRoute from "./protected-route";

const Settings = () => {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center w-full">
        <UserSettingsForm />
      </div>
    </ProtectedRoute>
  );
};

export default Settings;
