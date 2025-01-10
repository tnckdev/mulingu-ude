import { Router, Request, Response } from "express";

import {
  getUser,
  getUserSettings,
  postUserSettings,
} from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/settings", async (req, res) => {
  await getUserSettings(req, res);
});

userRouter.post("/settings", async (req, res) => {
  await postUserSettings(req, res);
});

userRouter.get("", async (req, res) => {
  await getUser(req, res);
});

export { userRouter };
