// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { ExpressAuth } from "@auth/express";

import GitHub from "@auth/express/providers/github";
import { PrismaClient } from "@prisma/client";
import { learnRouter } from "./routes/learn-routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    credentials: true, // Allow cookies
  })
);

app.use(express.json())

app.use(
  "/api/auth/*",
  ExpressAuth({
    providers: [GitHub],
    callbacks: {
      async redirect({ url, baseUrl }) {
        return `${process.env.FRONTEND_URL}/learn`;
      },
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", learnRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { prisma };
