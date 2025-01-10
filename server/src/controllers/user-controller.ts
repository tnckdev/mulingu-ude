import { Request, Response } from "express";

import {
  findUser,
  findUserSettings,
  updateUserSettings,
} from "../lib/user-connector";
import { z } from "zod";
import { UserSettingsZod } from "../types";

const getUser = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    email: z.string(),
  });

  const { email } = SearchParams.parse(req.query);

  const user = await findUser(email);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  return res.status(404).json(user);
};

const getUserSettings = async (req: Request, res: Response) => {
  const SearchParams = z.object({
    email: z.string(),
  });

  const { email } = SearchParams.parse(req.query);

  const userSettings = await findUserSettings(email);
  if (!userSettings) {
    return res.status(404).json({ error: "User settings not found." });
  }
  res.status(200).json(userSettings);
};

const postUserSettings = async (req: Request, res: Response) => {
  const Body = z.object({
    email: z.string(),
    userSettings: UserSettingsZod,
  });

  const { email, userSettings } = Body.parse(req.body);

  const updatedUserSettings = await updateUserSettings(email, userSettings);

  return res
    .status(updatedUserSettings != null ? 200 : 500)
    .json(updatedUserSettings);
};

export { getUser, getUserSettings, postUserSettings };
