import { Word } from "@/utils/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import { Input } from "./ui/input";
import { Correctness } from "@/utils/correctness";
import { Button } from "./ui/button";
import clsx from "clsx";

const WordWriter = ({ word }: { word: Word }) => {
  const [answer, setAnswer] = useState<string>("");
  const [correctness, setCorrectness] = useState<Correctness>(
    Correctness.UNEDITED
  );

  const checkResult = () => {
    if (word.value === answer) {
      setCorrectness(Correctness.CORRECT);
      alert("Correct");
    } else {
      setCorrectness(Correctness.INCORRECT);
      alert("Incorrect");
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="flex justify-center">
          <Input
            placeholder="Your answer is..."
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="mt-10 w-1/2"
          />
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            className={clsx(
              "",
              correctness == Correctness.CORRECT && "bg-green-400",
              correctness == Correctness.INCORRECT && "bg-red-400"
            )}
            onClick={checkResult}
          >
            Check
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default WordWriter;
