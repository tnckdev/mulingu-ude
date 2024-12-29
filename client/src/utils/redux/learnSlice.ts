import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./createAppSlice";

export enum Difficulty {
  EASY,
  HARD,
}

type LanguageAnswer = {
  text: string;
  solution: string;
  selectedStrings: string[];
  availableStrings: string[];
  difficulty: Difficulty;
  correct: boolean;
};

type TaskAnswer = {
  kind: "word" | "sentence";
  languages: { [iso: string]: LanguageAnswer };
};

export interface LearnSliceState {
  answers: TaskAnswer[];
  currentIndex: number;
  currentISOs: string[];
}

const getSampleAnswers = (): TaskAnswer[] => {
  const data: TaskAnswer[] = [
    {
      kind: "word",
      languages: {
        us: {
          text: "",
          solution: "Hello",
          correct: false,
          availableStrings: [],
          selectedStrings: [],
          difficulty: Difficulty.EASY,
        },
        de: {
          text: "",
          solution: "Hallo",
          correct: false,
          availableStrings: [],
          selectedStrings: [],
          difficulty: Difficulty.EASY,
        },
      },
    },
    {
      kind: "sentence",
      languages: {
        us: {
          text: "",
          solution: "Hello World!",
          correct: false,
          availableStrings: [],
          selectedStrings: [],
          difficulty: Difficulty.HARD,
        },
        de: {
          text: "",
          solution: "Hallo Welt!",
          correct: false,
          availableStrings: [],
          selectedStrings: [],
          difficulty: Difficulty.HARD,
        },
      },
    },
    {
      kind: "sentence",
      languages: {
        us: {
          text: "",
          solution: "Hello World!",
          correct: false,
          availableStrings: [],
          selectedStrings: [],
          difficulty: Difficulty.HARD,
        },
        de: {
          text: "",
          solution: "Hallo Welt!",
          correct: false,
          availableStrings: [],
          selectedStrings: [],
          difficulty: Difficulty.HARD,
        },
      },
    },
  ];

  return data;
};

const initialState: LearnSliceState = {
  answers: getSampleAnswers(),
  currentIndex: 0,
  currentISOs: ["us", "us", "us"],
};

export const learnSlice = createAppSlice({
  name: "learn",
  initialState,
  reducers: {
    next: (state) => {
      state.currentIndex = Math.min(
        state.currentIndex + 1,
        state.answers.length - 1
      );
    },
    prev: (state) => {
      state.currentIndex = Math.max(state.currentIndex - 1, 0);
    },
    updateCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    updateAnswer: (
      state,
      action: PayloadAction<{ index: number; iso: string; text: string }>
    ) => {
      const {index, iso, text} = action.payload;
      const answer = state.answers[index];
      const languageAnswer = answer.languages[iso];
      languageAnswer.text = text;
    },
    updateCurrentISO: (
      state,
      action: PayloadAction<{ index: number; iso: string }>
    ) => {
      const {index, iso} = action.payload;
      state.currentISOs[index] = iso;
    },
    updateAvailableStrings: (
      state,
      action: PayloadAction<{
        index: number;
        iso: string;
        availableStrings: string[];
      }>
    ) => {
      const { index, iso, availableStrings } = action.payload;
      state.answers[index].languages[iso].availableStrings = availableStrings;
    },
    addSelectedString: (
      state,
      action: PayloadAction<{ index: number; iso: string; strIndex: number }>
    ) => {
      const { index, iso, strIndex } = action.payload;
      const selectedStrings =
        state.answers[index].languages[iso].selectedStrings;
      const availableStrings =
        state.answers[index].languages[iso].availableStrings;

      selectedStrings.push(availableStrings[strIndex]);
      availableStrings.splice(strIndex, 1);
    },
    removeSelectedString: (
      state,
      action: PayloadAction<{ index: number; iso: string; strIndex: number }>
    ) => {
      const { index, iso, strIndex } = action.payload;
      const selectedStrings =
        state.answers[index].languages[iso].selectedStrings;
      const availableStrings =
        state.answers[index].languages[iso].availableStrings;

      availableStrings.push(selectedStrings[strIndex]);
      selectedStrings.splice(strIndex, 1);
    },
    updateDifficulty: (
      state,
      action: PayloadAction<{
        index: number;
        iso: string;
        difficulty: Difficulty;
      }>
    ) => {
      const { index, iso, difficulty } = action.payload;
      state.answers[index].languages[iso].difficulty = difficulty;
    },
  },
  selectors: {
    selectAnswers: (state) => state.answers,
    selectCurrentIndex: (state) => state.currentIndex,
    selectCurrentAnswer: (state) => state.answers[state.currentIndex],
    selectTaskAmount: (state) => state.answers.length,
  },
});

const selectAnswer = createSelector(
  [
    (state: LearnSliceState) => state.answers,
    (_: LearnSliceState, index: number) => index,
  ],
  (answers, index) => answers[index]
);

const selectSolution = createSelector(
  [
    (state: LearnSliceState) => state.answers,
    (_: LearnSliceState, info: { index: number; iso: string }) => info,
  ],
  (answers, info) => answers[info.index].languages[info.iso].solution
);

const selectText = createSelector(
  [
    (state: LearnSliceState) => state.answers,
    (_: LearnSliceState, info: { index: number; iso: string }) => info,
  ],
  (answers, info) => answers[info.index].languages[info.iso].text
);

const selectKind = createSelector(
  [
    (state: LearnSliceState) => state.answers,
    (_: LearnSliceState, index: number) => index,
  ],
  (answers, index) => answers[index].kind
);

const selectCurrentISO = createSelector(
  [
    (state: LearnSliceState) => state.currentISOs,
    (_: LearnSliceState, index: number) => index,
  ],
  (currentISOs, index) => currentISOs[index]
);

const selectISOs = createSelector(
  [
    (state: LearnSliceState) => state.answers,
    (_: LearnSliceState, index: number) => index,
  ],
  (answers, index) => Object.keys(answers[index].languages)
);

const selectAvailableStrings = createSelector(
  [
    (state: LearnSliceState) => state,
    (_: LearnSliceState, info: { index: number; iso: string }) => info,
  ],
  (state, info) =>
    state.answers[info.index].languages[info.iso].availableStrings
);

const selectSelectedStrings = createSelector(
  [
    (state: LearnSliceState) => state,
    (_: LearnSliceState, info: { index: number; iso: string }) => info,
  ],
  (state, info) => state.answers[info.index].languages[info.iso].selectedStrings
);

const selectDifficulty = createSelector(
  [
    (state: LearnSliceState) => state,
    (_: LearnSliceState, info: { index: number; iso: string }) => info,
  ],
  (state, info) => state.answers[info.index].languages[info.iso].difficulty
);

export const {
  next,
  prev,
  updateAnswer,
  updateCurrentISO,
  updateCurrentIndex,
  updateAvailableStrings,
  updateDifficulty,
  addSelectedString,
  removeSelectedString,
} = learnSlice.actions;

export const {
  selectAnswers,
  selectCurrentIndex,
  selectCurrentAnswer,
  selectTaskAmount,
} = learnSlice.selectors;

export {
  selectSolution,
  selectAnswer,
  selectText,
  selectKind,
  selectCurrentISO,
  selectISOs,
  selectAvailableStrings,
  selectSelectedStrings,
  selectDifficulty,
};
