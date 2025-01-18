import { Answer, LanguageISO, Task } from "../../types";

const transformTask = (task: Task, languages: LanguageISO[]): Task => {
  const answers: Partial<Record<LanguageISO, Answer>> = {};
  languages.forEach((language) => {
    if (task.answers[language]) {
      answers[language] = task.answers[language];
    }
  });

  return {
    ...task,
    answers,
  };
};

export { transformTask };
