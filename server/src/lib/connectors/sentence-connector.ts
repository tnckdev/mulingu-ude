import { MongoClient } from "mongodb";
import { prisma } from "../../index";
import { LanguageISO, SentenceAggregation } from "../../types";

const findGermanSentence = async (id: string) => {
  return await prisma.germanSentence.findUnique({
    where: {
      id,
    },
  });
};

const findEnglishSentence = async (id: string) => {
  return await prisma.englishSentence.findUnique({
    where: {
      id,
    },
  });
};

const findSpanishSentence = async (id: string) => {
  return await prisma.spanishSentence.findUnique({
    where: {
      id,
    },
  });
};

const findFrenchSentence = async (id: string) => {
  return await prisma.frenchSentence.findUnique({
    where: {
      id,
    },
  });
};

const findNorwegianSentence = async (id: string) => {
  return await prisma.norwegianSentence.findUnique({
    where: {
      id,
    },
  });
};

const findSentence = async (id: string, language: LanguageISO) => {
  switch (language) {
    case "de":
      return await findGermanSentence(id);
    case "us":
      return await findEnglishSentence(id);
    case "es":
      return await findSpanishSentence(id);
    case "fr":
      return await findFrenchSentence(id);
    case "no":
      return await findNorwegianSentence(id);
  }
};

const createSentenceAggregation = async (
  sentenceAggregation: SentenceAggregation
) => {
  return await prisma.sentenceAggregation.create({
    data: {
      de: {
        create: sentenceAggregation.de,
      },
      us: {
        create: sentenceAggregation.us,
      },
      es: {
        create: sentenceAggregation.es,
      },
      fr: {
        create: sentenceAggregation.fr,
      },
      no: {
        create: sentenceAggregation.no,
      },
    },
  });
};

const includedLanguages = (languages: LanguageISO[]) => {
  return languages.reduce((acc, language) => {
    acc[language] = true;
    return acc;
  }, {} as Record<LanguageISO, boolean>);
};

const findSentenceAggregation = async (
  id: string,
  languages: LanguageISO[]
) => {
  return await prisma.sentenceAggregation.findUnique({
    where: {
      id,
    },
    include: includedLanguages(languages),
  });
};

const findRandomSentenceAggregations = async (
  size: number,
  languages: LanguageISO[],
  withSentences: boolean
) => {
  const mongoClient = await MongoClient.connect(process.env.MONGO_URI!);
  const db = mongoClient.db("mulingu");
  const collection = db.collection("SentenceAggregation");

  const pipeline: any[] = [{ $sample: { size } }];

  // Hell of bad code, refactor this
  if (withSentences) {
    if (languages.includes("de")) {
      pipeline.push({
        $lookup: {
          from: "GermanSentence",
          localField: "germanSentenceId",
          foreignField: "_id",
          as: "de",
        },
      });
      pipeline.push({ $unwind: "$de" });
    }

    if (languages.includes("us")) {
      pipeline.push({
        $lookup: {
          from: "EnglishSentence",
          localField: "englishSentenceId",
          foreignField: "_id",
          as: "us",
        },
      });
      pipeline.push({ $unwind: "$us" });
    }

    if (languages.includes("es")) {
      pipeline.push({
        $lookup: {
          from: "SpanishSentence",
          localField: "spanishSentenceId",
          foreignField: "_id",
          as: "es",
        },
      });
      pipeline.push({ $unwind: "$es" });
    }

    if (languages.includes("fr")) {
      pipeline.push({
        $lookup: {
          from: "FrenchSentence",
          localField: "frenchSentenceId",
          foreignField: "_id",
          as: "fr",
        },
      });
      pipeline.push({ $unwind: "$fr" });
    }

    if (languages.includes("no")) {
      pipeline.push({
        $lookup: {
          from: "NorwegianSentence",
          localField: "norwegianSentenceId",
          foreignField: "_id",
          as: "no",
        },
      });
      pipeline.push({ $unwind: "$no" });
    }
  }

  const randomSentenceAggregations = await collection
    .aggregate(pipeline)
    .toArray();

  mongoClient.close();

  return randomSentenceAggregations;
};

export {
  findSentence,
  createSentenceAggregation,
  findSentenceAggregation,
  findRandomSentenceAggregations,
};
