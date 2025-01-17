import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addSelectedString,
  removeSelectedString,
  selectAvailableStrings,
  selectKind,
  selectSelectedStrings,
  selectShowingSolution,
  selectSolution,
  updateAvailableStrings,
  updateTaskAnswerText,
} from "@/lib/redux/slices/learn";
import { shuffled } from "@/utils/fisher-yates";
import { LanguageISO } from "@/utils/types";
import { useEffect } from "react";

const ComplexAnswerBuilder = ({
  index,
  iso,
}: {
  index: number;
  iso: LanguageISO;
}) => {
  const dispatch = useAppDispatch();

  const kind = useAppSelector((state) => selectKind(state.learn, index));

  const solution = useAppSelector((state) =>
    selectSolution(state.learn, { index, iso })
  );

  const showingSolution = useAppSelector(selectShowingSolution);

  const availableStrings =
    useAppSelector((state) =>
      selectAvailableStrings(state.learn, { index, iso })
    ) || [];

  const selectedStrings =
    useAppSelector((state) =>
      selectSelectedStrings(state.learn, { index, iso })
    ) || [];

  useEffect(() => {
    const solutionLength = solution.split(kind === "word" ? "" : " ").length;

    if (
      availableStrings.length === 0 &&
      selectedStrings.length !== solutionLength
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStrings]);

  useEffect(() => {
    const text = selectedStrings.join(kind === "word" ? "" : " ");
    dispatch(updateTaskAnswerText({ index, iso, text }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStrings]);

  return (
    <div className="flex flex-col gap-5 items-center justify-items-center p-5">
      <div className="flex flex-wrap gap-2 w-full items-center justify-center min-h-10">
        {selectedStrings.map((str, i) => (
          <Button
            disabled={showingSolution}
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
            disabled={showingSolution}
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
