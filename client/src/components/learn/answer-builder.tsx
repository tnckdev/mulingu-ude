import ComplexAnswerBuilder from "@/components/learn/complex-answer-builder";
import SimpleAnswerBuilder from "@/components/learn/simple-answer-builder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectDifficulty,
  selectShowingSolution,
  updateDifficulty,
} from "@/lib/redux/slices/learn";
import { LanguageISO } from "@/utils/types";
import SolutionCard from "@/components/learn/solution-card";

const AnswerBuilder = ({ index, iso }: { index: number; iso: LanguageISO }) => {
  const dispatch = useAppDispatch();

  const showingSolution = useAppSelector(selectShowingSolution);

  const difficulty = useAppSelector((state) =>
    selectDifficulty(state.learn, { index, iso })
  );

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col p-5 gap-5">
        {difficulty === "EASY" ? (
          <ComplexAnswerBuilder index={index} iso={iso} />
        ) : (
          <SimpleAnswerBuilder index={index} iso={iso} />
        )}
        {showingSolution && <SolutionCard index={index} iso={iso} />}
      </CardContent>
      <CardFooter className="w-full justify-center">
        {difficulty === "HARD" && !showingSolution && (
          <Button
            onClick={() =>
              dispatch(updateDifficulty({ index, iso, difficulty: "EASY" }))
            }
          >
            Easier
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AnswerBuilder;
