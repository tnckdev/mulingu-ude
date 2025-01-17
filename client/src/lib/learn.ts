import { LanguageISO } from "@/utils/types";
import axios from "axios";


const fetchRandomTasks = async (
  sentences: number,
  nouns: number,
  verbs: number,
  languages: LanguageISO[]
) => {
  const params = {
    sentences,
    nouns,
    verbs,
    languages: languages.join(","),
  };

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/learn/random`,
      {
        params,
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export { fetchRandomTasks };