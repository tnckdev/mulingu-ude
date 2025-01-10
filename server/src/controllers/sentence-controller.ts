import { Request, Response } from "express";

import { z } from "zod";

import { LanguageISOZod, SentenceZod } from "../types";
import {
  createSentenceGroup,
  findRandomSentenceGroups,
  findSentence,
  findSentenceGroup,
} from "../lib/sentence-connector";

const postSentenceGroup = async (req: Request, res: Response) => {
  try {
    const Body = z.object({
      categoryId: z.string().optional(),
      sentences: z.array(SentenceZod).min(1),
    });

    const { sentences, categoryId } = Body.parse(req.body);

    const createdSentenceGroup = createSentenceGroup(sentences, categoryId);

    return res.status(201).json(createdSentenceGroup);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getSentence = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
  });

  try {
    const { id } = SearchParams.parse(req.query);

    const sentence = await findSentence(id);

    return res.status(200).json(sentence);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getSentenceGroup = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    includingSentences: z.coerce.boolean().default(false),
  });

  try {
    const { id, includingSentences } = SearchParams.parse(req.query);

    const sentenceGroup = await findSentenceGroup(id, includingSentences);

    return res.status(200).json(sentenceGroup);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getRandomSentenceGroups = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    amount: z.number().min(1).default(10),
    languages: z.array(LanguageISOZod).default(["us", "de"]),
    includingSentences: z.coerce.boolean().default(false),
  });

  try {
    const { amount, languages, includingSentences } = SearchParams.parse(
      req.query
    );

    const randomSentenceGroups = await findRandomSentenceGroups(
      amount,
      languages,
      includingSentences
    );

    return res.status(200).json(randomSentenceGroups);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export {
  createSentenceGroup,
  getSentence,
  getSentenceGroup,
  postSentenceGroup,
  getRandomSentenceGroups,
};
