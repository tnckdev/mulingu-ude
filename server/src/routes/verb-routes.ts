import { Router } from "express";
import {
  getRandomVerbGroups,
  getVerb,
  getVerbGroup,
  postVerbGroup,
} from "../controllers/verb-controller";

const verbRouter = Router();

verbRouter.get("/", async (req, res) => {
  await getVerb(req, res);
});

verbRouter.post("/group", async (req, res) => {
  await postVerbGroup(req, res);
});

verbRouter.get("/group", async (req, res) => {
  await getVerbGroup(req, res);
});

verbRouter.get("/group/random", async (req, res) => {
  await getRandomVerbGroups(req, res);
});

export { verbRouter };
