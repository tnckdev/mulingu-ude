import getFlagEmoji from "@/utils/flags";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Word } from "@/utils/types";
import SentenceWriter from "./sentence-writer";

const MultiSentenceWriter = ({
  original,
  translations,
}: {
  original: Word;
  translations: Word[];
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <h1 className="font-bold">{original.value}</h1>
        <Tabs defaultValue="0">
          <TabsList className="w-full">
            {translations.map((translation, index) => (
              <TabsTrigger
                value={index.toString()}
                className="w-full"
              >
                {getFlagEmoji(translation.iso)}
              </TabsTrigger>
            ))}
          </TabsList>
          {translations.map((translation, index) => (
            <TabsContent value={index.toString()}>
              <SentenceWriter sentence={translation} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default MultiSentenceWriter;
