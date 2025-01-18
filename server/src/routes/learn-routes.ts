import { Router } from "express";
import { getRandomTasks, gradeAnswers } from "../controllers/learn-controller";

const learnRouter = Router();

learnRouter.post("/grade", async (req, res) => {
  await gradeAnswers(req, res);
});

learnRouter.get("/random", async (req, res) => {
  await getRandomTasks(req, res);
});

export { learnRouter };
