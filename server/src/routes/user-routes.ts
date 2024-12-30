import { Router, Request, Response } from "express";

import {
  createUserSettings,
  readUser,
  readUserSettings,
  updateUserSettings,
} from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/settings", async (req, res) => {
  await readUserSettings(req, res);
});

userRouter.post("/settings", async (req, res) => {
  await createUserSettings(req, res);
});

userRouter.put("/settings", async (req, res) => {
  await updateUserSettings(req, res);
});

userRouter.get("", async (req, res) => {
  await readUser(req, res);
});

export { userRouter };
