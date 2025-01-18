import { prisma } from "../../index";

const updateRating = async (
  userId: string,
  language: string,
  rating: number
) => {
  const existingRating = await prisma.ratings.findUnique({
    where: {
      userId_language: {
        userId: userId,
        language: language,
      },
    },
  });

  const currentRating = existingRating ? existingRating.rating : 0;

  const ratings = await prisma.ratings.upsert({
    where: {
      userId_language: {
        userId: userId,
        language: language,
      },
    },
    update: { rating: currentRating + rating },
    create: {
      userId: userId,
      language: language,
      rating: rating,
    },
  });
};

export { updateRating };
