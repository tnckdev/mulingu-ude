import { Router } from "express";
import {
  getRandomSentenceGroups,
  getSentence,
  getSentenceGroup,
  postSentenceGroup,
} from "../controllers/sentence-controller";

const sentenceRouter = Router();

sentenceRouter.get("/", async (req, res) => {
  await getSentence(req, res);
});

sentenceRouter.post("/group", async (req, res) => {
  await postSentenceGroup(req, res);
});

sentenceRouter.get("/group", async (req, res) => {
  await getSentenceGroup(req, res);
});

sentenceRouter.get("/group/random", async (req, res) => {
  await getRandomSentenceGroups(req, res);
});

export { sentenceRouter };
