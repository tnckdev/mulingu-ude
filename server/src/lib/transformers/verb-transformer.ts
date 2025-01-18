import {
  LanguageISO,
  NorwegianVerb,
  Numerus,
  NumerusPerson,
  PartialVerbAggregation,
  Solution,
  SolutionAggregation,
  StandardVerb,
  Task,
  VerbForm,
  VerbTaskKind,
} from "../../types";
import { transformSolutionAggregation } from "../../utils/task";


// Could be moved to frontend
const getVerbAggregationTask = (verbAggregation: PartialVerbAggregation): Task => {
  const kinds: VerbTaskKind[] = [
    "infinitive",
    "present",
    "preterite",
    "perfect",
    "future",
  ];

  const numeri: Numerus[] = ["singular", "plural"];
  const persons: NumerusPerson[] = ["first", "second", "third"];

  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const numerus = numeri[Math.floor(Math.random() * numeri.length)];
  const person = persons[Math.floor(Math.random() * persons.length)];

  const solutionAggregation = getVerbAggregationSolution(
    verbAggregation,
    kind,
    numerus,
    person
  );

  const { reference, answers, currentISO } =
    transformSolutionAggregation(solutionAggregation);

  return {
    kind: "word",
    reference,
    answers,
    currentISO,
  };
};

// Server-side solution generation
const getVerbAggregationSolution = (
  verbAggregation: PartialVerbAggregation,
  kind: VerbTaskKind,
  numerus: Numerus,
  person: NumerusPerson
): SolutionAggregation => {
  return {
    solutions: {
      de: verbAggregation.de
        ? getStandardVerbSolution(
            verbAggregation.de,
            kind,
            "de",
            numerus,
            person
          )
        : undefined,
      us: verbAggregation.us
        ? getStandardVerbSolution(
            verbAggregation.us,
            kind,
            "us",
            numerus,
            person
          )
        : undefined,
      es: verbAggregation.es
        ? getStandardVerbSolution(
            verbAggregation.es,
            kind,
            "es",
            numerus,
            person
          )
        : undefined,
      fr: verbAggregation.fr
        ? getStandardVerbSolution(
            verbAggregation.fr,
            kind,
            "fr",
            numerus,
            person
          )
        : undefined,
      no: verbAggregation.no
        ? getNorwegianVerbSolution(
            verbAggregation.no,
            kind,
            numerus,
            person
          )
        : undefined,
    },
  };
};

const getStandardVerbSolution = (
  verb: StandardVerb,
  verbTaskKind: VerbTaskKind,
  language: LanguageISO,
  numerus: Numerus,
  numerusPerson: NumerusPerson
): Solution => {
  if (verbTaskKind === "infinitive") {
    return verb.infinitive;
  }

  const form = verb.forms.find((form) => form.form === verbTaskKind);
  if (!form) {
    throw new Error("Verb has incorrect db format");
  }

  const entry = getVerbFormEntry(form, numerus, numerusPerson);
  const pronoun = getPronoun(language, numerus, numerusPerson);

  return pronoun + " " + entry;
};

const getNorwegianVerbSolution = (
  verb: NorwegianVerb,
  verbTaskKind: VerbTaskKind,
  numerus: Numerus,
  numerusPerson: NumerusPerson
): Solution => {
  if (verbTaskKind === "infinitive") {
    return verb.infinitive;
  }

  const pronoun = getPronoun("no", numerus, numerusPerson);

  switch (verbTaskKind) {
    case "present":
      return pronoun + " " + verb.present;
    case "preterite":
      return pronoun + " " + verb.preterite;
    case "perfect":
      return pronoun + " " + verb.perfect;
    case "future":
      return pronoun + " " + verb.future;
  }
};

const getPronoun = (
  language: LanguageISO,
  numerus: Numerus,
  numerusPerson: NumerusPerson
): string => {
  const baseIndex = numerus === "singular" ? 0 : 3;
  const personIndex =
    numerusPerson === "first" ? 0 : numerusPerson === "second" ? 1 : 2;
  const pronounIndex = baseIndex + personIndex;

  const pronouns = getLanguagePronouns(language);

  return pronouns[pronounIndex];
};

const getVerbFormEntry = (
  verbForm: VerbForm,
  numerus: Numerus,
  person: NumerusPerson
) => {
  switch (numerus) {
    case "singular":
      switch (person) {
        case "first":
          return verbForm.firstPersonSingular;
        case "second":
          return verbForm.secondPersonSingular;
        case "third":
          return verbForm.thirdPersonSingular;
      }
    case "plural":
      switch (person) {
        case "first":
          return verbForm.firstPersonPlural;
        case "second":
          return verbForm.secondPersonPlural;
        case "third":
          return verbForm.thirdPersonPlural;
      }
  }
};

const getLanguagePronouns = (language: LanguageISO): string[] => {
  switch (language) {
    case "de":
      return ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"];
    case "us":
      return ["I", "You", "He/She/It", "We", "You", "They"];
    case "es":
      return ["Yo", "Tú", "Él/Ella/Usted", "Nosotros", "Vosotros", "Ellos"];
    case "fr":
      return ["Je", "Tu", "Il/Elle/On", "Nous", "Vous", "Ils/Elles"];
    case "no":
      return ["Jeg", "Du", "Han/Hun", "Vi", "Dere", "De"];
  }
};

export { getVerbAggregationTask };
