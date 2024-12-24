import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import {
  next,
  prev,
  selectCurrentIndex,
  selectTaskAmount,
  updateCurrentIndex,
} from "@/utils/redux/learnSlice";
import MultiAnswerBuilder from "./multi-answer-builder";
import { Button } from "../ui/button";
import clsx from "clsx";

const LearnArea = () => {
  const dispatch = useAppDispatch();

  const amount = useAppSelector(selectTaskAmount);

  const currentIndex = useAppSelector(selectCurrentIndex) || 0;

  return (
    <div className="w-full flex flex-col gap-3">
      <MultiAnswerBuilder index={currentIndex} />
      <div className="flex w-full justify-center gap-2">
        <Button onClick={() => dispatch(prev())}>Previous</Button>
        {Array.from({ length: amount }).map((_, i) => (
          <Button
            key={i}
            className={clsx(
              "aspect-square bg-foreground text-background",
              currentIndex == i && "bg-background text-foreground"
            )}
            onClick={() => dispatch(updateCurrentIndex(i))}
          >
            {i + 1}
          </Button>
        ))}
        <Button onClick={() => dispatch(next())}>Next</Button>
      </div>
    </div>
  );
};

export default LearnArea;
