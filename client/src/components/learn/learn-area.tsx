import MultiAnswerBuilder from "@/components/learn/multi-answer-builder";
import TaskSubmissionButton from "@/components/learn/task-submission-button";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  next,
  prev,
  selectCurrentIndex,
  selectTaskAmount,
  updateCurrentIndex,
} from "@/lib/redux/slices/learn";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

const LearnArea = () => {
  const dispatch = useAppDispatch();

  const amount = useAppSelector(selectTaskAmount);

  const currentIndex = useAppSelector(selectCurrentIndex) || 0;

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
      <TaskSubmissionButton />
    </div>
  );
};

export default LearnArea;
