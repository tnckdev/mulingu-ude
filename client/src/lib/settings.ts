import { User, UserSettings } from "@/utils/types";
import axios from "axios";

const fetchUserSettings = async (user: User) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/settings?email=${user.email}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const postUserSettings = async (user: User, settings: UserSettings) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/settings?email=${user.email}`,
      settings,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const putUserSettings = async (user: User, settings: UserSettings) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/user/settings?email=${user.email}`,
      settings,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchUserSettings, postUserSettings, putUserSettings };
