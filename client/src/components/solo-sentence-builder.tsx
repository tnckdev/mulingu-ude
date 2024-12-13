import MultiSentenceBuilder from "@/components/multi-sentence-builder";
import { Sentence } from "@/utils/types";

const SoloSentenceBuilder = ({
  original,
  translation,
}: {
  original: Sentence;
  translation: Sentence;
}) => {
  return (
    <>
      <MultiSentenceBuilder
        original={original}
        translations={[translation]}
      />
    </>
  );
};

export default SoloSentenceBuilder;
