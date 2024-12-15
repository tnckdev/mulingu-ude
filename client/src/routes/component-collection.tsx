import MultiSentenceBuilder from "@/components/multi-sentence-builder";
import MultiWordBuilder from "@/components/multi-word-builder";
import SentenceBuilder from "@/components/sentence-builder";
import SoloSentenceBuilder from "@/components/solo-sentence-builder";
import SoloWordBuilder from "@/components/solo-word-builder";
import WordBuilder from "@/components/word-builder";
//@ts-ignore
import Foo from "@/components/foo";
import WordWriter from "@/components/word-writer";
import MultiWordWriter from "@/components/multi-word-writer";
import MultiSentenceWriter from "@/components/multi-sentence-writer";
import CategoryCard from "@/components/category-card";

export default function ComponentCollection() {
  return (
    <div className="w-full flex flex-col gap-52">
      <div>
        <p>word-builder.tsx</p>
        <WordBuilder
          word={{
            value:
              "Rinderkennzeichnungsfleischetikettierungsüberwachungsaufgabenübertragungsgesetz",
            iso: "DE",
          }}
        />
      </div>
      <div>
        <p>solo-word-builder.tsx</p>
        <SoloWordBuilder
          original={{ value: "das Haus", iso: "DE" }}
          translation={{ value: "the house", iso: "US" }}
        />
      </div>
      <div>
        <p>multi-word-builder.tsx</p>
        <MultiWordBuilder
          original={{ value: "der Mann", iso: "DE" }}
          translations={[
            { value: "the man", iso: "US" },
            { value: "den mann", iso: "NO" },
            { value: "le homme", iso: "FR" },
            { value: "el hombre", iso: "ES" },
          ]}
        />
      </div>
      <div>
        <p>sentence-builder.tsx</p>
        <SentenceBuilder
          sentence={{
            value: "The quick brown fox jumps over the lazy dog",
            iso: "US",
          }}
        />
      </div>
      <div>
        <p>solo-sentence-builder.tsx</p>
        <SoloSentenceBuilder
          original={{
            value: "The quick brown fox jumps over the lazy dog",
            iso: "US",
          }}
          translation={{
            value: "Der schnelle braune Fuchs springt über den faulen Hund",
            iso: "DE",
          }}
        />
      </div>
      <div>
        <p>multi-sentence-builder.tsx</p>
        <MultiSentenceBuilder
          original={{
            value: "The man runs",
            iso: "US",
          }}
          translations={[
            {
              value: "Der Mann rennt",
              iso: "US",
            },
            {
              value: "Mannen løper",
              iso: "NO",
            },
            {
              value: "L'homme court",
              iso: "DE",
            },
            { value: "El hombre corre", iso: "ES" },
          ]}
        />
      </div>
      {/* <Foo /> */}
      <div>
        <p>word-writer.tsx</p>
        <WordWriter
          word={{
            value: "das Haus",
            iso: "DE",
          }}
        />
      </div>
      <div className="w-full">
        <p>multi-word-writer.tsx</p>
        <MultiWordWriter
          original={{ value: "der Mann", iso: "DE" }}
          translations={[
            { value: "the man", iso: "US" },
            { value: "den mann", iso: "NO" },
            { value: "le homme", iso: "FR" },
            { value: "el hombre", iso: "ES" },
          ]}
        />
      </div>
      <div>
        <p>multi-sentence-builder.tsx</p>
        <MultiSentenceWriter
          original={{
            value: "The man runs",
            iso: "US",
          }}
          translations={[
            {
              value: "Der Mann rennt",
              iso: "US",
            },
            {
              value: "Mannen løper",
              iso: "NO",
            },
            {
              value: "L'homme court",
              iso: "DE",
            },
            { value: "El hombre corre", iso: "ES" },
          ]}
        />
      </div>
      <div>
        <CategoryCard
          category={{
            title: "Forest",
            description:
              "The forest is a peaceful place filled with tall trees, chirping birds, and rustling leaves.	You can find animals like deer, foxes, and squirrels living in the forest. Walking through a forest is a great way to enjoy fresh air and connect with nature.",
            wordCount: 42,
          }}
        />
      </div>
    </div>
  );
}
