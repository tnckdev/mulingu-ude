import { shuffled } from "@/utils/fisher-yates";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import clsx from "clsx";
import { Correctness } from "@/utils/correctness";
import { Sentence } from "@/utils/types";

const SentenceBuilder = ({ sentence }: { sentence: Sentence }) => {
  const words = splitSentence(sentence.value);

  const initShuffled = shuffled(words);

  const [availableWords, setAvailableWords] = useState<string[]>(initShuffled);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const [correctness, setCorrectness] = useState<Correctness>(
    Correctness.UNEDITED
  );

  const addSelectedWord = (index: number) => {
    setSelectedWords([...selectedWords, availableWords[index]]);
    const filteredAvailables = availableWords.filter((_, i) => i !== index);
    setAvailableWords(filteredAvailables);
  };

  const removeSelectedWord = (index: number) => {
    setAvailableWords([...availableWords, selectedWords[index]]);
    const filteredSelecteds = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(filteredSelecteds);
  };

  const isCorrectSelection = (): boolean => {
    if (words.length != selectedWords.length) {
      return false;
    }
    for (let i = 0; i < words.length; i++) {
      if (words[i] != selectedWords[i]) {
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
              {selectedWords.map((word, index) => (
                <Button
                  key={`selected-${index}`}
                  onClick={() => removeSelectedWord(index)}
                  className="h-10 font-mono"
                >
                  {word}
                </Button>
              ))}
            </div>
            <div className="flex w-full flex-wrap gap-2 items-center justify-center min-h-10 max-w-full">
              {availableWords.map((word, index) => (
                <Button
                  key={`available-${index}`}
                  onClick={() => addSelectedWord(index)}
                  variant="outline"
                  className="h-10 font-mono"
                >
                  {word}
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
};

const splitSentence = (sentence: string) => {
  return sentence.split(" ");
};

export default SentenceBuilder;
