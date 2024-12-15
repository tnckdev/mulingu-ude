export type Word = {
  value: string;
  iso: string;
};

export type Sentence = {
  value: string;
  iso: string;
};

export type Learnable<T extends Word | Sentence> = {
  original: T;
  translations: T[];
};

export type Noun = {
  article?: string;
  word: string;
  iso: string;
  fluency: number;
};
