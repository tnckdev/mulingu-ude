import { prisma } from "../../index";
import { RatingLanguage } from "../../types";

const findRatings = async (
  language: RatingLanguage
  // start: number,
  // amount: number
) => {
  return await prisma.ratings.findMany({
    // skip: start,
    // take: amount,
    where: {
      language,
    },
    orderBy: {
      rating: "desc",
    },
    include: {
      user: true,
    },
  });
};

const findUserRating = async (userId: string, language: RatingLanguage) => {
  return await prisma.ratings.findFirst({
    where: {
      userId,
      language,
    },
  });
};

const findUserRatings = async (userId: string) => {
  return await prisma.ratings.findMany({
    where: {
      userId,
    },
    orderBy: {
      language: "asc",
    },
  });
};

export { findRatings, findUserRating, findUserRatings };
