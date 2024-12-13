import MultiWordBuilder from "@/components/multi-word-builder";
import { Word } from "@/utils/types";

const SoloWordBuilder = ({
  original,
  translation,
}: {
  original: Word;
  translation: Word;
}) => {
  return (
    <>
      <MultiWordBuilder
        original={original}
        translations={[translation]}
      />
    </>
  );
};

export default SoloWordBuilder;
