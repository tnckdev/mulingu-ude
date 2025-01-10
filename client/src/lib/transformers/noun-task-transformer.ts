import {
  Answer,
  LanguageISO,
  Noun,
  NounGroup,
  NounTaskKind,
  Reference,
  Task,
} from "@/utils/types";

const nounTaskKinds: NounTaskKind[] = [
  "definiteSingular",
  "indefiniteSingular",
  "definitePlural",
];

const getRandomNounTaskKind = (): NounTaskKind => {
  const randomIndex = Math.floor(Math.random() * nounTaskKinds.length);
  return nounTaskKinds[randomIndex];
};

const createNounSolution = (noun: Noun, kind: NounTaskKind) => {
  switch (kind) {
    case "definiteSingular":
      return `${noun.definiteSingularArticle} ${noun.singular}`;
    case "indefiniteSingular":
      return `${noun.indefiniteSingularArticle} ${noun.singular}`;
    case "definitePlural":
      return `${noun.definitePluralArticle} ${noun.plural}`;
  }
};

const createNounAnswer = (noun: Noun, kind: NounTaskKind): Answer => {
  return {
    text: "",
    solution: createNounSolution(noun, kind),
    availableStrings: [],
    selectedStrings: [],
    difficulty: "HARD",
  };
};

interface NounAnswers {
  [key: string]: Answer;
}

const transformNounGroup = (nounGroup: NounGroup): Task => {
  const nouns: Noun[] = nounGroup.nouns;
  const kind = getRandomNounTaskKind();

  const randomNounIndex = Math.floor(Math.random() * nouns.length);
  const reference: Reference = {
    iso: nouns[randomNounIndex].language,
    text: createNounSolution(nouns[randomNounIndex], kind),
  };

  const answers: NounAnswers = nouns.reduce((acc: NounAnswers, noun: Noun) => {
    if (noun.language !== reference.iso) {
      acc[noun.language] = createNounAnswer(noun, kind);
    }
    return acc;
  }, {});

  return {
    kind: "word",
    reference,
    answers,
    currentISO: Object.keys(answers)[0] as LanguageISO,
  };
};

export { transformNounGroup };
