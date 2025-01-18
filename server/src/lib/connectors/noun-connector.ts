import { MongoClient } from "mongodb";
import { prisma } from "../../index";
import { LanguageISO, NounAggregation } from "../../types";

const findGermanNoun = async (id: string) => {
  return await prisma.germanNoun.findUnique({
    where: {
      id,
    },
  });
};

const findEnglishNoun = async (id: string) => {
  return await prisma.englishNoun.findUnique({
    where: {
      id,
    },
  });
};

const findSpanishNoun = async (id: string) => {
  return await prisma.spanishNoun.findUnique({
    where: {
      id,
    },
  });
};

const findFrenchNoun = async (id: string) => {
  return await prisma.frenchNoun.findUnique({
    where: {
      id,
    },
  });
};

const findNorwegianNoun = async (id: string) => {
  return await prisma.norwegianNoun.findUnique({
    where: {
      id,
    },
  });
};

const findNoun = async (id: string, language: LanguageISO) => {
  switch (language) {
    case "de":
      return await findGermanNoun(id);
    case "us":
      return await findEnglishNoun(id);
    case "es":
      return await findSpanishNoun(id);
    case "fr":
      return await findFrenchNoun(id);
    case "no":
      return await findNorwegianNoun(id);
  }
};

const createNounAggregation = async (nounAggregation: NounAggregation) => {
  return await prisma.nounAggregation.create({
    data: {
      de: {
        create: nounAggregation.de,
      },
      us: {
        create: nounAggregation.us,
      },
      es: {
        create: nounAggregation.es,
      },
      fr: {
        create: nounAggregation.fr,
      },
      no: {
        create: nounAggregation.no
      }
    },
  });
};

const includedLanguages = (languages: LanguageISO[]) => {
  return languages.reduce((acc, language) => {
    acc[language] = true;
    return acc;
  }, {} as Record<string, boolean>);
};

const findNounAggregation = async (id: string, languages: LanguageISO[]) => {
  return await prisma.nounAggregation.findUnique({
    where: {
      id,
    },
    include: includedLanguages(languages),
  });
};

const findRandomNounAggregations = async (
  size: number,
  languages: LanguageISO[],
  withNouns: boolean
) => {
  const mongoClient = new MongoClient(process.env.MONGO_URI!);
  await mongoClient.connect();

  const db = mongoClient.db("mulingu");
  const collection = db.collection("NounAggregation");

  const pipeline: any[] = [{ $sample: { size } }];

  // Hell of bad code, refactor this
  if (withNouns) {
    if (languages.includes("de")) {
      pipeline.push({
        $lookup: {
          from: "GermanNoun",
          localField: "germanNounId",
          foreignField: "_id",
          as: "de",
        },
      });
      pipeline.push({
        $unwind: "$de",
      });
    }

    if (languages.includes("us")) {
      pipeline.push({
        $lookup: {
          from: "EnglishNoun",
          localField: "englishNounId",
          foreignField: "_id",
          as: "us",
        },
      });
      pipeline.push({
        $unwind: "$us",
      });
    }

    if (languages.includes("es")) {
      pipeline.push({
        $lookup: {
          from: "SpanishNoun",
          localField: "spanishNounId",
          foreignField: "_id",
          as: "es",
        },
      });
      pipeline.push({
        $unwind: "$es",
      });
    }

    if (languages.includes("fr")) {
      pipeline.push({
        $lookup: {
          from: "FrenchNoun",
          localField: "frenchNounId",
          foreignField: "_id",
          as: "fr",
        },
      });
      pipeline.push({
        $unwind: "$fr",
      });
    }

    if (languages.includes("no")) {
      pipeline.push({
        $lookup: {
          from: "NorwegianNoun",
          localField: "norwegianNounId",
          foreignField: "_id",
          as: "no",
        },
      });
      pipeline.push({
        $unwind: "$no",
      });
    }
  }

  const randomNounAggregations = await collection.aggregate(pipeline).toArray();

  await mongoClient.close();

  return randomNounAggregations;
};

export {
  findNoun,
  createNounAggregation,
  findNounAggregation,
  findRandomNounAggregations,
};
