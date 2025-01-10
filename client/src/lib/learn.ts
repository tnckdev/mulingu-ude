import axios from "axios";

const fetchRandomTasks = async (
  sentences: number,
  nouns: number,
  verbs: number,
  languages: string[]
) => {
  const languageQuery = languages.join("&languages=");

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