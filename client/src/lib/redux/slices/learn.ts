import { createAppSlice } from "@/lib/redux/createAppSlice";
import { Difficulty, LanguageISO, Reference, Task } from "@/utils/types";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";

export interface LearnSliceState {
  tasks: Task[];
  currentIndex: number;
}

const initialState: LearnSliceState = {
  tasks: [
    {
      kind: "word",
      reference: { iso: "us", text: "Hello" },
      answers: {
        de: {
          text: "",
          solution: "Hallo",
          selectedStrings: [],
          availableStrings: [],
          difficulty: "HARD",
        },
      },
      currentISO: "de",
    },
  ],
  currentIndex: 0,
};

export const learnSlice = createAppSlice({
  name: "learn",
  initialState,
  reducers: {
    next: (state) => {
      state.currentIndex = Math.min(
        state.currentIndex + 1,
        state.tasks.length - 1
      );
    },
    prev: (state) => {
      state.currentIndex = Math.max(state.currentIndex - 1, 0);
    },
    updateCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    updateReference: (
      state,
      action: PayloadAction<{ reference: Reference; index: number }>
    ) => {
      const { reference, index } = action.payload;
      state.tasks[index].reference = reference;
    },
    updateTask: (
      state,
      action: PayloadAction<{ task: Task; index: number }>
    ) => {
      const { task, index } = action.payload;
      state.tasks[index] = task;
    },
    updateTaskISO: (
      state,
      action: PayloadAction<{ index: number; iso: string }>
    ) => {
      const { index, iso } = action.payload;
      const task = state.tasks[index];
      task.currentISO = iso as LanguageISO;
    },
    updateTaskAnswerText: (
      state,
      action: PayloadAction<{ index: number; iso: LanguageISO; text: string }>
    ) => {
      const { index, iso, text } = action.payload;
      const task = state.tasks[index];
      const answer = task.answers[iso];
      if (answer) answer.text = text;
    },

    updateTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    updateAvailableStrings: (
      state,
      action: PayloadAction<{
        index: number;
        iso: LanguageISO;
        availableStrings: string[];
      }>
    ) => {
      const { index, iso, availableStrings } = action.payload;
      const task = state.tasks[index];
      const answer = task.answers[iso];
      if (answer) answer.availableStrings = availableStrings;
    },

    addSelectedString: (
      state,
      action: PayloadAction<{
        index: number;
        iso: LanguageISO;
        strIndex: number;
      }>
    ) => {
      const { index, iso, strIndex } = action.payload;
      const task = state.tasks[index];
      const answer = task.answers[iso];
      if (answer) {
        const selectedStrings = answer.selectedStrings;
        const availableStrings = answer.availableStrings;

        selectedStrings.push(availableStrings[strIndex]);
        availableStrings.splice(strIndex, 1);
      }
    },
    removeSelectedString: (
      state,
      action: PayloadAction<{
        index: number;
        iso: LanguageISO;
        strIndex: number;
      }>
    ) => {
      const { index, iso, strIndex } = action.payload;
      const task = state.tasks[index];
      const answer = task.answers[iso];
      if (answer) {
        const selectedStrings = answer.selectedStrings;
        const availableStrings = answer.availableStrings;

        availableStrings.push(selectedStrings[strIndex]);
        selectedStrings.splice(strIndex, 1);
      }
    },

    updateDifficulty: (
      state,
      action: PayloadAction<{
        index: number;
        iso: LanguageISO;
        difficulty: Difficulty;
      }>
    ) => {
      const { index, iso, difficulty } = action.payload;
      const task = state.tasks[index];
      const answer = task.answers[iso];
      if (answer) answer.difficulty = difficulty;
    },
  },
  selectors: {
    selectTasks: (state) => state.tasks,
    selectCurrentIndex: (state) => state.currentIndex,
    selectCurrentTask: (state) => state.tasks[state.currentIndex],
    selectTaskAmount: (state) => state.tasks.length,
  },
});

const selectTask = createSelector(
  [
    (state: LearnSliceState) => state.tasks,
    (_: LearnSliceState, index: number) => index,
  ],
  (tasks, index) => tasks[index]
);

const selectSolution = createSelector(
  [
    (state: LearnSliceState) => state.tasks,
    (_: LearnSliceState, info: { index: number; iso: LanguageISO }) => info,
  ],
  (tasks, info) => {
    const { index, iso } = info;
    const task = tasks[index];
    const answer = task.answers[iso];
    return answer ? answer.solution : "";
  }
);

const selectText = createSelector(
  [
    (state: LearnSliceState) => state.tasks,
    (_: LearnSliceState, info: { index: number; iso: LanguageISO }) => info,
  ],
  (tasks, info) => {
    const { index, iso } = info;
    const task = tasks[index];
    const answer = task.answers[iso];
    return answer ? answer.text : "";
  }
);

const selectKind = createSelector(
  [
    (state: LearnSliceState) => state.tasks,
    (_: LearnSliceState, index: number) => index,
  ],
  (tasks, index) => tasks[index].kind
);

const selectTaskISO = createSelector(
  [
    (state: LearnSliceState) => state.tasks,
    (_: LearnSliceState, index: number) => index,
  ],
  (tasks, index) => tasks[index].currentISO
);

const selectTaskISOs = createSelector(
  [
    (state: LearnSliceState) => state.tasks,
    (_: LearnSliceState, index: number) => index,
  ],
  (tasks, index) => Object.keys(tasks[index].answers)
);

const selectAvailableStrings = createSelector(
  [
    (state: LearnSliceState) => state,
    (_: LearnSliceState, info: { index: number; iso: LanguageISO }) => info,
  ],
  (state, info) => {
    const { index, iso } = info;
    const task = state.tasks[index];
    const answer = task.answers[iso];
    return answer ? answer.availableStrings : [];
  }
);

const selectSelectedStrings = createSelector(
  [
    (state: LearnSliceState) => state,
    (_: LearnSliceState, info: { index: number; iso: LanguageISO }) => info,
  ],
  (state, info) => {
    const { index, iso } = info;
    const task = state.tasks[index];
    const answer = task.answers[iso];
    return answer ? answer.selectedStrings : [];
  }
);

const selectDifficulty = createSelector(
  [
    (state: LearnSliceState) => state,
    (_: LearnSliceState, info: { index: number; iso: LanguageISO }) => info,
  ],
  (state, info) => {
    const { index, iso } = info;
    const task = state.tasks[index];
    const answer = task.answers[iso];
    return answer ? answer.difficulty : "HARD";
  }
);

export const {
  next,
  prev,
  updateCurrentIndex,
  updateReference,
  updateTask,
  updateTaskISO,
  updateTaskAnswerText,
  updateTasks,
  updateAvailableStrings,
  addSelectedString,
  removeSelectedString,
  updateDifficulty,
} = learnSlice.actions;

export const {
  selectTasks,
  selectCurrentIndex,
  selectCurrentTask,
  selectTaskAmount,
} = learnSlice.selectors;

export {
  selectTask,
  selectSolution,
  selectText,
  selectKind,
  selectTaskISO,
  selectTaskISOs,
  selectAvailableStrings,
  selectSelectedStrings,
  selectDifficulty,
};
