import { Router } from "express";
import {
  createSentenceGroup,
  getRandomSentenceGroups,
  getSentence,
  getSentenceGroup,
} from "../controllers/sentence-controller";

const sentenceRouter = Router();

sentenceRouter.get("/", async (req, res) => {
  await getSentence(req, res);
});

sentenceRouter.post("/group", async (req, res) => {
  await createSentenceGroup(req, res);
});

sentenceRouter.get("/group", async (req, res) => {
  await getSentenceGroup(req, res);
});

sentenceRouter.get("/group/random", async (req, res) => {
  await getRandomSentenceGroups(req, res);
});

export { sentenceRouter };
