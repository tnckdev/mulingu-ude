import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { fetchRandomNounGroups } from "./noun-controller";
import { fetchRandomVerbGroups } from "./verb-controller";
import { fetchRandomSentenceGroups } from "./sentence-controller";


const getRandomTasks = async (req: Request, res: Response) => {
  const Query = z.object({
    nouns: z.coerce.number().default(0),
    verbs: z.coerce.number().default(0),
    sentences: z.coerce.number().default(0),
  });

  try {
    const { nouns, verbs, sentences } = Query.parse(req.query);

    const randomNounGroups = await fetchRandomNounGroups(nouns, true);
    const randomVerbGroups = await fetchRandomVerbGroups(verbs, true);
    const randomSentenceGroups = await fetchRandomSentenceGroups(
      sentences,
      true
    );

    return res.status(200).json({
      nounGroups: randomNounGroups,
      verbGroups: randomVerbGroups,
      sentenceGroups: randomSentenceGroups,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export { getRandomTasks };
