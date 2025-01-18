import VerbTable from "@/components/dictionary/verb-table";
import { fetchLanguageVerbs } from "@/lib/dictionary";
import { LanguageISO, StandardVerb } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

const VerbDictionary = ({
  iso,
  start,
}: {
  iso: LanguageISO;
  start: number;
}) => {
  const [verbs, setVerbs] = useState<StandardVerb[]>([]);
  const verbsCache = useRef<{ [key: string]: StandardVerb[] }>({});

  useEffect(() => {
    const fetchVerbs = async () => {
      if (verbsCache.current[iso]) {
        setVerbs(verbsCache.current[iso]);
        return;
      }

      try {
        const languageVerbs = await fetchLanguageVerbs(iso);

        verbsCache.current[iso] = languageVerbs;
        setVerbs(languageVerbs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVerbs();
  }, [iso, start]);

  return <VerbTable data={verbs} />;
};

export default VerbDictionary;
