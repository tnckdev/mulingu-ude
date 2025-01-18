import NounDictionary from "@/components/dictionary/noun-dictionary";
import VerbDictionary from "@/components/dictionary/verb-dictionary";
import { Button } from "@/components/ui/button";
import getFlagEmoji from "@/utils/flags";
import { LanguageISO } from "@/utils/types";
import { useState } from "react";

const DictionaryTable = () => {
  const isos: LanguageISO[] = ["us", "de", "es", "fr", "no"];
  type DictionaryType = "noun" | "verb";
  const dictionaries: DictionaryType[] = ["noun", "verb"];

  const [currentISO, setCurrentISO] = useState<LanguageISO>("us");
  const [currentDictionary, setCurrentDictionary] =
    useState<DictionaryType>("noun");

  return (
    <div className="w-full min h-screen pt-14 flex flex-col items-center justify-start gap-5">
      <p className="text-7xl font-bold">Dictionary</p>
      <div className="w-9/12 flex flex-col items-center gap-5">
        <p>Kind</p>
        <div className="w-full flex border rounded-xl p-2">
          {dictionaries.map((dictionary) => (
            <Button
              key={dictionary}
              variant={dictionary === currentDictionary ? "default" : "outline"}
              className="w-full"
              onClick={() => setCurrentDictionary(dictionary)}
            >
              {dictionary.toLocaleUpperCase()}
            </Button>
          ))}
        </div>
        <p>Language</p>
        <div className="w-full flex border rounded-xl p-2">
          {isos.map((iso) => (
            <Button
              onClick={() => setCurrentISO(iso)}
              key={iso}
              variant={iso === currentISO ? "default" : "outline"}
              className="w-full"
            >
              {getFlagEmoji(iso)}
            </Button>
          ))}
        </div>

        {currentDictionary === "noun" && (
          <NounDictionary iso={currentISO} start={0} />
        )}
        {currentDictionary === "verb" && (
          <VerbDictionary iso={currentISO} start={0} />
        )}
      </div>
    </div>
  );
};

export default DictionaryTable;
