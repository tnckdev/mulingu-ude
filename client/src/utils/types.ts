import { z } from "zod";

type User = {
  name: string;
  email: string;
  image: string;
};

type Session = {
  user: User;
  expires: string;
};

const ThemeZ = z.enum(["light", "dark", "system"]);
type Theme = z.infer<typeof ThemeZ>;

const LanguageISOZ = z.enum(["us", "de", "fr", "es", "no"]);
type LanguageISO = z.infer<typeof LanguageISOZ>;

type LanguageItem = { id: LanguageISO; label: string };

const SettingsFormSchema = z.object({
  theme: ThemeZ,
  native: LanguageISOZ,
  languages: z
    .array(LanguageISOZ)
    .min(2, { message: "You must select at least 2 languages." }),
});

const UserSettingsZ = z.object({
  theme: ThemeZ,
  native: LanguageISOZ,
  languages: z.array(LanguageISOZ),
});
type UserSettings = z.infer<typeof UserSettingsZ>;

const RatingLanguageZ = z.union([LanguageISOZ, z.literal("total")]);
type RatingLanguage = z.infer<typeof RatingLanguageZ>;

// v2

const SolutionZ = z.string().min(1);
type Solution = z.infer<typeof SolutionZ>;

const SolutionAggregationZ = z.object({
  solutions: z.record(LanguageISOZ, SolutionZ),
});
type SolutionAggregation = z.infer<typeof SolutionAggregationZ>;

const DifficultyZ = z.enum(["EASY", "MEDIUM", "HARD"]);
type Difficulty = z.infer<typeof DifficultyZ>;

const AnswerZ = z.object({
  text: z.string(),
  solution: z.string(),
  selectedStrings: z.array(z.string()),
  availableStrings: z.array(z.string()),
  difficulty: DifficultyZ,
});
type Answer = z.infer<typeof AnswerZ>;

const ReferenceZ = z.object({
  iso: LanguageISOZ,
  text: z.string(),
});
type Reference = z.infer<typeof ReferenceZ>;

const TaskZ = z.object({
  kind: z.enum(["word", "sentence"]),
  reference: ReferenceZ,
  answers: z.record(LanguageISOZ, AnswerZ),
  currentISO: LanguageISOZ,
});
type Task = z.infer<typeof TaskZ>;

const NumerusZ = z.enum(["singular", "plural"]);
type Numerus = z.infer<typeof NumerusZ>;

const NumerusPersonZ = z.enum(["first", "second", "third"]);
type NumerusPerson = z.infer<typeof NumerusPersonZ>;

// v2 Verbs
const VerbFormTenseZ = z.enum(["present", "preterite", "perfect", "future"]);
type VerbFormTense = z.infer<typeof VerbFormTenseZ>;

const VerbTaskKindZ = z.union([z.literal("infinitive"), VerbFormTenseZ]);
type VerbTaskKind = z.infer<typeof VerbTaskKindZ>;

const VerbFormZ = z.object({
  form: VerbFormTenseZ,

  firstPersonSingular: z.string(),
  secondPersonSingular: z.string(),
  thirdPersonSingular: z.string(),

  firstPersonPlural: z.string(),
  secondPersonPlural: z.string(),
  thirdPersonPlural: z.string(),
});
type VerbForm = z.infer<typeof VerbFormZ>;

const StandardVerbZ = z.object({
  infinitive: z.string(),
  forms: z.array(VerbFormZ),
});
type StandardVerb = z.infer<typeof StandardVerbZ>;

const GermanVerbZ = z.object({}).merge(StandardVerbZ);
type GermanVerb = z.infer<typeof GermanVerbZ>;

const EnglishVerbZ = z.object({}).merge(StandardVerbZ);
type EnglishVerb = z.infer<typeof EnglishVerbZ>;

const SpanishVerbZ = z.object({}).merge(StandardVerbZ);
type SpanishVerb = z.infer<typeof SpanishVerbZ>;

const FrenchVerbZ = z.object({}).merge(StandardVerbZ);
type FrenchVerb = z.infer<typeof FrenchVerbZ>;

const NorwegianVerbZ = z.object({
  infinitive: z.string(),

  present: z.string(),
  preterite: z.string(),
  perfect: z.string(),
  future: z.string(),
});
type NorwegianVerb = z.infer<typeof NorwegianVerbZ>;

const VerbAggregationZ = z.object({
  de: GermanVerbZ,
  us: EnglishVerbZ,
  es: SpanishVerbZ,
  fr: FrenchVerbZ,
  no: NorwegianVerbZ,
});
type VerbAggregation = z.infer<typeof VerbAggregationZ>;

// v2 Nouns
const NounTaskKindZ = z.enum([
  "definiteSingular",
  "indefiniteSingular",
  "definitePlural",
]);
type NounTaskKind = z.infer<typeof NounTaskKindZ>;

const BasicNounZ = z.object({
  singular: z.string(),
  plural: z.string(),
});
type BasicNoun = z.infer<typeof BasicNounZ>;

