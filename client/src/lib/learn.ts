import { LanguageISO } from "@/utils/types";
import axios from "axios";

const fetchRandomTasks = async (
  sentences: number,
  nouns: number,
  verbs: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  languages: LanguageISO[]
) => {
  const testLanguages: LanguageISO[] = ["us", "de"];

  const languageQuery = testLanguages.join("&languages=");

  const params = {
    sentences,
    nouns,
    verbs,
  };

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/learn/random?languages=${languageQuery}`,
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
