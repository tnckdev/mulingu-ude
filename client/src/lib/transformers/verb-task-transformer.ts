import {
  Answer,
  LanguageISO,
  Reference,
  Task,
  Verb,
  VerbGroup,
} from "@/utils/types";


const createVerbAnswer = (verb: Verb): Answer => {
  return {
    text: "",
    solution: verb.infinitive,
    availableStrings: [],
    selectedStrings: [],
    difficulty: "HARD",
  };
};

interface VerbAnswers {
  [key: string]: Answer;
}

const transformVerbGroup = (verbGroup: VerbGroup): Task => {
  const verbs = verbGroup.verbs;

  const randomVerbIndex = Math.floor(Math.random() * verbs.length);
  const reference: Reference = {
    iso: verbs[randomVerbIndex].language,
    text: verbs[randomVerbIndex].infinitive,
  };

  const answers: VerbAnswers = verbs.reduce((acc: VerbAnswers, verb: Verb) => {
    if (verb.language !== reference.iso) {
      acc[verb.language] = createVerbAnswer(verb);
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

export { transformVerbGroup };