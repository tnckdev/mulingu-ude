import { prisma } from "../../index";
import { LanguageISO } from "../../types";

const findLanguageNouns = async (language: LanguageISO) => {
  switch (language) {
    case "us":
      return await prisma.englishNoun.findMany({
        orderBy: {
          singular: "asc",
        },
      });
    case "de":
      return await prisma.germanNoun.findMany({
        orderBy: {
          singular: "asc",
        },
      });
    case "fr":
      return await prisma.frenchNoun.findMany({
        orderBy: {
          singular: "asc",
        },
      });
    case "es":
      return await prisma.spanishNoun.findMany({
        orderBy: {
          singular: "asc",
        },
      });
    case "no":
      return await prisma.norwegianNoun.findMany({
        orderBy: {
          singular: "asc",
        },
      });
  }
};

const findLanguageVerbs = async (language: LanguageISO) => {
  switch (language) {
    case "us":
      return await prisma.englishVerb.findMany({
        orderBy: {
          infinitive: "asc",
        },
      });
    case "de":
      return await prisma.germanVerb.findMany({
        orderBy: {
          infinitive: "asc",
        },
      });
    case "fr":
      return await prisma.frenchVerb.findMany({
        orderBy: {
          infinitive: "asc",
        },
      });
    case "es":
      return await prisma.spanishVerb.findMany({
        orderBy: {
          infinitive: "asc",
        },
      });
    case "no":
      return await prisma.norwegianVerb.findMany({
        orderBy: {
          infinitive: "asc",
        },
      });
  }
};

export { findLanguageNouns, findLanguageVerbs };
