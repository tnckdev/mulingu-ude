import { User, UserSettings } from "@/utils/types";
import axios from "axios";

const fetchUserSettings = async (user: User) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/settings?email=${user.email}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateUserSettings = async (user: User, userSettings: UserSettings) => {
  try {

    const body = {
      userSettings,
      email: user.email,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/settings`,
      body,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchUserSettings, updateUserSettings };
