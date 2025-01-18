import { Router } from "express";

import {
  getNoun,
  getNounAggregation,
  getRandomNounAggregations,
  postNounAggregation,
} from "../controllers/noun-controller";

const nounRouter = Router();

nounRouter.get("/", async (req, res) => {
  await getNoun(req, res);
});

nounRouter.post("/aggregation", async (req, res) => {
  await postNounAggregation(req, res);
});

nounRouter.get("/aggregation", async (req, res) => {
  await getNounAggregation(req, res);
});

nounRouter.get("/aggregation/random", async (req, res) => {
  await getRandomNounAggregations(req, res);
});

export { nounRouter };
