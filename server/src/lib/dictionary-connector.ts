import { prisma } from "../prisma";
import { LanguageISO } from "../types";

const findLanguageNouns = async (
  language: LanguageISO
  // amount: number,
  // start: number
) => {
  return await prisma.noun.findMany({
    orderBy: {
      singular: "asc",
    },
    // skip: start,
    // take: amount,
    where: {
      language,
    },
  });
};

const findLanguageVerbs = async (
  language: LanguageISO
  // amount: number,
  // start: number
) => {
  return await prisma.verb.findMany({
    orderBy: {
      infinitive: "asc",
    },
    // skip: start,
    // take: amount,
    where: {
      language,
    },
  });
};

export { findLanguageNouns, findLanguageVerbs };
