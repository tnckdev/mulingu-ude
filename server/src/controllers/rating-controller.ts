import { Request, Response } from "express";
import { z } from "zod";
import { LanguageISOZ, RatingLanguageZ } from "../types";
import {
  findRatings,
  findUserRating,
  findUserRatings,
} from "../lib/connectors/rating-connector";

const getRatings = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    language: RatingLanguageZ.default("total"),
    start: z.coerce.number().default(0),
    amount: z.coerce.number().default(10),
  });

  try {
    const { language, start, amount } = SearchParams.parse(req.query);

    //const ratings = await findRatings(language, start, amount);
    const ratings = await findRatings(language);

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getUserRating = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    userId: z.string(),
    language: RatingLanguageZ.default("total"),
  });

  try {
    const { userId, language } = SearchParams.parse(req.query);

    const rating = await findUserRating(userId, language);

    return res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getUserRatings = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    userId: z.string(),
  });

  try {
    const { userId } = SearchParams.parse(req.query);

    const ratings = await findUserRatings(userId);

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export { getRatings, getUserRating, getUserRatings };
