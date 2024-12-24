import { shuffled } from "@/utils/fisher-yates";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import {
  addSelectedString,
  removeSelectedString,
  selectAvailableStrings,
  selectKind,
  selectSelectedStrings,
  selectSolution,
  updateAvailableStrings,
} from "@/utils/redux/learnSlice";
import { Button } from "../ui/button";
import { useEffect } from "react";

const ComplexAnswerBuilder = ({
  index,
  iso,
}: {
  index: number;
  iso: string;
}) => {
  const dispatch = useAppDispatch();

  const kind = useAppSelector((state) => selectKind(state.learn, index));

  const solution = useAppSelector((state) =>
    selectSolution(state.learn, { index, iso })
  );

  const availableStrings =
    useAppSelector((state) =>
      selectAvailableStrings(state.learn, { index, iso })
    ) || [];

  const selectedStrings =
    useAppSelector((state) =>
      selectSelectedStrings(state.learn, { index, iso })
    ) || [];

  useEffect(() => {
    if (
      availableStrings.length === 0 &&
      selectedStrings.length !== solution.length
    ) {
      const strings = solution.split(kind === "word" ? "" : " ");
      dispatch(
        updateAvailableStrings({
          index,
          iso,
          availableStrings: shuffled(strings),
        })
      );
    }
  }, [
    availableStrings.length,
    dispatch,
    index,
    iso,
    kind,
    selectedStrings.length,
    solution,
  ]);

  return (
    <div className="flex flex-col gap-5 items-center justify-items-center p-5">
      <div className="flex flex-wrap gap-2 w-full items-center justify-center min-h-10">
        {selectedStrings.map((str, i) => (
          <Button
            key={`selected-${i}`}
            onClick={() =>
              dispatch(removeSelectedString({ index, iso, strIndex: i }))
            }
            className="h-10 min-w-10 font-mono"
          >
            {str}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 w-full items-center justify-center min-h-10">
        {availableStrings.map((str, i) => (
          <Button
            key={`selected-${i}`}
            onClick={() =>
              dispatch(addSelectedString({ index, iso, strIndex: i }))
            }
            className="h-10 min-w-10 font-mono"
            variant="outline"
          >
            {str}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ComplexAnswerBuilder;
