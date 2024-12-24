import { NextFunction, Request, Response } from "express";
import { prisma } from "..";

const getMultiNoun = async (req: Request, res: Response) => {
  const id = req.params.id;
  const multiNoun = await prisma.multiNoun.findUnique({ where: { id } });
  res.json(multiNoun);
};

const createMultiNoun = async (req: Request, res: Response) => {
  try {
    console.log(req);
    
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

export { getMultiNoun, createMultiNoun };
