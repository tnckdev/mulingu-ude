import LearnBox from "@/components/learn-box";

export default function Learn() {
  return (
    <div className="w-full items-center">
      <LearnBox
        learnables={[
          {
            original: { value: "der Mann", iso: "DE" },
            translations: [
              { value: "the man", iso: "US" },
              { value: "den mann", iso: "NO" },
              { value: "le homme", iso: "FR" },
              { value: "el hombre", iso: "ES" },
            ],
          },
          {
            original: { value: "der Mann", iso: "DE" },
            translations: [
              { value: "the man", iso: "US" },
              { value: "den mann", iso: "NO" },
              { value: "le homme", iso: "FR" },
              { value: "el hombre", iso: "ES" },
            ],
          },
          {
            original: { value: "der Mann", iso: "DE" },
            translations: [
              { value: "the man", iso: "US" },
              { value: "den mann", iso: "NO" },
              { value: "le homme", iso: "FR" },
              { value: "el hombre", iso: "ES" },
            ],
          },
        ]}
      />
    </div>
  );
}
