import { z } from "zod";

export type Word = {
  value: string;
  iso: string;
};

export type Sentence = {
  value: string;
  iso: string;
};



export type Noun = {
  article?: string;
  word: string;
  iso: string;
  fluency: number;
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

type UserSettings = {
  theme: Theme;
  native: LanguageISO;
  languages: LanguageISO[];
};

const Theme = z.enum(["light", "dark", "system"]);
type Theme = z.infer<typeof Theme>;

const LanguageISO = z.enum(["us", "de", "fr", "es", "no", "nl"]);
type LanguageISO = z.infer<typeof LanguageISO>;

type LanguageItem = { id: LanguageISO; label: string };

const SettingsFormSchema = z.object({
  theme: Theme,
  native: LanguageISO,
  languages: z
    .array(LanguageISO)
    .min(2, { message: "You must select at least 2 languages." }),
});

export type { Theme, User, Session, LanguageISO, UserSettings, LanguageItem };

export { SettingsFormSchema };
