import { Request, Response } from "express";
import { LanguageISOZ, SentenceAggregationZ } from "../types";
import {
  createSentenceAggregation,
  findRandomSentenceAggregations,
  findSentence,
  findSentenceAggregation,
} from "../lib/connectors/sentence-connector";
import { z } from "zod";

const getSentence = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    language: LanguageISOZ,
  });

  try {
    const { id, language } = SearchParams.parse(req.query);

    const sentence = await findSentence(id, language);

    return res.status(200).json(sentence);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const postSentenceAggregation = async (req: Request, res: Response) => {
  try {
    const sentenceAggregation = SentenceAggregationZ.parse(req.body);

    const createdSentenceAggregation = await createSentenceAggregation(
      sentenceAggregation
    );

    return res.status(201).json(createdSentenceAggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getSentenceAggregation = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    languages: z.array(LanguageISOZ).default(["de", "us", "es", "fr", "no"]),
  });

  try {
    const { id, languages } = SearchParams.parse(req.query);

    const sentenceAggregation = await findSentenceAggregation(id, languages);

    return res.status(200).json(sentenceAggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getRandomSentenceAggregations = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    amount: z.coerce.number().min(1).default(10),
    languages: z.array(LanguageISOZ).default(["de", "us", "es", "fr", "no"]),
    withSentences: z.coerce.boolean().default(false),
  });

  try {
    const { amount, withSentences, languages } = SearchParams.parse(req.query);

    const randomSentenceAggregations = await findRandomSentenceAggregations(
      amount,
      languages,
      withSentences
    );

    return res.status(200).json(randomSentenceAggregations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getSentence,
  postSentenceAggregation,
  getSentenceAggregation,
  getRandomSentenceAggregations,
};
