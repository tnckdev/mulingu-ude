import { getSession } from "@auth/express";
import { NextFunction, Request, Response } from "express";
import { authConfig } from ".";

export async function getUserSession(req: Request, res: Response) {
  
  const session = res.locals.session ?? (await getSession(req, authConfig));
  return session;
}

export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await getUserSession(req, res);
  if (!session?.user) {
    res.status(404).json({ error: "Requested endpoint not found" });
  } else {
    next();
  }
}
