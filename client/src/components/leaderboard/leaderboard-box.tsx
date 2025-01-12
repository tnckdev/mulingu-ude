import { fetchRatingEntries, RatingEntry } from "@/lib/ratings";
import getFlagEmoji from "@/utils/flags";
import { RatingLanguage } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import LeaderboardTable from "./leaderboard-table";

const LeaderboardBox = () => {
  const languages: RatingLanguage[] = [
    "total",
    "us",
    "de",
    "es",
    "fr",
    "no",
    "nl",
  ];

  const [currentLanguage, setCurrentLanguage] = useState<RatingLanguage>("us");

  const [ratingEntries, setRatingEntries] = useState<RatingEntry[]>([]);
  const ratingEntriesCache = useRef<{ [key: string]: RatingEntry[] }>({});

  useEffect(() => {
    const fetchRatings = async () => {
      if (ratingEntriesCache.current[currentLanguage]) {
        setRatingEntries(ratingEntriesCache.current[currentLanguage]);
        return;
      }

      try {
        const ratings = await fetchRatingEntries(currentLanguage);

        ratingEntriesCache.current[currentLanguage] = ratings;
        setRatingEntries(ratings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRatings();
  }, [currentLanguage]);

  return (
    <div className="w-full h-screen pt-14 flex flex-col items-center justify-start gap-5">
      <p className="text-7xl font-bold">Leaderboard</p>
      <div className="w-9/12 flex flex-col items-center gap-5">
        <div className="w-full flex border rounded-xl p-2">
          {languages.map((language) => (
            <Button
              onClick={() => setCurrentLanguage(language)}
              key={language}
              variant={language === currentLanguage ? "default" : "outline"}
              className="w-full"
            >
              {language !== "total" ? getFlagEmoji(language) : "Total"}
            </Button>
          ))}
        </div>
        <LeaderboardTable data={ratingEntries} />
      </div>
    </div>
  );
};

export default LeaderboardBox;
