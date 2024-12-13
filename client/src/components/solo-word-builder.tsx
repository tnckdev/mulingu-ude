import MultiWordBuilder from "@/components/multi-word-builder";
import { Word } from "@/utils/types";

export default function SoloWordBuilder({
  original,
  translation,
}: {
  original: Word;
  translation: Word;
}) {
  return (
    <>
      <MultiWordBuilder
        original={original}
        translations={[translation]}
      />
    </>
  );
}
