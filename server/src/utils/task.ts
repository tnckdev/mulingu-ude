import { Answer, LanguageISO, Reference, SolutionAggregation } from "../types";

const transformSolutionAggregation = (
  solutionAggregation: SolutionAggregation
): {
  reference: Reference;
  answers: Record<LanguageISO, Answer>;
  currentISO: LanguageISO;
} => {
  const allKeys = Object.keys(solutionAggregation.solutions) as LanguageISO[];
  const nonEmptyKeys = allKeys.filter(
    (iso) =>
      solutionAggregation.solutions[iso] &&
      solutionAggregation.solutions[iso].length > 0
  );

  const { referenceKey, nonReferenceKeys } = createTaskKeys(nonEmptyKeys);

  const reference: Reference = {
    iso: referenceKey,
    text: solutionAggregation.solutions[referenceKey]!,
  };

  const answers: Record<LanguageISO, Answer> = nonReferenceKeys.reduce(
    (acc, iso) => {
      acc[iso] = {
        text: "",
        solution: solutionAggregation.solutions[iso]!,
        selectedStrings: [],
        availableStrings: [],
        difficulty: "HARD",
      };
      return acc;
    },
    {} as Record<LanguageISO, Answer>
  );

  return { reference, answers, currentISO: nonReferenceKeys[0] };
};

const createTaskKeys = (
  keys: LanguageISO[]
): { referenceKey: LanguageISO; nonReferenceKeys: LanguageISO[] } => {
  const referenceKey = keys[Math.floor(Math.random() * keys.length)];
  const nonReferenceKeys = keys.filter((iso) => iso !== referenceKey);
  return { referenceKey, nonReferenceKeys };
};

export { transformSolutionAggregation, createTaskKeys };
