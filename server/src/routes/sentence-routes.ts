import { Router } from "express";

import {
  getRandomSentenceAggregations,
  getSentence,
  getSentenceAggregation,
  postSentenceAggregation,
} from "../controllers/sentence-controller";

const sentenceRouter = Router();

sentenceRouter.get("/", async (req, res) => {
  await getSentence(req, res);
});

sentenceRouter.post("/aggregation", async (req, res) => {
  await postSentenceAggregation(req, res);
});

sentenceRouter.get("/aggregation", async (req, res) => {
  await getSentenceAggregation(req, res);
});

sentenceRouter.get("/aggregation/random", async (req, res) => {
  await getRandomSentenceAggregations(req, res);
});

export { sentenceRouter };
