import { Router } from "express";
import {
  getRatings,
  getUserRating,
  getUserRatings,
} from "../controllers/rating-controller";

const ratingRouter = Router();

ratingRouter.get("/", async (req, res) => {  
  await getRatings(req, res);
});

ratingRouter.get("/user", async (req, res) => {
  await getUserRating(req, res);
});

ratingRouter.get("/user/all", async (req, res) => {
  await getUserRatings(req, res);
});

export { ratingRouter };
