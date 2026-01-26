import express from "express";
import {
  uploadQuestions,
  getQuestionsByTestId,
} from "../controllers/questionController.js";

const router = express.Router();
router.post("/", uploadQuestions);
router.get("/test/:testId", getQuestionsByTestId);

export default router;


