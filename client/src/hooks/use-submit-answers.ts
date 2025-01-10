import { useSession } from "@/components/providers/session-provider";
import { useAppSelector } from "@/hooks/redux";
import { selectTasks } from "@/lib/redux/slices/learn";
import { LanguageISO } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useSubmitAnswers = () => {
  const [submitted, setSubmitted] = useState<boolean | undefined>();
  const [allTasksCompleted, setAllTasksCompleted] = useState<boolean>(false);
  const tasks = useAppSelector(selectTasks);
  const session = useSession();

  useEffect(() => {
    const answers = getTransformedAnswers();
    setAllTasksCompleted(answers.every((answer) => answer.answer !== ""));
  }, [tasks]);

  const getTransformedAnswers = () => {
    return tasks
      .map((task) => {
        const keys = Object.keys(task.answers) as LanguageISO[];
        return keys.map((key) => {
          const language = key;
          const answer = task.answers[key]!.text;
          const solution = task.answers[key]!.solution;

          return {
            language,
            answer,
            solution,
          };
        });
      })
      .flat();
  };

  const submitAnswers = async () => {
    const transformedAnswers = getTransformedAnswers();

    const body = {
      email: session.session?.user.email,
      answers: transformedAnswers,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/learn/grade`,
        body,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setSubmitted(true);
      } else {
        setSubmitted(false);
      }
    } catch (error) {
      setSubmitted(false);
       console.error(error);
    }
  };

  return { submitAnswers, submitted, allTasksCompleted };
};

export default useSubmitAnswers;
