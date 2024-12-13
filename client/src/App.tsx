import "./App.css";
import WordBuilder from "./components/word-builder";
import SentenceBuilder from "./components/sentence-builder";
import SoloWordBuilder from "./components/solo-word-builder";
import MultiWordBuilder from "./components/multi-word-builder";
import SoloSentenceBuilder from "./components/solo-sentence-builder";
import MultiSentenceBuilder from "./components/multi-sentence-builder";

function App() {
  return (
    <>
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
      </div>
    </>
  );
}

export default App;
