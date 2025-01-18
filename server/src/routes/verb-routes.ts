import { Router } from "express";
import {
  getRandomVerbAggregations,
  getVerb,
  getVerbAggregation,
  postVerbAggregation,
} from "../controllers/verb-controller";

const verbRouter = Router();

verbRouter.get("/", async (req, res) => {
  await getVerb(req, res);
});

verbRouter.post("/aggregation", async (req, res) => {
  await postVerbAggregation(req, res);
});

verbRouter.get("/aggregation", async (req, res) => {
  await getVerbAggregation(req, res);
});

verbRouter.get("/aggregation/random", async (req, res) => {
  await getRandomVerbAggregations(req, res);
});

export { verbRouter };
