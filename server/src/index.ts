// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";

import { ExpressAuth, ExpressAuthConfig } from "@auth/express";

import GitHub from "@auth/express/providers/github";
import { learnRouter } from "./routes/learn-routes";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { authenticatedUser } from "./lib";
import { userRouter } from "./routes/user-routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

export const authConfig: ExpressAuthConfig = {
  providers: [GitHub],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: `${process.env.FRONTEND_URL}/signin`,
    signOut: `${process.env.FRONTEND_URL}/signout`,
    error: `${process.env.FRONTEND_URL}/auth-error`,
  },
};

app.use("/api/auth/*", ExpressAuth(authConfig));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/learn", learnRouter);

app.use("/api/user", authenticatedUser, userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { prisma };
