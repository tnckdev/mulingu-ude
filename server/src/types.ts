import { z } from "zod";

export type Word = {
  value: string;
  iso: string;
};

export type Category = {
  title: string;
  description?: string;
  wordCount?: number;
};

type User = {
  name: string;
  email: string;
  image: string;
};

type Session = {
  user: User;
  expires: string;
};

const Theme = z.enum(["light", "dark", "system"]);
type Theme = z.infer<typeof Theme>;

const LanguageISOZod = z.enum(["us", "de", "fr", "es", "no", "nl"]);
type LanguageISO = z.infer<typeof LanguageISOZod>;

type LanguageItem = { id: LanguageISO; label: string };

const SettingsFormSchema = z.object({
  theme: Theme,
  native: LanguageISOZod,
  languages: z
    .array(LanguageISOZod)
    .min(2, { message: "You must select at least 2 languages." }),
});

const UserSettingsZod = z.object({
  theme: Theme,
  native: LanguageISOZod,
  languages: z.array(LanguageISOZod),
});
type UserSettings = z.infer<typeof UserSettingsZod>;

const NounZod = z.object({
  id: z.string(),
  language: LanguageISOZod,
  definiteSingularArticle: z.string(),
  indefiniteSingularArticle: z.string(),
  definitePluralArticle: z.string(),
  singular: z.string(),
  plural: z.string(),
  nounGroupId: z.string(),
});
type Noun = z.infer<typeof NounZod>;

const NounGroup = z.object({
  id: z.string(),
  nouns: z.array(NounZod),
});
type NounGroup = z.infer<typeof NounGroup>;

const NounTaskKind = z.enum([
  "definiteSingular",
  "indefiniteSingular",
  "definitePlural",
]);
type NounTaskKind = z.infer<typeof NounTaskKind>;

const SentenceZod = z.object({
  id: z.string(),
  language: LanguageISOZod,
  sentence: z.string(),
  sentenceGroupId: z.string(),
});
type Sentence = z.infer<typeof SentenceZod>;

const SentenceGroup = z.object({
  id: z.string(),
  sentences: z.array(SentenceZod),
});
type SentenceGroup = z.infer<typeof SentenceGroup>;

const Difficulty = z.enum(["EASY", "MEDIUM", "HARD"]);
type Difficulty = z.infer<typeof Difficulty>;

const Answer = z.object({
  text: z.string(),
  solution: z.string(),
  selectedStrings: z.array(z.string()),
  availableStrings: z.array(z.string()),
  difficulty: Difficulty,
});
type Answer = z.infer<typeof Answer>;

const Reference = z.object({
  iso: LanguageISOZod,
  text: z.string(),
});
type Reference = z.infer<typeof Reference>;

const Task = z.object({
  kind: z.enum(["word", "sentence"]),
  reference: Reference,
  answers: z.record(LanguageISOZod, Answer),
  currentISO: LanguageISOZod,
});
type Task = z.infer<typeof Task>;

const VerbForm = z.object({
  id: z.string(),
  numerus: z.enum(["singular", "plural"]),
  persona: z.enum(["first", "second", "third"]),
  tempus: z.enum(["present", "past", "future"]),
  modus: z.enum(["indicative", "subjunctive", "imperative"]),
  value: z.string(),
  verbId: z.string(),
});
type VerbForm = z.infer<typeof VerbForm>;

const VerbZod = z.object({
  id: z.string(),
  language: LanguageISOZod,
  infinitive: z.string(),
  forms: z.array(VerbForm),
});
type Verb = z.infer<typeof VerbZod>;

const VerbGroup = z.object({
  id: z.string(),
  verbs: z.array(VerbZod),
});
type VerbGroup = z.infer<typeof VerbGroup>;

export type {
  Answer,
  Theme,
  User,
  Session,
  LanguageISO,
  UserSettings,
  LanguageItem,
  Noun,
  NounGroup,
  NounTaskKind,
  Task,
  Reference,
  Sentence,
  SentenceGroup,
  Verb,
  VerbForm,
  VerbGroup,
  Difficulty,
};

export {
  SettingsFormSchema,
  LanguageISOZod,
  VerbZod,
  SentenceZod,
  NounZod,
  UserSettingsZod,
};
