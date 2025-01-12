import { Request, Response } from "express";
import {
  findLanguageNouns,
  findLanguageVerbs,
} from "../lib/dictionary-connector";
import { z } from "zod";
import { LanguageISOZod } from "../types";

const getLanguageNouns = async (req: Request, res: Response) => {
  try {
    const SearchParams = z.object({
      language: LanguageISOZod,
    });

    const { language } = SearchParams.parse(req.query);

    const languageNouns = await findLanguageNouns(language);

    return res.status(200).json(languageNouns);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getLanguageVerbs = async (req: Request, res: Response) => {
  try {
    const SearchParams = z.object({
      language: LanguageISOZod,
    });

    const { language } = SearchParams.parse(req.query);

    const languageVerbs = await findLanguageVerbs(language);

    return res.status(200).json(languageVerbs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export { getLanguageNouns, getLanguageVerbs };
