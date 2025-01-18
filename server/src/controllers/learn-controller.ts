import { Request, Response } from "express";
import { z } from "zod";
import { findRandomNounAggregations } from "../lib/connectors/noun-connector";
import {
  LanguageISO,
  LanguageISOZ,
  PartialNounAggregationZ,
  PartialSentenceAggregationZ,
  PartialVerbAggregationZ,
  Task,
} from "../types";
import { findRandomVerbAggregations } from "../lib/connectors/verb-connector";
import { findRandomSentenceAggregations } from "../lib/connectors/sentence-connector";
import { getVerbAggregationTask } from "../lib/transformers/verb-transformer";
import { getNounAggregationTask } from "../lib/transformers/noun-transformer";
import { getSentenceAggregationTask } from "../lib/transformers/sentence-transformer";
import { getUserSession } from "../lib";
import { prisma } from "../index";
import { updateRating } from "../lib/connectors/learn-connector";
import { transformTask } from "../lib/transformers/task-transformer";

const getRandomTasks = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    nouns: z.coerce.number().default(1),
    verbs: z.coerce.number().default(1),
    sentences: z.coerce.number().default(1),
    languages: z
      .preprocess((val) => {
        if (typeof val === "string") {
          return val.split(",").map((lang) => lang.trim()) as LanguageISO[];
        }
      }, z.array(LanguageISOZ))
      .default(["us", "de"]),
  });

  try {
    const { nouns, verbs, sentences, languages } = SearchParams.parse(
      req.query
    );

    const randomNounAggregations = await findRandomNounAggregations(
      nouns,
      languages,
      true
    );

    const randomVerbAggregations = await findRandomVerbAggregations(
      verbs,
      languages,
      true,
      true
    );

    const randomSentenceAggregations = await findRandomSentenceAggregations(
      sentences,
      languages,
      true
    );

    const verbAggregationTasks: Task[] = randomVerbAggregations.map(
      (verbAggregation) => {
        const parsed = PartialVerbAggregationZ.parse(verbAggregation);
        return getVerbAggregationTask(parsed);
      }
    );

    const nounAggregationTasks = randomNounAggregations.map(
      (nounAggregation) => {
        const parsed = PartialNounAggregationZ.parse(nounAggregation);
        return getNounAggregationTask(parsed);
      }
    );

    const sentenceAggregationTasks = randomSentenceAggregations.map(
      (sentenceAggregation) => {
        const parsed = PartialSentenceAggregationZ.parse(sentenceAggregation);
        return getSentenceAggregationTask(parsed);
      }
    );

    const tasks = [
      ...verbAggregationTasks,
      ...nounAggregationTasks,
      ...sentenceAggregationTasks,
    ];

    return res.status(200).json({
      tasks,
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

export { getRandomTasks, gradeAnswers };
