import { prisma } from "../index";
import { LanguageISO, Sentence } from "../types";
import { languageFilter } from "../utils/pipelines/language-filter";
import { MongoClient } from "mongodb";

const findSentence = async (id: string) => {
  return await prisma.sentence.findUnique({
    where: { id },
  });
};

const findSentenceGroup = async (id: string, includingSentences: boolean) => {
  return await prisma.sentenceGroup.findUnique({
    where: { id },
    include: { sentences: includingSentences },
  });
};

const createSentenceGroup = async (
  sentences: Sentence[],
  categoryId?: string
) => {
  return await prisma.sentenceGroup.create({
    data: {
      categoryId: categoryId ?? null,
      sentences: {
        create: sentences.map((sentence) => ({
          language: sentence.language,
          sentence: sentence.sentence,
        })),
      },
    },
  });
};

const findRandomSentenceGroups = async (
  size: number,
  languages: LanguageISO[],
  includingSentences: boolean
) => {
  const mongoClient = new MongoClient(process.env.MONGO_URI!);
  await mongoClient.connect();

  const db = mongoClient.db("mulingu");
  const collection = db.collection("SentenceGroup");

  const pipeline = [
    { $sample: { size } },
    {
      $lookup: {
        from: "Sentence",
        localField: "_id",
        foreignField: "sentenceGroupId",
        as: "sentences",
      },
    },
    languageFilter("sentences", "sentence", languages),
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
                  sentences: includingSentences ? "$$sentence.sentences" : [],
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

export {
  findSentence,
  findSentenceGroup,
  createSentenceGroup,
  findRandomSentenceGroups,
};
