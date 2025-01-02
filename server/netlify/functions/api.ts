import express, { Router, Request, Response } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World!");
});

api.use("/api/", router);

export const handler = serverless(api);
