import NounTable from "@/components/dictionary/noun-table";
import { fetchLanguageNouns } from "@/lib/dictionary";
import { LanguageISO, Noun } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

const NounDictionary = ({
  iso,
  start,
}: {
  iso: LanguageISO;
  start: number;
}) => {
  const [nouns, setNouns] = useState<Noun[]>([]);
  const nounsCache = useRef<{ [key: string]: Noun[] }>({});

  useEffect(() => {
    const fetchNouns = async () => {
      if (nounsCache.current[iso]) {
        setNouns(nounsCache.current[iso]);
        return;
      }

      try {
        const languageNouns = await fetchLanguageNouns(iso);

        nounsCache.current[iso] = languageNouns;
        setNouns(languageNouns);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNouns();
  }, [iso, start]);

  return <NounTable data={nouns} />;
};

export default NounDictionary;
