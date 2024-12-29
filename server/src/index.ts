// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { ExpressAuth } from "@auth/express";

import GitHub from "@auth/express/providers/github";
import { PrismaClient } from "@prisma/client";
import { learnRouter } from "./routes/learn-routes";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET, POST, PUT, DELETE
  })
);

app.use(express.json());

const authConfig = {
  providers: [GitHub],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return `${process.env.FRONTEND_URL}/learn`;
    },
  },
  adapter: PrismaAdapter(prisma),
};

app.use(
  "/api/auth/*",
  ExpressAuth({
    providers: [GitHub],
    callbacks: {
      async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {        
        return `${process.env.FRONTEND_URL}/`;
      },
    },
    adapter: PrismaAdapter(prisma),
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/learn", learnRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { prisma };
