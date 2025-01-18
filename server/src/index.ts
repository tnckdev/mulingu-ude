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
import { verbRouter } from "./routes/verb-routes";
import { sentenceRouter } from "./routes/sentence-routes";
import { nounRouter } from "./routes/noun-routes";
import { ratingRouter } from "./routes/rating-routes";
import { mulinguApi } from "./routes/api";

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
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
    csrfToken: {
      name: "__Host-authjs.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
    callbackUrl: {
      name: "__Secure-authjs.callback-url",
      options: {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      },
    },
  },
};

app.use("/api/auth/*", ExpressAuth(authConfig));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", mulinguApi);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
} else {
  console.log("[server]: Not running in production mode.");
}

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

export { app, prisma };
