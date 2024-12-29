import { Router } from "express";
import {
  createMultiNoun,
  getMultiNoun,
  getMultiNouns,
} from "../controllers/learn-controller";

const learnRouter = Router();

learnRouter.get("/mnouns", async (req, res) => {
  await getMultiNouns(req, res);
});

learnRouter.get("/mnoun/:id", getMultiNoun);

learnRouter.post("/mnoun", async (req, res) => {
  console.log(req.body);

  await createMultiNoun(req, res);
});

export { learnRouter };
