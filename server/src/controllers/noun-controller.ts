import { Request, Response } from "express";
import { z } from "zod";
import { LanguageISOZ, NounAggregationZ } from "../types";
import {
  createNounAggregation,
  findNoun,
  findNounAggregation,
  findRandomNounAggregations,
} from "../lib/connectors/noun-connector";

const getNoun = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    language: LanguageISOZ,
  });

  try {
    const { id, language } = SearchParams.parse(req.query);

    const noun = await findNoun(id, language);

    return res.status(200).json(noun);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const postNounAggregation = async (req: Request, res: Response) => {
  try {
    const nounAggregation = NounAggregationZ.parse(req.body);

    const createdNounAggregation = await createNounAggregation(nounAggregation);

    return res.status(201).json(createdNounAggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getNounAggregation = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    languages: z.array(LanguageISOZ).default([]),
  });

  try {
    const { id, languages } = SearchParams.parse(req.query);

    const nounAggregation = await findNounAggregation(id, languages);

    return res.status(200).json(nounAggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getRandomNounAggregations = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    amount: z.coerce.number().min(1).default(10),
    languages: z.array(LanguageISOZ).default(["de", "us", "es", "fr", "no"]),
    withNouns: z.coerce.boolean().default(false),
  });

  try {
    const { amount, withNouns, languages } = SearchParams.parse(req.query);

    const randomNounAggregations = await findRandomNounAggregations(
      amount,
      languages,
      withNouns
    );

    return res.status(200).json(randomNounAggregations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getNoun,
  postNounAggregation,
  getNounAggregation,
  getRandomNounAggregations,
};
