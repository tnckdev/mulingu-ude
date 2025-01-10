// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import { ExpressAuth, ExpressAuthConfig } from "@auth/express";
import GitHub from "@auth/express/providers/github";
import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => {
  res.send("Hello World!");
});

const authConfig: ExpressAuthConfig = {
  providers: [GitHub],
}

api.use("/api/auth/*", ExpressAuth(authConfig));

api.use("/api/", router);

export const handler = serverless(api);
