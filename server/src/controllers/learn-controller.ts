import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { getUserSession } from "../lib";
import { LanguageISO, LanguageISOZod } from "../types";
import { findRandomNounGroups } from "../lib/noun-connector";
import { findRandomVerbGroups } from "../lib/verb-connector";
import { findRandomSentenceGroups } from "../lib/sentence-connector";

const getRandomTasks = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    nouns: z.coerce.number().default(1),
    verbs: z.coerce.number().default(1),
    sentences: z.coerce.number().default(1),
    languages: z.array(LanguageISOZod).default(["us", "de"]),
  });

  try {
    // const { nouns, verbs, sentences, languages } = SearchParams.parse(
    //   req.query
    // );

    const nouns = 4;
    const verbs = 3;
    const sentences = 3;
    const languages: LanguageISO[] = ["us", "de", "fr", "es"];

    console.log(nouns, verbs, sentences, languages);

    const randomNounGroups = await findRandomNounGroups(nouns, languages, true);
    const randomVerbGroups = await findRandomVerbGroups(verbs, languages, true);
    const randomSentenceGroups = await findRandomSentenceGroups(
      sentences,
      languages,
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

const gradeAnswers = async (req: Request, res: Response) => {
  const Body = z.object({
    email: z.string(),
    answers: z.array(
      z.object({
        language: z.string(),
        answer: z.string(),
        solution: z.string(),
      })
    ),
  });

  try {
    const { email, answers } = Body.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const session = await getUserSession(req, res);
    if (session.user.email !== email) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const gradeMap = answers.reduce(
      (acc: { [key: string]: number }, answer) => {
        const correct = answer.answer === answer.solution;
        acc[answer.language] = (acc[answer.language] || 0) + (correct ? 1 : 0);
        acc["total"] = (acc["total"] || 0) + (correct ? 1 : 0);
        return acc;
      },
      {}
    );

    const keys = Object.keys(gradeMap);
    keys.forEach(async (key) => {
      await updateRating(user.id, key, gradeMap[key]);
    });
    return res.status(200).json(gradeMap);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const updateRating = async (
  userId: string,
  language: string,
  rating: number
) => {
  const existingRating = await prisma.ratings.findUnique({
    where: {
      userId_language: {
        userId: userId,
        language: language,
      },
    },
  });

  const currentRating = existingRating ? existingRating.rating : 0;

  const ratings = await prisma.ratings.upsert({
    where: {
      userId_language: {
        userId: userId,
        language: language,
      },
    },
    update: { rating: currentRating + rating },
    create: {
      userId: userId,
      language: language,
      rating: rating,
    },
  });
};

export { getRandomTasks, gradeAnswers };
