import {
  EnglishNoun,
  FrenchNoun,
  GermanNoun,
  NorwegianNoun,
  NounTaskKind,
  PartialNounAggregation,
  Solution,
  SolutionAggregation,
  SpanishNoun,
  Task,
} from "../../types";
import { transformSolutionAggregation } from "../../utils/task";

const getNounAggregationTask = (
  nounAggregation: PartialNounAggregation
): Task => {
  const solutionAggregation = getNounAggregationSolution(
    nounAggregation,
    "definiteSingular"
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

const getNounAggregationSolution = (
  nounAggregation: PartialNounAggregation,
  kind: NounTaskKind
): SolutionAggregation => {
  return {
    solutions: {
      de: nounAggregation.de
        ? getGermanNounSolution(nounAggregation.de, kind)
        : "",
      us: nounAggregation.us
        ? getEnglishNounSolution(nounAggregation.us, kind)
        : "",
      es: nounAggregation.es
        ? getSpanishNounSolution(nounAggregation.es, kind)
        : "",
      fr: nounAggregation.fr
        ? getFrenchNounSolution(nounAggregation.fr, kind)
        : "",
      no: nounAggregation.no
        ? getNorwegianNounSolution(nounAggregation.no, kind)
        : "",
    },
  };
};

const getGermanNounSolution = (
  germanNoun: GermanNoun,
  kind: NounTaskKind
): Solution => {
  switch (kind) {
    case "indefiniteSingular":
      return germanNoun.indefiniteSingularArticle + " " + germanNoun.singular;
    case "definiteSingular":
      return germanNoun.definiteSingularArticle + " " + germanNoun.singular;
    case "definitePlural":
      return germanNoun.definitePluralArticle + " " + germanNoun.plural;
  }
};

const getEnglishNounSolution = (
  englishNoun: EnglishNoun,
  kind: NounTaskKind
): Solution => {
  switch (kind) {
    case "indefiniteSingular":
      return englishNoun.indefiniteSingularArticle + " " + englishNoun.singular;
    case "definiteSingular":
      return "the " + englishNoun.singular;
    case "definitePlural":
      return "the " + englishNoun.plural;
  }
};

const getSpanishNounSolution = (
  spanishNoun: SpanishNoun,
  kind: NounTaskKind
): Solution => {
  switch (kind) {
    case "indefiniteSingular":
      return spanishNoun.indefiniteSingularArticle + " " + spanishNoun.singular;
    case "definiteSingular":
      return spanishNoun.definiteSingularArticle + " " + spanishNoun.singular;
    case "definitePlural":
      return spanishNoun.definitePluralArticle + " " + spanishNoun.plural;
  }
};

const getFrenchNounSolution = (
  frenchNoun: FrenchNoun,
  kind: NounTaskKind
): Solution => {
  switch (kind) {
    case "indefiniteSingular":
      return frenchNoun.indefiniteSingularArticle + " " + frenchNoun.singular;
    case "definiteSingular":
      return frenchNoun.definiteSingularArticle + " " + frenchNoun.singular;
    case "definitePlural":
      return "les " + frenchNoun.plural;
  }
};

const getNorwegianNounSolution = (
  norwegianNoun: NorwegianNoun,
  kind: NounTaskKind
): Solution => {
  switch (kind) {
    case "indefiniteSingular":
      return (
        norwegianNoun.indefiniteSingularArticle + " " + norwegianNoun.singular
      );
    case "definiteSingular":
      return norwegianNoun.definiteSingular;
    case "definitePlural":
      return norwegianNoun.definitePlural;
  }
};

export { getNounAggregationTask };
