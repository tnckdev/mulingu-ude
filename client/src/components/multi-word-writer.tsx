import getFlagEmoji from "@/utils/flags";
import { Word } from "@/utils/types";
import WordWriter from "./word-writer";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import clsx from "clsx";

const MultiWordWriter = ({
  original,
  translations,
}: {
  original: Word;
  translations: Word[];
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTranslation, setCurrentTranslation] = useState<Word>(
    translations[0]
  );

  useEffect(() => {
    console.log(translations[currentIndex]);
    
    setCurrentTranslation(translations[currentIndex]);
  }, [currentIndex]);

  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <h1 className="font-bold">{original.value}</h1>
        <div className="w-full flex border rounded-xl p-2">
          {translations.map((translation, index) => (
            <Button
              className={clsx(
                "w-full bg-background border-none text-xl",
                currentIndex === index && "bg-foreground"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              {getFlagEmoji(translation.iso)}
            </Button>
          ))}
        </div>
        <WordWriter word={currentTranslation}></WordWriter>
      </div>
    </>
  );
};

export default MultiWordWriter;
