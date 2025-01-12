import { Router } from "express";
import {
  getLanguageNouns,
  getLanguageVerbs,
} from "../controllers/dictionary-controller";

const dictionaryRouter = Router();

dictionaryRouter.get("/nouns", async (req, res) => {
  await getLanguageNouns(req, res);
});

dictionaryRouter.get("/verbs", async (req, res) => {
  await getLanguageVerbs(req, res);
});

export { dictionaryRouter };
