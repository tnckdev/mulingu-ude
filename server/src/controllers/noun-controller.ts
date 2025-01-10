import { Request, Response } from "express";
import { z } from "zod";
import { LanguageISOZod, NounZod } from "../types";
import {
  createNounGroup,
  findNoun,
  findNounGroupWithNouns,
  findRandomNounGroups,
} from "../lib/noun-connector";

const getNoun = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
  });

  try {
    const { id } = SearchParams.parse(req.query);

    const noun = await findNoun(id);

    return res.status(200).json(noun);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const postNounGroup = async (req: Request, res: Response) => {
  const Body = z.object({
    nouns: z.array(NounZod).min(1),
    categoryId: z.string().optional(),
  });

  try {
    const { nouns, categoryId } = Body.parse(req.body);

    const createdNounGroup = await createNounGroup(nouns, categoryId);

    return res.status(201).json(createdNounGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getNounGroup = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    includingNouns: z.coerce.boolean().default(false),
  });

  try {
    const { id, includingNouns } = SearchParams.parse(req.query);

    const nounGroup = await findNounGroupWithNouns(id, includingNouns);

    return res.status(200).json(nounGroup);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getRandomNounGroups = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    amount: z.number().min(1).default(10),
    includingNouns: z.coerce.boolean().default(false),
    languages: z.array(LanguageISOZod).default(["us", "de"]),
  });

  try {
    const { amount, includingNouns, languages } = SearchParams.parse(req.query);

    const randomNounGroups = await findRandomNounGroups(
      amount,
      languages,
      includingNouns
    );

    return res.status(200).json(randomNounGroups);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export { postNounGroup, getNoun, getNounGroup, getRandomNounGroups };
