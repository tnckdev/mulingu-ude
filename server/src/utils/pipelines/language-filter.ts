import { LanguageISO } from "../../types";

const languageFilter = (
  inputName: string,
  as: string,
  languages: LanguageISO[]
) => {
  return {
    $addFields: {
      [inputName]: {
        $filter: {
          input: `$${inputName}`,
          as: `${as}`,
          cond: { $in: [`$$${as}.language`, languages] },
        },
      },
    },
  };
};

export { languageFilter };