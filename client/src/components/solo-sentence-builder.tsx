import MultiSentenceBuilder from "@/components/multi-sentence-builder";
import { Sentence } from "@/utils/types";

export default function SoloSentenceBuilder({
  original,
  translation,
}: {
  original: Sentence;
  translation: Sentence;
}) {
  return (
    <>
      <MultiSentenceBuilder
        original={original}
        translations={[translation]}
      />
    </>
  );
}
