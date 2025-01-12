import { Request, Response } from "express";
import { z } from "zod";
import {
  createVerbGroup,
  findRandomVerbGroups,
  findVerb,
  findVerbGroup,
} from "../lib/verb-connector";
import { LanguageISOZod, VerbZod } from "../types";

const getVerb = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    forms: z.boolean().default(false),
  });

  try {
    const { id, forms } = SearchParams.parse(req.query);

    const verb = await findVerb(id, forms);

    res.status(200).json(verb);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const getVerbGroup = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    id: z.string(),
    verbs: z.boolean().default(false),
    forms: z.boolean().default(false),
  });

  try {
    const { id, verbs, forms } = SearchParams.parse(req.query);
    const verbGroup = await findVerbGroup(id, verbs, forms);
    return res.status(200).json(verbGroup);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const postVerbGroup = async (req: Request, res: Response) => {
  try {
    const Body = z.object({
      verbs: z.array(VerbZod).min(1),
      categoryId: z.string().optional(),
    });

    const { verbs, categoryId } = Body.parse(req.body);

    const createdVerbGroup = await createVerbGroup(verbs, categoryId);

    res.status(201).json(createdVerbGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getRandomVerbGroups = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    amount: z.number().default(10),
    languages: z.array(LanguageISOZod).default(["us", "de"]),
    includingForms: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .default("false"),
  });

  try {
    const { amount, includingForms, languages } = SearchParams.parse(req.query);

    const randomVerbGroups = await findRandomVerbGroups(
      amount,
      languages,
      includingForms
    );

    res.status(200).json(randomVerbGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { getVerb, getVerbGroup, postVerbGroup, getRandomVerbGroups };
