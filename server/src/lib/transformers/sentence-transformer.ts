import {
  PartialSentenceAggregation,
  SolutionAggregation,
  Task,
} from "../../types";
import { transformSolutionAggregation } from "../../utils/task";

const getSentenceAggregationTask = (
  sentenceAggregation: PartialSentenceAggregation
): Task => {
  const solutionAggregation =
    getSentenceAggregationSolution(sentenceAggregation);

  const { reference, answers, currentISO } =
    transformSolutionAggregation(solutionAggregation);

  return {
    kind: "sentence",
    reference,
    answers,
    currentISO,
  };
};

const getSentenceAggregationSolution = (
  sentenceAggregation: PartialSentenceAggregation
): SolutionAggregation => {
  return {
    solutions: {
      de: sentenceAggregation.de?.sentence,
      us: sentenceAggregation.us?.sentence,
      es: sentenceAggregation.es?.sentence,
      fr: sentenceAggregation.fr?.sentence,
      no: sentenceAggregation.no?.sentence,
    },
  };
};

export { getSentenceAggregationTask, getSentenceAggregationSolution };
