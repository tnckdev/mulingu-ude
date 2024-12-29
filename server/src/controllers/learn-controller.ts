import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

const getMultiNouns = async (req: Request, res: Response) => {
  const { amount, categories } = req.body;
  try {
    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Amount must be a number." });
    }
    if (amount < 1) {
      return res.status(400).json({ error: "Amount must be greater than 0." });
    }
    if (categories) {
      if (!Array.isArray(categories) || categories.length === 0) {
        return res
          .status(400)
          .json({ error: "Categories are required in a non empty array." });
      }
      const multiNouns = await prisma.multiNoun.findMany({
        take: amount,
        where: {
          categoryId: {
            in: categories,
          },
        },
        include: { nouns: true },
      });
      res.json(multiNouns);
    } else {
      const multiNouns = await prisma.multiNoun.findMany({
        take: amount,
        include: { nouns: true },
      });
      res.json(multiNouns);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getMultiNoun = async (req: Request, res: Response) => {
  const id = req.params.id;
  const multiNoun = await prisma.multiNoun.findUnique({ where: { id } });
  res.json(multiNoun);
};

const createMultiNoun = async (req: Request, res: Response) => {
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

    const multiNoun = await prisma.multiNoun.create({
      data: {
        categoryId: categoryId,
        nouns: {
          create: nouns.map((noun) => ({
            language: noun.language,
            singularArticle: noun.singularArticle,
            singular: noun.singular,
            pluralArticle: noun.pluralArticle,
            plural: noun.plural,
          })),
        },
      },
      include: { nouns: true },
    });

    res.status(201).json(multiNoun);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { getMultiNoun, createMultiNoun, getMultiNouns };
