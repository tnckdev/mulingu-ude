import { MongoClient } from "mongodb";
import { prisma } from "../../index";
import { LanguageISO, VerbAggregation } from "../../types";

const findGermanVerb = async (id: string, withForms: boolean) => {
  return await prisma.germanVerb.findUnique({
    where: {
      id,
    },
    include: {
      forms: withForms,
    },
  });
};

const findEnglishVerb = async (id: string, withForms: boolean) => {
  return await prisma.englishVerb.findUnique({
    where: {
      id,
    },
    include: {
      forms: withForms,
    },
  });
};

const findSpanishVerb = async (id: string, withForms: boolean) => {
  return await prisma.spanishVerb.findUnique({
    where: {
      id,
    },
    include: {
      forms: withForms,
    },
  });
};

const findFrenchVerb = async (id: string, withForms: boolean) => {
  return await prisma.frenchVerb.findUnique({
    where: {
      id,
    },
    include: {
      forms: withForms,
    },
  });
};

const findNorwegianVerb = async (id: string) => {
  return await prisma.norwegianVerb.findUnique({
    where: {
      id,
    },
  });
};

const findVerb = async (
  id: string,
  language: LanguageISO,
  withForms: boolean
) => {
  switch (language) {
    case "de":
      return await findGermanVerb(id, withForms);
    case "us":
      return await findEnglishVerb(id, withForms);
    case "es":
      return await findSpanishVerb(id, withForms);
    case "fr":
      return await findFrenchVerb(id, withForms);
    case "no":
      return await findNorwegianVerb(id);
  }
};

const createVerbAggregation = async (verbAggregation: VerbAggregation) => {
  return await prisma.verbAggregation.create({
    data: {
      de: {
        create: {
          infinitive: verbAggregation.de.infinitive,
          forms: {
            create: verbAggregation.de.forms,
          },
        },
      },
      us: {
        create: {
          infinitive: verbAggregation.us.infinitive,
          forms: {
            create: verbAggregation.us.forms,
          },
        },
      },
      es: {
        create: {
          infinitive: verbAggregation.es.infinitive,
          forms: {
            create: verbAggregation.es.forms,
          },
        },
      },
      fr: {
        create: {
          infinitive: verbAggregation.fr.infinitive,
          forms: {
            create: verbAggregation.fr.forms,
          },
        },
      },
      no: {
        create: verbAggregation.no,
      },
    },
  });
};

const includedLanguages = (languages: LanguageISO[], withForms: boolean) => {
  return languages.reduce((acc, language) => {
    if (withForms) {
      acc[language] = {
        include: {
          forms: true,
        },
      };
      return acc;
    } else {
      acc[language] = true;
      return acc;
    }
  }, {} as Record<string, boolean | { include: { forms: boolean } }>);
};

const findVerbAggregation = async (
  id: string,
  languages: LanguageISO[],
  withForms: boolean
) => {
  return await prisma.verbAggregation.findUnique({
    where: {
      id,
    },
    include: includedLanguages(languages, withForms),
  });
};

const findRandomVerbAggregations = async (
  size: number,
  languages: LanguageISO[],
  withVerbs: boolean,
  withForms: boolean
) => {
  const mongoClient = new MongoClient(process.env.MONGO_URI!);
  await mongoClient.connect();

  const db = mongoClient.db("mulingu");
  const collection = db.collection("VerbAggregation");

  const pipeline: any[] = [{ $sample: { size } }];

  if (withVerbs) {
    if (languages.includes("de")) {
      pipeline.push(
        {
          $lookup: {
            from: "GermanVerb",
            localField: "germanVerbId",
            foreignField: "_id",
            as: "de",
          },
        },
        { $unwind: "$de" }
      );
      if (withForms) {
        pipeline.push({
          $lookup: {
            from: "VerbForm",
            localField: "de._id",
            foreignField: "germanVerbId",
            as: "de.forms",
          },
        });
      }
    }

    if (languages.includes("us")) {
      pipeline.push(
        {
          $lookup: {
            from: "EnglishVerb",
            localField: "englishVerbId",
            foreignField: "_id",
            as: "us",
          },
        },
        { $unwind: "$us" }
      );
      if (withForms) {
        pipeline.push({
          $lookup: {
            from: "VerbForm",
            localField: "us._id",
            foreignField: "englishVerbId",
            as: "us.forms",
          },
        });
      }
    }

    if (languages.includes("es")) {
      pipeline.push(
        {
          $lookup: {
            from: "SpanishVerb",
            localField: "spanishVerbId",
            foreignField: "_id",
            as: "es",
          },
        },
        { $unwind: "$es" }
      );
      if (withForms) {
        pipeline.push({
          $lookup: {
            from: "VerbForm",
            localField: "es._id",
            foreignField: "spanishVerbId",
            as: "es.forms",
          },
        });
      }
    }

    if (languages.includes("fr")) {
      pipeline.push(
        {
          $lookup: {
            from: "FrenchVerb",
            localField: "frenchVerbId",
            foreignField: "_id",
            as: "fr",
          },
        },
        { $unwind: "$fr" }
      );
      if (withForms) {
        pipeline.push({
          $lookup: {
            from: "VerbForm",
            localField: "fr._id",
            foreignField: "frenchVerbId",
            as: "fr.forms",
          },
        });
      }
    }

    if (languages.includes("no")) {
      pipeline.push(
        {
          $lookup: {
            from: "NorwegianVerb",
            localField: "norwegianVerbId",
            foreignField: "_id",
            as: "no",
          },
        },
        { $unwind: "$no" }
      );
    }
  }

  const randomVerbAggregations = await collection.aggregate(pipeline).toArray();

  await mongoClient.close();

  return randomVerbAggregations;
};

export {
  findVerb,
  createVerbAggregation,
  findVerbAggregation,
  findRandomVerbAggregations,
};
