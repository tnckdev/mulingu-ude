import { Learnable, Sentence, Word } from "@/utils/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MultiWordBuilder from "./multi-word-builder";

export default function LearnBox({
  learnables,
}: {
  learnables: Learnable<Word | Sentence>[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLearnable, setCurrentLearnable] =
    useState<Learnable<Word | Sentence>>(learnables[0]);

  useEffect(() => {
    setCurrentLearnable(learnables[currentIndex]);
  }, [currentIndex]);

  return (
    <div className="w-full flex flex-col gap-5">
      <p>
        {currentIndex + 1} of {learnables.length}
      </p>
      <MultiWordBuilder
        original={currentLearnable?.original}
        translations={currentLearnable?.translations}
      />

      <div className="flex flex-auto justify-center">
        <div className="flex flex-row gap-3">
          <Button
            onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
          >
            <ArrowLeft />
          </Button>
          <div className="flex gap-1">
            {learnables.map((_, index) => (
              <Button
                className="aspect-square"
                onClick={() => setCurrentIndex(index)}
                variant={"outline"}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            onClick={() =>
              setCurrentIndex(Math.min(currentIndex + 1, learnables.length - 1))
            }
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
