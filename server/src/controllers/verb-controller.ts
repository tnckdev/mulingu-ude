import { Request, Response } from "express";
import { prisma } from "../index";
import { VerbForm } from "@prisma/client";
import { z } from "zod";
import { mongoClient } from "../index";

/**
 * Fetches a verb with its forms if forms is true.
 *
 * @param id
 * @param forms
 * @returns
 */
const fetchVerb = async (id: string, forms: boolean) => {
  return await prisma.verb.findUnique({
    where: { id },
    include: { forms: forms },
  });
};

const getVerb = async (req: Request, res: Response) => {
  const Body = z.object({
    id: z.string(),
    forms: z.boolean().default(false),
  });

  try {
    const { id, forms } = Body.parse(req.body);

    const verb = await fetchVerb(id, forms);

    res.status(200).json(verb);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Fetches a verb group with verbs if verbs is true.
 *
 * @param id
 * @param verbs
 * @returns
 */
const fetchVerbGroupWithVerbs = async (id: string, verbs: boolean) => {
  return await prisma.verbGroup.findUnique({
    where: { id },
    include: { verbs: verbs },
  });
};

/**
 * Fetches a verb group with verbs and their forms if forms is true.
 *
 * @param id
 * @param forms
 * @returns
 */
const fetchVerbGroupWithForms = async (id: string, forms: boolean) => {
  return await prisma.verbGroup.findUnique({
    where: { id },
    include: { verbs: { include: { forms: forms } } },
  });
};

/**
 * Fetches a verb group with verbs. If verbs is true, the verb group is
 * fetched with its verbs. If forms is also true, the verbs are fetched with
 * their forms.
 *
 * @param id
 * @param verbs
 * @param forms
 * @returns
 */
const fetchVerbGroup = async (id: string, verbs: boolean, forms: boolean) => {
  if (verbs) {
    if (forms) {
      return await fetchVerbGroupWithForms(id, forms);
    } else {
      return await fetchVerbGroupWithVerbs(id, verbs);
    }
  } else {
    return await prisma.verbGroup.findUnique({
      where: { id },
    });
  }
};

const getVerbGroup = async (req: Request, res: Response) => {
  const Body = z.object({
    id: z.string(),
    verbs: z.boolean().default(false),
    forms: z.boolean().default(false),
  });

  try {
    const { id, verbs, forms } = Body.parse(req.body);
    const verbGroup = await fetchVerbGroup(id, verbs, forms);
    return res.status(200).json(verbGroup);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const createVerbGroup = async (req: Request, res: Response) => {
  try {
    const { verbs, categoryId } = req.body;
    if (!verbs || !Array.isArray(verbs) || verbs.length === 0) {
      return res
        .status(400)
        .json({ error: "Verbs are required in a non empty array." });
    }

    const createdVerbGroup = await prisma.verbGroup.create({
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

    res.status(201).json(createdVerbGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * Fetches a random amount of verb groups with verbs and their forms if forms is true.
 *
 * @param amount
 * @param forms
 * @returns
 */
const fetchRandomVerbGroups = async (amount: number, forms: boolean) => {
  // Using raw mongoDB queries here because Prisma does not support $sample

  await mongoClient.connect();
  const db = mongoClient.db("mulingu");
  const collection = db.collection("VerbGroup");

  // Querying for forms of verbs in group might be to expensive
  // Fetch separately if needed
  const pipeline = [
    { $sample: { size: amount } },
    {
      $lookup: {
        from: "Verb",
        localField: "_id",
        foreignField: "verbGroupId",
        as: "verbs",
      },
    },
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
                  forms: forms ? "$$verb.forms" : [],
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

const getRandomVerbGroups = async (req: Request, res: Response) => {
  const Body = z.object({
    amount: z.number().default(10),
    forms: z.boolean().default(false),
  });

  try {
    const { amount, forms } = Body.parse(req.body);
    if (amount < 1) {
      return res.status(400).json({ error: "Amount must be greater than 0." });
    }

    const randomVerbGroups = await fetchRandomVerbGroups(amount, forms);

    res.status(200).json(randomVerbGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getVerb,
  createVerbGroup,
  getVerbGroup,
  getRandomVerbGroups,
  fetchRandomVerbGroups,
};
