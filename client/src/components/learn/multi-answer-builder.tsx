import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import {
  selectAnswer,
  selectCurrentISO,
  selectISOs,
  updateCurrentISO,
} from "@/utils/redux/learnSlice";
import AnswerBuilder from "./answer-builder";
import { Button } from "../ui/button";
import getFlagEmoji from "@/utils/flags";
import clsx from "clsx";

const MultiAnswerBuilder = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();

  const answer = useAppSelector((state) => selectAnswer(state.learn, index));
  const ISOs = useAppSelector((state) => selectISOs(state.learn, index));
  const currentISO = useAppSelector((state) =>
    selectCurrentISO(state.learn, index)
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="font-bold">{answer.languages[ISOs[0]].solution}</h1>
      <div className="w-full flex border rounded-xl p-2">
        {ISOs.map((iso) => (
          <Button
            key={`selector-${index}-${iso}`}
            onClick={() => {
              dispatch(updateCurrentISO({ index, iso }));
            }}
            className={clsx(
              "w-full bg-background border-none text-xl",
              currentISO === iso && "bg-foreground"
            )}
          >
            {getFlagEmoji(iso)}
          </Button>
        ))}
      </div>
      <AnswerBuilder index={index} iso={currentISO} />
    </div>
  );
};

export default MultiAnswerBuilder;
