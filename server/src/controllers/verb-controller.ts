import { Request, Response } from "express";
import { prisma } from "../index";
import { z } from "zod";
import { MongoClient } from "mongodb";
import {
  createVerbGroup,
  findRandomVerbGroups,
  findVerb,
  findVerbGroup,
} from "../lib/verb-connector";
import { LanguageISOZod, VerbZod } from "../types";

// /**
//  * Fetches a verb with its forms if forms is true.
//  *
//  * @param id
//  * @param forms
//  * @returns
//  */
// const fetchVerb = async (id: string, forms: boolean) => {
//   return await prisma.verb.findUnique({
//     where: { id },
//     include: { forms: forms },
//   });
// };

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

// /**
//  * Fetches a verb group with verbs if verbs is true.
//  *
//  * @param id
//  * @param verbs
//  * @returns
//  */
// const fetchVerbGroupWithVerbs = async (id: string, verbs: boolean) => {
//   return await prisma.verbGroup.findUnique({
//     where: { id },
//     include: { verbs: verbs },
//   });
// };

// /**
//  * Fetches a verb group with verbs and their forms if forms is true.
//  *
//  * @param id
//  * @param forms
//  * @returns
//  */
// const fetchVerbGroupWithForms = async (id: string, forms: boolean) => {
//   return await prisma.verbGroup.findUnique({
//     where: { id },
//     include: { verbs: { include: { forms: forms } } },
//   });
// };

// /**
//  * Fetches a verb group with verbs. If verbs is true, the verb group is
//  * fetched with its verbs. If forms is also true, the verbs are fetched with
//  * their forms.
//  *
//  * @param id
//  * @param verbs
//  * @param forms
//  * @returns
//  */
// const fetchVerbGroup = async (id: string, verbs: boolean, forms: boolean) => {
//   if (verbs) {
//     if (forms) {
//       return await fetchVerbGroupWithForms(id, forms);
//     } else {
//       return await fetchVerbGroupWithVerbs(id, verbs);
//     }
//   } else {
//     return await prisma.verbGroup.findUnique({
//       where: { id },
//     });
//   }
// };

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

// /**
//  * Fetches a random amount of verb groups with verbs and their forms if forms is true.
//  *
//  * @param amount
//  * @param forms
//  * @returns
//  */
// const fetchRandomVerbGroups = async (amount: number, forms: boolean) => {
//   // Using raw mongoDB queries here because Prisma does not support $sample
//   const mongoClient = new MongoClient(process.env.MONGO_URI!);

//   await mongoClient.connect();
//   const db = mongoClient.db("mulingu");
//   const collection = db.collection("VerbGroup");

//   // Querying for forms of verbs in group might be to expensive
//   // Fetch separately if needed
//   const pipeline = [
//     { $sample: { size: amount } },
//     {
//       $lookup: {
//         from: "Verb",
//         localField: "_id",
//         foreignField: "verbGroupId",
//         as: "verbs",
//       },
//     },
//     {
//       $addFields: {
//         verbs: {
//           $map: {
//             input: "$verbs",
//             as: "verb",
//             in: {
//               $mergeObjects: [
//                 "$$verb",
//                 {
//                   forms: forms ? "$$verb.forms" : [],
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//   ];

//   const randomVerbGroups = await collection.aggregate(pipeline).toArray();

//   await mongoClient.close();

//   return randomVerbGroups;
// };

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
