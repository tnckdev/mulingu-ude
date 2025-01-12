import AnswerBuilder from "@/components/learn/answer-builder";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectTask,
  selectTaskISO,
  selectTaskISOs,
  updateTaskISO,
} from "@/lib/redux/slices/learn";
import getFlagEmoji from "@/utils/flags";
import clsx from "clsx";

const MultiAnswerBuilder = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) => selectTask(state.learn, index));
  const ISOs = useAppSelector((state) => selectTaskISOs(state.learn, index));
  const taskISO = useAppSelector((state) => selectTaskISO(state.learn, index));

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="font-bold">{task.reference.text}</h1>
      <div className="w-full flex border rounded-lg p-2">
        {ISOs.map((iso) => (
          <Button
            key={`selector-${index}-${iso}`}
            onClick={() => {
              dispatch(updateTaskISO({ index, iso }));
            }}
            className={clsx(
              "w-full bg-background border-none text-xl",
              taskISO === iso && "bg-foreground"
            )}
          >
            {getFlagEmoji(iso)}
          </Button>
        ))}
      </div>
      <AnswerBuilder index={index} iso={taskISO} />
    </div>
  );
};

export default MultiAnswerBuilder;
