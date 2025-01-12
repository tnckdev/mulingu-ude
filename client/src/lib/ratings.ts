import { RatingLanguage } from "@/utils/types";
import axios from "axios";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ResponseRatingEntryZod = z.object({
  rank: z.number().default(0),
  // language: RatingLanguageZod,
  rating: z.number(),
  user: z.object({
    name: z.string(),
  }),
});
type ResponseRatingEntry = z.infer<typeof ResponseRatingEntryZod>;

const RatingEntryZod = z.object({
  rank: z.number().default(0),
  rating: z.number(),
  name: z.string(),
});
type RatingEntry = z.infer<typeof RatingEntryZod>;

const fetchRatingEntries = async (language: RatingLanguage) => {
  try {
    const start = 0;
    const params = {
      language,
      start,
      amount: 10,
    };

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/rating`, {
      params,
      withCredentials: true,
    });

    const ratingEntries = res.data.map(
      (entry: ResponseRatingEntry, index: number) => {
        const ratingEntry = RatingEntryZod.parse({
          ...entry,
          name: entry.user.name,
        });
        return {
          ...ratingEntry,
          rank: start + index + 1,
        };
      }
    );

    return ratingEntries;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export type { RatingEntry };

export { fetchRatingEntries };
