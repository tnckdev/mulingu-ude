import { Router } from "express";
import { learnRouter } from "./learn-routes";
import { authenticatedUser } from "../lib";
import { userRouter } from "./user-routes";
import { verbRouter } from "./verb-routes";
import { sentenceRouter } from "./sentence-routes";
import { nounRouter } from "./noun-routes";
import { ratingRouter } from "./rating-routes";
import { dictionaryRouter } from "./dictionary-routes";

const mulinguApi = Router();

mulinguApi.use("/learn", learnRouter);

mulinguApi.use("/user", userRouter);

mulinguApi.use("/verb", verbRouter);

mulinguApi.use("/sentence", sentenceRouter);

mulinguApi.use("/noun", nounRouter);

mulinguApi.use("/rating", ratingRouter);

mulinguApi.use("/dictionary", dictionaryRouter);

export { mulinguApi };
