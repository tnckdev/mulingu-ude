import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  next,
  prev,
  selectCurrentIndex,
  selectTaskAmount,
  updateCurrentIndex,
} from "@/utils/redux/learnSlice";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import MultiAnswerBuilder from "./multi-answer-builder";

const LearnArea = () => {
  const dispatch = useAppDispatch();

  const amount = useAppSelector(selectTaskAmount);

  const currentIndex = useAppSelector(selectCurrentIndex) || 0;

  useEffect(() => {
    // const fetchTasks = async () => {
    //   try {
    //     const params = {
    //       sentences: 2,
    //       nouns: 2,
    //       verbs: 2,
    //     };

    //     const res = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/learn/random`,
    //       {
    //         params,
    //         withCredentials: true,
    //       }
    //     );

    //     const data = res.data;
    //     // Only singular for now, random form later
    //     const nounTasks = data.nounGroups.map((nounGroup) => {
    //       const answers = nounGroup.nouns.reduce((acc, noun) => {
    //         acc[noun.language] = {
    //           text: "",
    //           solution: `${noun.definiteSingularArticle} ${noun.singular}`,
    //           correct: false,
    //           availableStrings: [],
    //           selectedStrings: [],
    //           difficulty: Difficulty.HARD,
    //         };
    //         return acc;
    //       }, {});

    //       const keys = Object.keys(answers);
    //       const randomKey = keys[Math.floor(Math.random() * keys.length)];

    //       const reference = {
    //         iso: randomKey,
    //         text: answers[randomKey].solution,
    //       };

    //       const filteredAnswers = Object.entries(answers)
    //         .filter(([key]) => key !== randomKey)
    //         .reduce((acc, [key, value]) => {
    //           acc[key] = value;
    //           return acc;
    //         }, {});

    //       const filteredKeys = keys.filter((key) => key !== randomKey);
    //       const currentISO = filteredKeys[0];

    //       console.log(answers);

    //       const task: Task = {
    //         kind: "word",
    //         reference,
    //         answers: filteredAnswers,
    //         currentISO,
    //       };

    //       return task;
    //     });

    //     const sentenceTasks = data.sentenceGroups.map((sentenceGroup) => {
    //       const answers = sentenceGroup.sentences.reduce((acc, sentence) => {
    //         acc[sentence.language] = {
    //           text: "",
    //           solution: sentence.sentence,
    //           correct: false,
    //           availableStrings: [],
    //           selectedStrings: [],
    //           difficulty: Difficulty.HARD,
    //         };
    //         return acc;
    //       }, {});

    //       const keys = Object.keys(answers);
    //       const randomKey = keys[Math.floor(Math.random() * keys.length)];

    //       const reference = {
    //         iso: randomKey,
    //         text: answers[randomKey].solution,
    //       };

    //       const filteredAnswers = Object.entries(answers)
    //         .filter(([key]) => key !== randomKey)
    //         .reduce((acc, [key, value]) => {
    //           acc[key] = value;
    //           return acc;
    //         }, {});

    //       const filteredKeys = keys.filter((key) => key !== randomKey);
    //       const currentISO = filteredKeys[0];

    //       console.log(answers);

    //       const task: Task = {
    //         kind: "sentence",
    //         reference,
    //         answers: filteredAnswers,
    //         currentISO,
    //       };

    //       return task;
    //     });

    //     // Only infinitive forms for now, random form later
    //     const verbTasks = data.verbGroups.map((verbGroup) => {
    //       const answers = verbGroup.verbs.reduce((acc, verb) => {
    //         acc[verb.language] = {
    //           text: "",
    //           solution: verb.infinitive,
    //           correct: false,
    //           availableStrings: [],
    //           selectedStrings: [],
    //           difficulty: Difficulty.HARD,
    //         };
    //         return acc;
    //       }, {});

    //       const keys = Object.keys(answers);
    //       const randomKey = keys[Math.floor(Math.random() * keys.length)];

    //       const reference = {
    //         iso: randomKey,
    //         text: answers[randomKey].solution,
    //       };

    //       const filteredAnswers = Object.entries(answers)
    //         .filter(([key]) => key !== randomKey)
    //         .reduce((acc, [key, value]) => {
    //           acc[key] = value;
    //           return acc;
    //         }, {});

    //       const filteredKeys = keys.filter((key) => key !== randomKey);
    //       const currentISO = filteredKeys[0];

    //       console.log(answers);

    //       const task: Task = {
    //         kind: "word",
    //         reference,
    //         answers: filteredAnswers,
    //         currentISO,
    //       };

    //       return task;
    //     });

    //     const tasks = [...nounTasks, ...sentenceTasks, ...verbTasks];
    //     dispatch(updateTasks(tasks));
    //     console.log(tasks);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchTasks();

    // fetchRandomMultiSentences();
  }, []);

  return (
    <div className="w-full flex flex-col gap-3">
      <p>
        {currentIndex + 1} of {amount}
      </p>
      <MultiAnswerBuilder index={currentIndex} />
      <div className="flex w-full justify-center gap-2">
        <Button onClick={() => dispatch(prev())}>
          <ArrowLeft />
        </Button>
        {Array.from({ length: amount }).map((_, i) => (
          <Button
            key={`task-selector-${i}`}
            className={clsx(
              "aspect-square bg-background text-foreground",
              currentIndex == i && "bg-foreground text-background"
            )}
            onClick={() => dispatch(updateCurrentIndex(i))}
          >
            {i + 1}
          </Button>
        ))}
        <Button onClick={() => dispatch(next())}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default LearnArea;
