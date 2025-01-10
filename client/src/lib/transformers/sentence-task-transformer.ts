import {
  Answer,
  LanguageISO,
  Reference,
  Sentence,
  SentenceGroup,
  Task,
} from "@/utils/types";

const createSentenceAnswer = (sentence: Sentence): Answer => {
  return {
    text: "",
    solution: sentence.sentence,
    availableStrings: [],
    selectedStrings: [],
    difficulty: "HARD",
  };
};

interface SentenceAnswers {
  [key: string]: Answer;
}

const transformSentenceGroup = (sentenceGroup: SentenceGroup): Task => {
  const sentences = sentenceGroup.sentences;

  const randomSentenceIndex = Math.floor(Math.random() * sentences.length);
  const reference: Reference = {
    iso: sentences[randomSentenceIndex].language,
    text: sentences[randomSentenceIndex].sentence,
  };

  const answers: SentenceAnswers = sentences.reduce(
    (acc: SentenceAnswers, sentence: Sentence) => {
      if (sentence.language !== reference.iso) {
        acc[sentence.language] = createSentenceAnswer(sentence);
      }
      return acc;
    },
    {}
  );

  return {
    kind: "sentence",
    reference,
    answers,
    currentISO: Object.keys(answers)[0] as LanguageISO,
  };
};

export { transformSentenceGroup };
