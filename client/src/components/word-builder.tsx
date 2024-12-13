import { useState } from "react";
import { Button } from "@/components/ui/button";
import { shuffled } from "@/utils/fisher-yates";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Correctness } from "@/utils/correctness";
import clsx from "clsx";
import { Word } from "@/utils/types";

export default function WordBuilder({ word }: { word: Word }) {
  const letters = splitWord(word.value);

  const initShuffled = shuffled(letters);

  const [availableLetters, setAvailableLetters] =
    useState<string[]>(initShuffled);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const [correctness, setCorrectness] = useState<Correctness>(
    Correctness.UNEDITED
  );

  const addSelectedLetter = (index: number) => {
    setSelectedLetters([...selectedLetters, availableLetters[index]]);
    const filteredAvailables = availableLetters.filter((_, i) => i !== index);
    setAvailableLetters(filteredAvailables);
  };

  const removeSelectedLetter = (index: number) => {
    setAvailableLetters([...availableLetters, selectedLetters[index]]);
    const filteredSelecteds = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(filteredSelecteds);
  };

  const isCorrectSelection = (): boolean => {
    if (letters.length != selectedLetters.length) {
      return false;
    }
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] != selectedLetters[i]) {
        return false;
      }
    }
    return true;
  };

  const checkResult = () => {
    if (isCorrectSelection()) {
      setCorrectness(Correctness.CORRECT);
      alert("Correct");
    } else {
      setCorrectness(Correctness.INCORRECT);
      alert("Incorrect");
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-5 items-center justify-items-center p-5">
            <div className="flex flex-wrap gap-2 w-full items-center justify-center min-h-10">
              {selectedLetters.map((letter, index) => (
                <Button
                  key={`selected-${index}`}
                  onClick={() => removeSelectedLetter(index)}
                  className="h-10 min-w-10 font-mono"
                >
                  {letter}
                </Button>
              ))}
            </div>
            <div className="flex w-full flex-wrap gap-2 items-center justify-center min-h-10 max-w-full">
              {availableLetters.map((letter, index) => (
                <Button
                  key={`available-${index}`}
                  onClick={() => addSelectedLetter(index)}
                  variant="outline"
                  className="h-10 min-w-10 font-mono"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>
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
}

const splitWord = (word: string) => {
  return word.split("");
};
