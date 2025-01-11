import { useAppSelector } from "@/hooks/redux";
import { selectSolution, selectText } from "@/lib/redux/slices/learn";
import { LanguageISO } from "@/utils/types";
import clsx from "clsx";
import { useEffect, useState } from "react";

const SolutionCard = ({ index, iso }: { index: number; iso: LanguageISO }) => {
  const solution = useAppSelector((state) =>
    selectSolution(state.learn, { index, iso })
  );

  const text = useAppSelector((state) =>
    selectText(state.learn, { index, iso })
  );

  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(solution == text);
  }, [solution, text]);

  return (
    <div>
      <div
        className={clsx(
          "border w-full rounded-lg p-5",
          isCorrect
            ? "border-green-500 bg-green-500/10"
            : "border-red-500 bg-red-500/10"
        )}
      >
        <p>{solution}</p>
      </div>
    </div>
  );
};

export default SolutionCard;
