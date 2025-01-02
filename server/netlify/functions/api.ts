import express, { Router, Request, Response } from "express";
import serverless from "serverless-http";

import { learnRouter } from "../../src/routes/learn-routes";

const api = express();

const router = Router();
router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World!");
});

api.use("/api/", router);

api.use("/api/learn", learnRouter);

export const handler = serverless(api);