const GermanNounZ = z
  .object({
    indefiniteSingularArticle: z.string(),
    definiteSingularArticle: z.string(),
    definitePluralArticle: z.string(),
  })
  .merge(BasicNounZ);
type GermanNoun = z.infer<typeof GermanNounZ>;

const EnglishNounZ = z
  .object({
    indefiniteSingularArticle: z.string(),
  })
  .merge(BasicNounZ);

type EnglishNoun = z.infer<typeof EnglishNounZ>;

const SpanishNounZ = z
  .object({
    indefiniteSingularArticle: z.string(),
    definiteSingularArticle: z.string(),
    indefinitePluralArticle: z.string(),
    definitePluralArticle: z.string(),
  })
  .merge(BasicNounZ);
type SpanishNoun = z.infer<typeof SpanishNounZ>;

const FrenchNounZ = z
  .object({
    indefiniteSingularArticle: z.string(),
    definiteSingularArticle: z.string(),
  })
  .merge(BasicNounZ);
type FrenchNoun = z.infer<typeof FrenchNounZ>;

const NorwegianNounZ = z
  .object({
    indefiniteSingularArticle: z.string(),
    definiteSingular: z.string(),
    definitePlural: z.string(),
  })
  .merge(BasicNounZ);
type NorwegianNoun = z.infer<typeof NorwegianNounZ>;

const NounAggregationZ = z.object({
  //   id: z.string(),
  de: GermanNounZ,
  us: EnglishNounZ,
  es: SpanishNounZ,
  fr: FrenchNounZ,
  no: NorwegianNounZ,
});
type NounAggregation = z.infer<typeof NounAggregationZ>;

// v2 Sentences
const StandardSetenceZ = z.object({
  sentence: z.string(),
});
type StandardSentence = z.infer<typeof StandardSetenceZ>;

const GermanSentenceZ = z.object({}).merge(StandardSetenceZ);
type GermanSentence = z.infer<typeof GermanSentenceZ>;

const EnglishSentenceZ = z.object({}).merge(StandardSetenceZ);
type EnglishSentence = z.infer<typeof EnglishSentenceZ>;

const SpanishSentenceZ = z.object({}).merge(StandardSetenceZ);
type SpanishSentence = z.infer<typeof SpanishSentenceZ>;

const FrenchSentenceZ = z.object({}).merge(StandardSetenceZ);
type FrenchSentence = z.infer<typeof FrenchSentenceZ>;

const NorwegianSentenceZ = z.object({}).merge(StandardSetenceZ);
type NorwegianSentence = z.infer<typeof NorwegianSentenceZ>;

const SentenceAggregationZ = z.object({
  de: GermanSentenceZ,
  us: EnglishSentenceZ,
  es: SpanishSentenceZ,
  fr: FrenchSentenceZ,
  no: NorwegianSentenceZ,
});
type SentenceAggregation = z.infer<typeof SentenceAggregationZ>;

export type {
  Solution,
  SolutionAggregation,
  Difficulty,
  Answer,
  Reference,
  Task,
  Numerus,
  NumerusPerson,
};

export {
  SolutionZ,
  SolutionAggregationZ,
  DifficultyZ,
  AnswerZ,
  ReferenceZ,
  TaskZ,
  NumerusZ,
  NumerusPersonZ,
};

// verb exports
export type {
  VerbFormTense,
  VerbTaskKind,
  VerbForm,
  StandardVerb,
  GermanVerb,
  EnglishVerb,
  SpanishVerb,
  FrenchVerb,
  NorwegianVerb,
  VerbAggregation,
};

export {
  VerbFormTenseZ,
  VerbTaskKindZ,
  VerbFormZ,
  StandardVerbZ,
  GermanVerbZ,
  EnglishVerbZ,
  SpanishVerbZ,
  FrenchVerbZ,
  NorwegianVerbZ,
  VerbAggregationZ,
};

// noun exports
export type {
  NounTaskKind,
  BasicNoun,
  GermanNoun,
  EnglishNoun,
  SpanishNoun,
  FrenchNoun,
  NorwegianNoun,
  NounAggregation,
};

export {
  NounTaskKindZ,
  BasicNounZ,
  GermanNounZ,
  EnglishNounZ,
  SpanishNounZ,
  FrenchNounZ,
  NorwegianNounZ,
  NounAggregationZ,
};

// sentence exports
export type {
  GermanSentence,
  EnglishSentence,
  SpanishSentence,
  FrenchSentence,
  NorwegianSentence,
  StandardSentence,
  SentenceAggregation,
};

export {
  GermanSentenceZ,
  EnglishSentenceZ,
  SpanishSentenceZ,
  FrenchSentenceZ,
  NorwegianSentenceZ,
  StandardSetenceZ,
  SentenceAggregationZ,
};

export type {
  Theme,
  User,
  Session,
  LanguageISO,
  UserSettings,
  LanguageItem,
  RatingLanguage,
};

export {
  SettingsFormSchema,
  LanguageISOZ,
  UserSettingsZ,
  RatingLanguageZ,
  ThemeZ,
};
