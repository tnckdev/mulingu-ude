import { LanguageISO } from "@/utils/types";
import axios from "axios";

const fetchLanguageNouns = async (language: LanguageISO) => {
  try {
    const params = {
      language,
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/dictionary/nouns`,
      { params, withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const fetchLanguageVerbs = async (language: LanguageISO) => {
  try {
    const params = {
      language,
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/dictionary/verbs`,
      { params, withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export { fetchLanguageNouns, fetchLanguageVerbs };
