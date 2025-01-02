import { Router } from "express";
import {
  createNounGroup,
  getNoun,
  getNounGroup,
  getRandomNounGroups,
} from "../controllers/noun-controller";

const nounRouter = Router();

nounRouter.get("/", async (req, res) => {
  await getNoun(req, res);
});

nounRouter.post("/group", async (req, res) => {
  await createNounGroup(req, res);
});

nounRouter.get("/group", async (req, res) => {
  await getNounGroup(req, res);
});

nounRouter.get("/group/random", async (req, res) => {
  await getRandomNounGroups(req, res);
});

export { nounRouter };
