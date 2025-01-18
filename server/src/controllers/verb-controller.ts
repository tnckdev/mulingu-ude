import { Request, Response } from "express";
import { z } from "zod";
import { LanguageISOZ, VerbAggregationZ } from "../types";
import {
  createVerbAggregation,
  findRandomVerbAggregations,
  findVerb,
  findVerbAggregation,
} from "../lib/connectors/verb-connector";

const getVerb = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    language: LanguageISOZ,
    withForms: z.coerce.boolean().default(false),
  });

  try {
    const { id, language, withForms } = SearchParams.parse(req.query);

    const verb = await findVerb(id, language, withForms);

    return res.status(200).json(verb);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const postVerbAggregation = async (req: Request, res: Response) => {
  try {
    const verbAggregation = VerbAggregationZ.parse(req.body);

    const createdVerbAggregation = await createVerbAggregation(verbAggregation);

    return res.status(201).json(createdVerbAggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getVerbAggregation = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    languages: z.array(LanguageISOZ).default(["de", "us", "es", "fr", "no"]),
    withForms: z.coerce.boolean().default(false),
  });

  try {
    const { id, languages, withForms } = SearchParams.parse(req.query);

    const verbAggregation = await findVerbAggregation(id, languages, withForms);

    return res.status(200).json(verbAggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getRandomVerbAggregations = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    count: z.coerce.number().default(1),
    languages: z.array(LanguageISOZ).default(["de", "us", "es", "fr", "no"]),
    withVerbs: z.coerce.boolean().default(true),
    withForms: z.coerce.boolean().default(true),
  });

  try {
    const { count, languages, withVerbs, withForms } = SearchParams.parse(
      req.query
    );

    const verbAggregations = await findRandomVerbAggregations(
      count,
      languages,
      withVerbs,
      withForms
    );

    return res.status(200).json(verbAggregations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getVerb,
  postVerbAggregation,
  getVerbAggregation,
  getRandomVerbAggregations,
};
