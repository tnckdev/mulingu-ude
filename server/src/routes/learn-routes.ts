import { Router } from "express";
import { getRandomTasks } from "../controllers/learn-controller";

const learnRouter = Router();

learnRouter.get("/random", async (req, res) => {
  await getRandomTasks(req, res);
});

export { learnRouter };
