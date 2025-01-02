import { Router } from "express";
import {
  createVerbGroup,
  getRandomVerbGroups,
  getVerb,
  getVerbGroup,
} from "../controllers/verb-controller";

const verbRouter = Router();

verbRouter.get("/", async (req, res) => {
  await getVerb(req, res);
});

verbRouter.post("/group", async (req, res) => {
  await createVerbGroup(req, res);
});

verbRouter.get("/group", async (req, res) => {
  await getVerbGroup(req, res);
});

verbRouter.get("/group/random", async (req, res) => {
  await getRandomVerbGroups(req, res);
});

export { verbRouter };
