import { Request, Response } from "express";
import { mongoClient, prisma } from "../index";
import { z } from "zod";

/**
 * Fetches a noun by its ID.
 *
 * @param id
 * @returns
 */
const fetchNoun = async (id: string) => {
  return await prisma.noun.findUnique({
    where: { id },
  });
};

const getNoun = async (req: Request, res: Response) => {
  const Query = z.object({
    id: z.string(),
  });

  try {
    const { id } = Query.parse(req.query);
    const noun = await fetchNoun(id);
    return res.status(200).json(noun);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const createNounGroup = async (req: Request, res: Response) => {
  try {
    const { nouns, categoryId } = req.body;

    if (!nouns || !Array.isArray(nouns) || nouns.length === 0) {
      return res
        .status(400)
        .json({ error: "Nouns are requires in a non empty array." });
    }

    if (categoryId && typeof categoryId !== "string") {
      return res.status(400).json({ error: "Category ID must be a string." });
    }

    const createdNounGroup = await prisma.nounGroup.create({
      data: {
        nouns: {
          create: nouns.map((noun) => ({
            language: noun.language,
            definiteSingularArticle: noun.definiteSingularArticle,
            indefiniteSingularArticle: noun.indefiniteSingularArticle,
            definitePluralArticle: noun.definitePluralArticle,
            singular: noun.singular,
            plural: noun.plural,
          })),
        },
      },
    });

    return res.status(201).json(createdNounGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * Fetches a noun group by its ID. If includeNouns is true, the
 * nouns of the noun group are included.
 *
 * @param id
 * @param includeNouns
 * @returns
 */
const fetchNounGroupWithNouns = async (id: string, includeNouns: boolean) => {
  return await prisma.nounGroup.findUnique({
    where: { id },
    include: { nouns: includeNouns },
  });
};

const getNounGroup = async (req: Request, res: Response) => {
  const Query = z.object({
    id: z.string(),
    includeNouns: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .default("false"),
  });

  try {
    const { id, includeNouns } = Query.parse(req.query);
    const nounGroup = await fetchNounGroupWithNouns(id, includeNouns);
    return res.status(200).json(nounGroup);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Fetches a specific amount of random noun groups. If includingNouns is true, the
 * nouns of the noun groups are included.
 *
 * @param amount
 * @param includingNouns
 * @returns
 */
const fetchRandomNounGroups = async (
  amount: number,
  includingNouns: boolean
) => {
  // Using raw mongoDB queries here because Prisma does not support $sample
  await mongoClient.connect();
  const db = mongoClient.db("mulingu");
  const collection = db.collection("NounGroup");

  const pipeline = [
    { $sample: { size: amount } },
    {
      $lookup: {
        from: "Noun",
        localField: "_id",
        foreignField: "nounGroupId",
        as: "nouns",
      },
    },
    {
      $addFields: {
        nouns: {
          $map: {
            input: "$nouns",
            as: "noun",
            in: {
              $mergeObjects: [
                "$$noun",
                {
                  forms: includingNouns ? "$$noun.forms" : [],
                },
              ],
            },
          },
        },
      },
    },
  ];

  const randomNounGroups = await collection.aggregate(pipeline).toArray();

  await mongoClient.close();

  return randomNounGroups;
};

const getRandomNounGroups = async (req: Request, res: Response) => {
  const Query = z.object({
    amount: z.number().default(10),
    includingNouns: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .default("false"),
  });

  try {
    const { amount, includingNouns } = Query.parse(req.query);
    if (amount < 1) {
      return res.status(400).json({ error: "Amount must be greater than 0." });
    }

    const randomNounGroups = await fetchRandomNounGroups(
      amount,
      includingNouns
    );
    return res.status(200).json(randomNounGroups);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export {
  createNounGroup,
  getNoun,
  getNounGroup,
  getRandomNounGroups,
  fetchRandomNounGroups,
};
