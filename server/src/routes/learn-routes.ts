import { Router } from "express";
import { getRandomTasks, gradeAnswers } from "../controllers/learn-controller";

const learnRouter = Router();

learnRouter.get("/random", async (req, res) => {
  await getRandomTasks(req, res);
});

learnRouter.post("/grade", async (req, res) => {
  await gradeAnswers(req, res);
});

export { learnRouter };
