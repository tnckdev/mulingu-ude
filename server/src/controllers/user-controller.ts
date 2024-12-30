import { Request, Response } from "express";

import { prisma } from "../prisma";
import { getUserSession } from "../lib";
import { User } from "@prisma/client";

const fetchUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const fetchUserSettings = async (email: string) => {
  const user = await fetchUser(email);
  if (!user) {
    return null;
  }

  return await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });
};

const readUser = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;
  if (!userEmail) {
    return res.status(400).json({ error: "Email is required." });
  }
  const user = await fetchUser(userEmail);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  res.json(user);
};

const readUserSettings = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;
  if (!userEmail) {
    return res.status(400).json({ error: "Email is required." });
  }
  const user = await fetchUser(userEmail);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const userSettings = await fetchUserSettings(userEmail);
  if (!userSettings) {
    return res.status(404).json({ error: "User settings not found." });
  }
  res.status(200).json(userSettings);
};

const createUserSettings = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;
  if (!userEmail) {
    return res.status(400).json({ error: "Email is required." });
  }
  const user = await fetchUser(userEmail);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const { theme, native, languages } = req.body;
  const userSettings = await prisma.userSettings.create({
    data: {
      theme,
      native,
      languages,
      userId: user.id,
    },
  });
  res.status(201).json(userSettings);
};

const updateUserSettings = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;
  if (!userEmail) {
    return res.status(400).json({ error: "Email is required." });
  }
  const user = await fetchUser(userEmail);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const { theme, native, languages } = req.body;
  const userSettings = await prisma.userSettings.update({
    where: { userId: user.id },
    data: {
      theme,
      native,
      languages,
    },
  });
  res.status(200).json(userSettings);
};

export { readUserSettings, readUser, createUserSettings, updateUserSettings };
