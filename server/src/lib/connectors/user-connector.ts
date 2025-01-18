import { prisma } from "../../index";
import { UserSettings } from "../../types";

const findUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findUserSettings = async (email: string) => {
  const user = await findUser(email);
  if (!user) {
    return null;
  }

  return await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });
};

const updateUserSettings = async (email: string, settings: UserSettings) => {
  const user = await findUser(email);
  if (!user) {
    return null;
  }

  return await prisma.userSettings.upsert({
    where: {
      userId: user.id,
    },
    update: settings,
    create: {
      ...settings,
      userId: user.id,
    },
  });
};

export { findUser, findUserSettings, updateUserSettings };
