import { LanguageISO, Noun } from "../types";
import { prisma } from "../index";
import { MongoClient } from "mongodb";
import { languageFilter } from "../utils/pipelines/language-filter";

const findNoun = async (id: string) => {
  return await prisma.noun.findUnique({
    where: { id },
  });
};

const findNounGroupWithNouns = async (id: string, includeNouns: boolean) => {
  return await prisma.nounGroup.findUnique({
    where: { id },
    include: { nouns: includeNouns },
  });
};

const findRandomNounGroups = async (
  size: number,
  languages: LanguageISO[],
  includingNouns: boolean
) => {
  const mongoClient = new MongoClient(process.env.MONGO_URI!);
  await mongoClient.connect();

  const db = mongoClient.db("mulingu");
  const collection = db.collection("NounGroup");

  const pipeline = [
    { $sample: { size } },
    {
      $lookup: {
        from: "Noun",
        localField: "_id",
        foreignField: "nounGroupId",
        as: "nouns",
      },
    },
    languageFilter("nouns", "noun", languages),
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

const createNounGroup = async (nouns: Noun[], categoryId?: string) => {
  if (nouns.length === 0) {
    return null;
  }

  const createdNounGroup = await prisma.nounGroup.create({
    data: {
      categoryId: categoryId ?? null,
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
  return createdNounGroup;
};

export {
  findNoun,
  findNounGroupWithNouns,
  findRandomNounGroups,
  createNounGroup,
};
