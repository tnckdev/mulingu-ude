import { Request, Response } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { mongoClient } from "../index";

const createSentenceGroup = async (req: Request, res: Response) => {
  try {
    const { sentences } = req.body;
    if (!sentences || !Array.isArray(sentences) || sentences.length < 2) {
      return res
        .status(400)
        .json({ error: "Please provide at least two sentences." });
    }

    const createdSentenceGroup = await prisma.sentenceGroup.create({
      data: {
        sentences: {
          create: sentences.map((sentence) => ({
            language: sentence.language,
            sentence: sentence.sentence,
          })),
        },
      },
    });
    return res.status(201).json(createdSentenceGroup);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Fetches a sentence by its ID.
 *
 * @param id
 * @returns
 */
const fetchSentence = async (id: string) => {
  return await prisma.sentence.findUnique({ where: { id } });
};

/**
 * Fetches a sentence group by its ID. If sentences is true,
 * the sentences of the sentence group are fetched as well.
 *
 * @param id
 * @param sentences
 * @returns
 */
const fetchSentenceGroup = async (id: string, sentences: boolean) => {
  return await prisma.sentenceGroup.findUnique({
    where: { id },
    include: { sentences: sentences },
  });
};

const getSentence = async (req: Request, res: Response) => {
  const Query = z.object({
    id: z.string(),
  });

  try {
    const { id } = Query.parse(req.query);
    const sentence = await fetchSentence(id);
    return res.status(200).json(sentence);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getSentenceGroup = async (req: Request, res: Response) => {
  const Query = z.object({
    id: z.string(),
    sentences: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .default("false"),
  });

  try {
    const { id, sentences } = Query.parse(req.query);
    const sentenceGroup = await fetchSentenceGroup(id, sentences);
    return res.status(200).json(sentenceGroup);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Fetches a specific amount of random sentence groups. If sentences is true, the
 * sentences of the sentence groups are included.
 *
 * @param amount
 * @param sentences
 * @returns
 */
const fetchRandomSentenceGroups = async (
  amount: number,
  sentences: boolean
) => {
  await mongoClient.connect();
  const db = mongoClient.db("mulingu");
  const collection = db.collection("SentenceGroup");

  const pipeline = [
    { $sample: { size: amount } },
    {
      $lookup: {
        from: "Sentence",
        localField: "_id",
        foreignField: "sentenceGroupId",
        as: "sentences",
      },
    },
    {
      $addFields: {
        sentences: {
          $map: {
            input: "$sentences",
            as: "sentence",
            in: {
              $mergeObjects: [
                "$$sentence",
                {
                  sentences: sentences ? "$$sentence.sentences" : [],
                },
              ],
            },
          },
        },
      },
    },
  ];

  const randomSentenceGroups = await collection.aggregate(pipeline).toArray();

  await mongoClient.close();

  return randomSentenceGroups;
};

const getRandomSentenceGroups = async (req: Request, res: Response) => {
  const Query = z.object({
    amount: z.coerce.number().default(10),
    sentences: z.coerce.boolean().default(false),
  });

  try {
    const { amount, sentences } = Query.parse(req.query);
    if (amount < 1) {
      return res.status(400).json({ error: "Amount must be greater than 0." });
    }

    const randomSentenceGroups = await fetchRandomSentenceGroups(
      amount,
      sentences
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
  getRandomSentenceGroups,
  fetchRandomSentenceGroups,
};
