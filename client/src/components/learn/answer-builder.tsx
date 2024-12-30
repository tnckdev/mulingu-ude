import ComplexAnswerBuilder from "./complex-answer-builder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SimpleAnswerBuilder from "./simple-answer-builder";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  Difficulty,
  selectDifficulty,
  updateDifficulty,
} from "@/utils/redux/learnSlice";

const AnswerBuilder = ({ index, iso }: { index: number; iso: string }) => {
  const dispatch = useAppDispatch();

  const difficulty = useAppSelector((state) =>
    selectDifficulty(state.learn, { index, iso })
  );

  return (
    <Card className="w-full">
      <CardContent className="p-5">
        {difficulty === Difficulty.EASY ? (
          <ComplexAnswerBuilder index={index} iso={iso} />
        ) : (
          <SimpleAnswerBuilder index={index} iso={iso} />
        )}
      </CardContent>
      <CardFooter className="w-full justify-center">
        {difficulty === Difficulty.HARD && (
          <Button
            onClick={() =>
              dispatch(
                updateDifficulty({ index, iso, difficulty: Difficulty.EASY })
              )
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
