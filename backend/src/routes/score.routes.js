import {Router} from "express";
import { saveScore, getScores } from "../controllers/score.controller.js";
import { saveScoreValidator } from "../validator/index.js";
import {validate} from "../middleware/validator.middleware.js"

const router = Router()

router
  .get("/", getScores)
  .post("/", saveScoreValidator(), validate, saveScore)

export default router;