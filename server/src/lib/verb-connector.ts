import { LanguageISO, Verb, VerbForm } from "@/types";
import { prisma } from "../index";
import { MongoClient } from "mongodb";
import { languageFilter } from "../utils/pipelines/language-filter";

const findVerb = async (id: string, forms: boolean) => {
  return await prisma.verb.findUnique({
    where: { id },
    include: { forms: forms },
  });
};

const findVerbGroupWithVerbs = async (id: string, verbs: boolean) => {
  return await prisma.verbGroup.findUnique({
    where: { id },
    include: { verbs: verbs },
  });
};

const findVerbGroupWithForms = async (id: string, forms: boolean) => {
  return await prisma.verbGroup.findUnique({
    where: { id },
    include: { verbs: { include: { forms: forms } } },
  });
};

const findVerbGroup = async (id: string, verbs: boolean, forms: boolean) => {
  if (verbs) {
    if (forms) {
      return await findVerbGroupWithForms(id, forms);
    } else {
      return await findVerbGroupWithVerbs(id, verbs);
    }
  } else {
    return await prisma.verbGroup.findUnique({
      where: { id },
    });
  }
};

const createVerbGroup = async (verbs: Verb[], categoryId?: string) => {
  return await prisma.verbGroup.create({
    data: {
      categoryId: categoryId ?? null,
      verbs: {
        create: verbs.map((verb) => ({
          language: verb.language,
          infinitive: verb.infinitive,
          forms: {
            create: verb.forms.map((form: VerbForm) => ({
              numerus: form.numerus,
              persona: form.persona,
              modus: form.modus,
              tempus: form.tempus,
              value: form.value,
            })),
          },
        })),
      },
    },
  });
};

const findRandomVerbGroups = async (
  size: number,
  languages: LanguageISO[],
  includingForms: boolean
) => {
  const mongoClient = new MongoClient(process.env.MONGO_URI!);

  await mongoClient.connect();
  const db = mongoClient.db("mulingu");
  const collection = db.collection("VerbGroup");

  const pipeline = [
    { $sample: { size } },
    {
      $lookup: {
        from: "Verb",
        localField: "_id",
        foreignField: "verbGroupId",
        as: "verbs",
      },
    },
    languageFilter("verbs", "verb", languages),
    {
      $addFields: {
        verbs: {
          $map: {
            input: "$verbs",
            as: "verb",
            in: {
              $mergeObjects: [
                "$$verb",
                {
                  forms: includingForms ? "$$verb.forms" : [],
                },
              ],
            },
          },
        },
      },
    },
  ];

  const randomVerbGroups = await collection.aggregate(pipeline).toArray();

  await mongoClient.close();

  return randomVerbGroups;
};

export { findVerb, createVerbGroup, findVerbGroup, findRandomVerbGroups };
